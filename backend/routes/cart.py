
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import CartItem, Product, User, db
from datetime import datetime

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/', methods=['GET'])
@jwt_required()
def get_cart():
    current_user_id = get_jwt_identity()
    
    cart_items = db.session.query(CartItem, Product).join(Product).filter(
        CartItem.user_id == current_user_id
    ).all()
    
    cart_data = []
    total_price = 0
    total_items = 0
    
    for cart_item, product in cart_items:
        item_data = {
            'id': cart_item.id,
            'product': {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'image': product.image_url,
                'category': product.category,
                'sustainability_score': product.sustainability_score
            },
            'quantity': cart_item.quantity,
            'ai_suggested': cart_item.ai_suggested,
            'prediction_confidence': cart_item.prediction_confidence,
            'added_at': cart_item.added_at.isoformat()
        }
        cart_data.append(item_data)
        total_price += product.price * cart_item.quantity
        total_items += cart_item.quantity
    
    return jsonify({
        'items': cart_data,
        'total_price': round(total_price, 2),
        'total_items': total_items,
        'free_shipping': total_price >= 35
    })

@cart_bp.route('/add', methods=['POST'])
@jwt_required()
def add_to_cart():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    # Check if product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    # Check if item already in cart
    existing_item = CartItem.query.filter_by(
        user_id=current_user_id,
        product_id=product_id
    ).first()
    
    if existing_item:
        existing_item.quantity += quantity
    else:
        cart_item = CartItem(
            user_id=current_user_id,
            product_id=product_id,
            quantity=quantity,
            ai_suggested=data.get('ai_suggested', False),
            prediction_confidence=data.get('prediction_confidence')
        )
        db.session.add(cart_item)
    
    db.session.commit()
    
    return jsonify({'message': 'Item added to cart successfully'})

@cart_bp.route('/update', methods=['PUT'])
@jwt_required()
def update_cart_item():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    cart_item_id = data.get('cart_item_id')
    quantity = data.get('quantity')
    
    cart_item = CartItem.query.filter_by(
        id=cart_item_id,
        user_id=current_user_id
    ).first()
    
    if not cart_item:
        return jsonify({'error': 'Cart item not found'}), 404
    
    if quantity <= 0:
        db.session.delete(cart_item)
    else:
        cart_item.quantity = quantity
    
    db.session.commit()
    
    return jsonify({'message': 'Cart updated successfully'})

@cart_bp.route('/remove/<int:cart_item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(cart_item_id):
    current_user_id = get_jwt_identity()
    
    cart_item = CartItem.query.filter_by(
        id=cart_item_id,
        user_id=current_user_id
    ).first()
    
    if not cart_item:
        return jsonify({'error': 'Cart item not found'}), 404
    
    db.session.delete(cart_item)
    db.session.commit()
    
    return jsonify({'message': 'Item removed from cart'})

@cart_bp.route('/clear', methods=['DELETE'])
@jwt_required()
def clear_cart():
    current_user_id = get_jwt_identity()
    
    CartItem.query.filter_by(user_id=current_user_id).delete()
    db.session.commit()
    
    return jsonify({'message': 'Cart cleared successfully'})

@cart_bp.route('/optimize', methods=['POST'])
@jwt_required()
def optimize_cart():
    current_user_id = get_jwt_identity()
    
    # Get current cart items
    cart_items = db.session.query(CartItem, Product).join(Product).filter(
        CartItem.user_id == current_user_id
    ).all()
    
    optimization_suggestions = []
    total_savings = 0
    
    for cart_item, product in cart_items:
        # Find cheaper alternatives in the same category
        alternatives = Product.query.filter(
            Product.category == product.category,
            Product.price < product.price,
            Product.id != product.id
        ).order_by(Product.price).limit(3).all()
        
        if alternatives:
            best_alternative = alternatives[0]
            savings = (product.price - best_alternative.price) * cart_item.quantity
            
            optimization_suggestions.append({
                'original_product': {
                    'id': product.id,
                    'name': product.name,
                    'price': product.price
                },
                'alternative': {
                    'id': best_alternative.id,
                    'name': best_alternative.name,
                    'price': best_alternative.price,
                    'image': best_alternative.image_url
                },
                'savings': round(savings, 2),
                'quantity': cart_item.quantity
            })
            total_savings += savings
    
    return jsonify({
        'suggestions': optimization_suggestions,
        'total_potential_savings': round(total_savings, 2)
    })
