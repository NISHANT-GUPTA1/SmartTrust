
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, Product, Purchase, CartItem, AIRecommendation, db
import openaipython get-pip.py

import json
from datetime import datetime, timedelta
import random

ai_bp = Blueprint('ai_assistant', __name__)

# Mock OpenAI for demo purposes - replace with actual API key
OPENAI_API_KEY = "sk-abcdef1234567890abcdef1234567890abcdef12"

@ai_bp.route('/chat', methods=['POST'])
@jwt_required()
def ai_chat():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    message = data.get('message', '')
    
    # Get user context
    user = User.query.get(current_user_id)
    recent_purchases = Purchase.query.filter_by(user_id=current_user_id).order_by(
        Purchase.purchase_date.desc()
    ).limit(10).all()
    
    # Build context for AI
    context = build_user_context(user, recent_purchases)
    
    # Generate AI response (mock implementation)
    ai_response = generate_ai_response(message, context)
    
    return jsonify({
        'response': ai_response,
        'suggestions': get_product_suggestions(current_user_id, message)
    })

@ai_bp.route('/predictive-cart', methods=['GET'])
@jwt_required()
def get_predictive_cart():
    current_user_id = get_jwt_identity()
    
    # Analyze user's purchase history and patterns
    user = User.query.get(current_user_id)
    
    # Get purchase history
    purchases = Purchase.query.filter_by(user_id=current_user_id).all()
    
    # Generate predictions based on patterns
    predictions = generate_purchase_predictions(user, purchases)
    
    # Add high-confidence predictions to cart
    for prediction in predictions:
        if prediction['confidence'] > 0.8:
            existing_item = CartItem.query.filter_by(
                user_id=current_user_id,
                product_id=prediction['product_id']
            ).first()
            
            if not existing_item:
                cart_item = CartItem(
                    user_id=current_user_id,
                    product_id=prediction['product_id'],
                    quantity=1,
                    ai_suggested=True,
                    prediction_confidence=prediction['confidence']
                )
                db.session.add(cart_item)
        
        # Store recommendation
        recommendation = AIRecommendation(
            user_id=current_user_id,
            product_id=prediction['product_id'],
            recommendation_type='predictive',
            confidence_score=prediction['confidence'],
            reasoning=prediction['reasoning']
        )
        db.session.add(recommendation)
    
    db.session.commit()
    
    return jsonify({
        'predictions': predictions,
        'message': f'Added {len([p for p in predictions if p["confidence"] > 0.8])} high-confidence items to your cart'
    })

@ai_bp.route('/budget-analysis', methods=['POST'])
@jwt_required()
def analyze_budget():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    monthly_budget = data.get('monthly_budget', 500)
    
    # Get current month's spending
    current_month = datetime.now().replace(day=1)
    monthly_purchases = Purchase.query.filter(
        Purchase.user_id == current_user_id,
        Purchase.purchase_date >= current_month
    ).all()
    
    current_spending = sum(p.price_paid * p.quantity for p in monthly_purchases)
    remaining_budget = monthly_budget - current_spending
    
    # Get current cart total
    cart_items = db.session.query(CartItem, Product).join(Product).filter(
        CartItem.user_id == current_user_id
    ).all()
    
    cart_total = sum(item.quantity * product.price for item, product in cart_items)
    
    # Generate budget insights and suggestions
    insights = generate_budget_insights(current_spending, remaining_budget, cart_total, cart_items)
    
    return jsonify({
        'monthly_budget': monthly_budget,
        'current_spending': round(current_spending, 2),
        'remaining_budget': round(remaining_budget, 2),
        'cart_total': round(cart_total, 2),
        'insights': insights,
        'budget_status': 'on_track' if remaining_budget >= cart_total else 'over_budget'
    })

@ai_bp.route('/sustainability-report', methods=['GET'])
@jwt_required()
def get_sustainability_report():
    current_user_id = get_jwt_identity()
    
    # Get user's purchase history
    purchases = db.session.query(Purchase, Product).join(Product).filter(
        Purchase.user_id == current_user_id
    ).all()
    
    total_sustainability_score = 0
    eco_friendly_count = 0
    total_products = len(purchases)
    
    for purchase, product in purchases:
        total_sustainability_score += product.sustainability_score
        if product.eco_friendly:
            eco_friendly_count += 1
    
    avg_sustainability = total_sustainability_score / total_products if total_products > 0 else 0
    eco_percentage = (eco_friendly_count / total_products * 100) if total_products > 0 else 0
    
    # Get current cart sustainability
    cart_items = db.session.query(CartItem, Product).join(Product).filter(
        CartItem.user_id == current_user_id
    ).all()
    
    cart_sustainability = sum(
        item.quantity * product.sustainability_score for item, product in cart_items
    ) / sum(item.quantity for item, _ in cart_items) if cart_items else 0
    
    # Generate eco-friendly suggestions
    eco_suggestions = get_eco_friendly_alternatives(current_user_id)
    
    return jsonify({
        'avg_sustainability_score': round(avg_sustainability, 1),
        'eco_friendly_percentage': round(eco_percentage, 1),
        'total_purchases': total_products,
        'cart_sustainability': round(cart_sustainability, 1),
        'eco_suggestions': eco_suggestions,
        'impact_summary': generate_impact_summary(avg_sustainability, eco_percentage)
    })

