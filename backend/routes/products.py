
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Product, Review, User, AIRecommendation, db
from sqlalchemy import func, desc
import json

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
def get_products():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 12, type=int)
    category = request.args.get('category')
    search = request.args.get('search')
    sort_by = request.args.get('sort_by', 'created_at')
    
    query = Product.query
    
    # Apply filters
    if category and category != 'All':
        query = query.filter(Product.category == category)
    
    if search:
        query = query.filter(Product.name.contains(search))
    
    # Apply sorting
    if sort_by == 'price_low':
        query = query.order_by(Product.price)
    elif sort_by == 'price_high':
        query = query.order_by(desc(Product.price))
    elif sort_by == 'rating':
        # Join with reviews to sort by average rating
        query = query.outerjoin(Review).group_by(Product.id).order_by(desc(func.avg(Review.rating)))
    else:
        query = query.order_by(desc(Product.created_at))
    
    # Paginate
    products = query.paginate(page=page, per_page=per_page, error_out=False)
    
    # Calculate average ratings and review counts
    product_list = []
    for product in products.items:
        reviews = Review.query.filter_by(product_id=product.id).all()
        avg_rating = sum(r.rating for r in reviews) / len(reviews) if reviews else 0
        
        product_data = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'original_price': product.original_price,
            'category': product.category,
            'image': product.image_url,
            'rating': round(avg_rating, 1),
            'reviews': len(reviews),
            'freeShipping': product.price >= 35,  # Free shipping over $35
            'sustainability_score': product.sustainability_score,
            'eco_friendly': product.eco_friendly,
            'stock_quantity': product.stock_quantity
        }
        product_list.append(product_data)
    
    return jsonify({
        'products': product_list,
        'total': products.total,
        'pages': products.pages,
        'current_page': page
    })

@products_bp.route('/<product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    # Get reviews with trust scores
    reviews = db.session.query(Review, User).join(User).filter(Review.product_id == product_id).all()
    review_data = []
    
    for review, user in reviews:
        review_data.append({
            'id': review.id,
            'rating': review.rating,
            'title': review.title,
            'content': review.content,
            'verified_purchase': review.verified_purchase,
            'helpful_votes': review.helpful_votes,
            'user': {
                'username': user.username,
                'trust_score': user.trust_score,
                'verified_buyer': user.verified_buyer
            },
            'created_at': review.created_at.isoformat(),
            'images': json.loads(review.images) if review.images else []
        })
    
    avg_rating = sum(r[0].rating for r in reviews) / len(reviews) if reviews else 0
    
    return jsonify({
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'original_price': product.original_price,
        'category': product.category,
        'image': product.image_url,
        'rating': round(avg_rating, 1),
        'reviews': review_data,
        'total_reviews': len(reviews),
        'sustainability_score': product.sustainability_score,
        'eco_friendly': product.eco_friendly,
        'stock_quantity': product.stock_quantity,
        'ai_metadata': json.loads(product.ai_metadata) if product.ai_metadata else {}
    })

@products_bp.route('/<product_id>/reviews', methods=['POST'])
@jwt_required()
def add_review(product_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # Check if product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    # Check if user has purchased this product (for verified reviews)
    from models import Purchase
    purchase = Purchase.query.filter_by(user_id=current_user_id, product_id=product_id).first()
    
    # Create review
    review = Review(
        user_id=current_user_id,
        product_id=product_id,
        rating=data['rating'],
        title=data.get('title', ''),
        content=data.get('content', ''),
        verified_purchase=bool(purchase),
        images=json.dumps(data.get('images', []))
    )
    
    # Calculate trust weighted score
    user = User.query.get(current_user_id)
    review.trust_weighted_score = data['rating'] * (user.trust_score / 100)
    
    db.session.add(review)
    db.session.commit()
    
    return jsonify({'message': 'Review added successfully', 'review_id': review.id}), 201

@products_bp.route('/recommendations', methods=['GET'])
@jwt_required()
def get_recommendations():
    current_user_id = get_jwt_identity()
    
    # Get AI recommendations for the user
    recommendations = AIRecommendation.query.filter_by(
        user_id=current_user_id,
        acted_upon=False
    ).order_by(desc(AIRecommendation.confidence_score)).limit(10).all()
    
    recommendation_data = []
    for rec in recommendations:
        product = Product.query.get(rec.product_id)
        if product:
            recommendation_data.append({
                'id': rec.id,
                'product': {
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'image': product.image_url,
                    'category': product.category
                },
                'type': rec.recommendation_type,
                'confidence': rec.confidence_score,
                'reasoning': rec.reasoning
            })
    
    return jsonify({'recommendations': recommendation_data})

@products_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = db.session.query(Product.category, func.count(Product.id)).group_by(Product.category).all()
    
    category_data = [{'name': cat[0], 'count': cat[1]} for cat in categories]
    
    return jsonify({'categories': category_data})