def build_user_context(user, purchases):
    """Build context for AI assistant"""
    context = {
        'user_info': {
            'trust_score': user.trust_score,
            'verified_buyer': user.verified_buyer,
            'sustainability_score': user.sustainability_score,
            'preferences': json.loads(user.preferences) if user.preferences else {}
        },
        'recent_purchases': [
            {
                'product_id': p.product_id,
                'quantity': p.quantity,
                'price_paid': p.price_paid,
                'purchase_date': p.purchase_date.isoformat()
            } for p in purchases
        ]
    }
    return context

def generate_ai_response(message, context):
    """Generate AI response (mock implementation - replace with actual OpenAI API)"""
    responses = [
        "Based on your shopping history, I'd recommend looking at our eco-friendly options in that category.",
        "I notice you often buy organic products. Would you like me to show you some sustainable alternatives?",
        "Your trust score qualifies you for early access to new product reviews. Would you like to see them?",
        "Based on your budget preferences, here are some cost-effective options that match your needs."
    ]
    return random.choice(responses)

def generate_purchase_predictions(user, purchases):
    """Generate purchase predictions based on user history"""
    predictions = []
    
    # Analyze purchase patterns
    product_frequency = {}
    for purchase in purchases:
        if purchase.product_id in product_frequency:
            product_frequency[purchase.product_id] += 1
        else:
            product_frequency[purchase.product_id] = 1
    
    # Generate predictions for frequently bought items
    for product_id, frequency in product_frequency.items():
        if frequency >= 2:  # Bought at least twice
            product = Product.query.get(product_id)
            if product:
                confidence = min(frequency * 0.2, 0.9)
                predictions.append({
                    'product_id': product_id,
                    'product_name': product.name,
                    'confidence': confidence,
                    'reasoning': f'You\'ve purchased this item {frequency} times before'
                })
    
    return predictions

def generate_budget_insights(current_spending, remaining_budget, cart_total, cart_items):
    """Generate budget insights and suggestions"""
    insights = []
    
    if remaining_budget < cart_total:
        insights.append({
            'type': 'warning',
            'message': f'Your current cart (${cart_total:.2f}) exceeds your remaining budget (${remaining_budget:.2f})'
        })
        
        # Suggest removing most expensive items
        expensive_items = sorted(cart_items, key=lambda x: x[1].price, reverse=True)[:3]
        insights.append({
            'type': 'suggestion',
            'message': 'Consider removing or reducing these expensive items:',
            'items': [{'name': item[1].name, 'price': item[1].price} for item in expensive_items]
        })
    
    if remaining_budget > cart_total * 2:
        insights.append({
            'type': 'info',
            'message': f'You have plenty of budget remaining (${remaining_budget:.2f}). Consider stocking up on essentials.'
        })
    
    return insights

def get_eco_friendly_alternatives(user_id):
    """Get eco-friendly alternatives for cart items"""
    cart_items = db.session.query(CartItem, Product).join(Product).filter(
        CartItem.user_id == user_id
    ).all()
    
    suggestions = []
    for cart_item, product in cart_items:
        if not product.eco_friendly:
            # Find eco-friendly alternatives in the same category
            alternatives = Product.query.filter(
                Product.category == product.category,
                Product.eco_friendly == True,
                Product.id != product.id
            ).limit(3).all()
            
            if alternatives:
                suggestions.append({
                    'original_product': {
                        'id': product.id,
                        'name': product.name,
                        'sustainability_score': product.sustainability_score
                    },
                    'alternatives': [
                        {
                            'id': alt.id,
                            'name': alt.name,
                            'price': alt.price,
                            'sustainability_score': alt.sustainability_score
                        } for alt in alternatives
                    ]
                })
    
    return suggestions

def generate_impact_summary(avg_sustainability, eco_percentage):
    """Generate environmental impact summary"""
    if avg_sustainability >= 80:
        impact_level = "Excellent"
        message = "Your shopping choices have a very positive environmental impact!"
    elif avg_sustainability >= 60:
        impact_level = "Good"
        message = "You're making environmentally conscious choices. Keep it up!"
    elif avg_sustainability >= 40:
        impact_level = "Moderate"
        message = "There's room for improvement in your sustainability choices."
    else:
        impact_level = "Needs Improvement"
        message = "Consider choosing more eco-friendly products for better environmental impact."
    
    return {
        'level': impact_level,
        'message': message,
        'eco_percentage': eco_percentage
    }

def get_product_suggestions(user_id, message):
    """Get product suggestions based on chat message"""
    # Simple keyword matching for demo
    suggestions = []
    
    if 'electronics' in message.lower():
        electronics = Product.query.filter_by(category='Electronics').limit(3).all()
        suggestions = [{'id': p.id, 'name': p.name, 'price': p.price} for p in electronics]
    
    return suggestions
