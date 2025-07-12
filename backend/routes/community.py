
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, SocialConnection, Review, Product, db
from sqlalchemy import desc, func
import json

community_bp = Blueprint('community', __name__)

@community_bp.route('/trust-leaders', methods=['GET'])
def get_trust_leaders():
    trust_leaders = User.query.filter(
        User.verified_buyer == True
    ).order_by(desc(User.trust_score)).limit(20).all()
    
    leaders_data = []
    for user in trust_leaders:
        review_count = Review.query.filter_by(user_id=user.id).count()
        helpful_reviews = Review.query.filter_by(user_id=user.id).filter(
            Review.helpful_votes > 5
        ).count()
        
        leaders_data.append({
            'id': user.id,
            'username': user.username,
            'trust_score': user.trust_score,
            'total_reviews': review_count,
            'helpful_reviews': helpful_reviews,
            'sustainability_score': user.sustainability_score,
            'verified_buyer': user.verified_buyer
        })
    
    return jsonify({'trust_leaders': leaders_data})

@community_bp.route('/shopping-buddies/match', methods=['POST'])
@jwt_required()
def find_shopping_buddies():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    # Parse user preferences
    user_prefs = json.loads(current_user.preferences) if current_user.preferences else {}
    
    # Find users with similar preferences and trust scores
    potential_buddies = User.query.filter(
        User.id != current_user_id,
        User.trust_score >= (current_user.trust_score - 20),
        User.verified_buyer == True
    ).all()
    
    buddy_matches = []
    for user in potential_buddies:
        # Calculate compatibility score based on preferences and shopping history
        compatibility_score = calculate_compatibility(current_user, user)
        
        if compatibility_score > 0.6:  # 60% compatibility threshold
            review_count = Review.query.filter_by(user_id=user.id).count()
            
            buddy_matches.append({
                'id': user.id,
                'username': user.username,
                'trust_score': user.trust_score,
                'compatibility_score': round(compatibility_score, 2),
                'total_reviews': review_count,
                'sustainability_score': user.sustainability_score
            })
    
    # Sort by compatibility score
    buddy_matches.sort(key=lambda x: x['compatibility_score'], reverse=True)
    
    return jsonify({'potential_buddies': buddy_matches[:10]})

@community_bp.route('/connect', methods=['POST'])
@jwt_required()
def connect_with_user():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    target_user_id = data.get('user_id')
    connection_type = data.get('type', 'shopping_buddy')  # or 'trusted_mentor'
    
    # Check if connection already exists
    existing_connection = SocialConnection.query.filter_by(
        user_id=current_user_id,
        connected_user_id=target_user_id
    ).first()
    
    if existing_connection:
        return jsonify({'error': 'Connection already exists'}), 400
    
    # Create new connection
    connection = SocialConnection(
        user_id=current_user_id,
        connected_user_id=target_user_id,
        connection_type=connection_type
    )
    
    db.session.add(connection)
    db.session.commit()
    
    return jsonify({'message': 'Connection created successfully'})

@community_bp.route('/connections', methods=['GET'])
@jwt_required()
def get_connections():
    current_user_id = get_jwt_identity()
    
    connections = db.session.query(SocialConnection, User).join(
        User, SocialConnection.connected_user_id == User.id
    ).filter(SocialConnection.user_id == current_user_id).all()
    
    connection_data = []
    for connection, user in connections:
        connection_data.append({
            'id': connection.id,
            'user': {
                'id': user.id,
                'username': user.username,
                'trust_score': user.trust_score,
                'verified_buyer': user.verified_buyer
            },
            'type': connection.connection_type,
            'connected_at': connection.created_at.isoformat()
        })
    
    return jsonify({'connections': connection_data})

@community_bp.route('/activity-feed', methods=['GET'])
@jwt_required()
def get_activity_feed():
    current_user_id = get_jwt_identity()
    
    # Get connections
    connections = SocialConnection.query.filter_by(user_id=current_user_id).all()
    connected_user_ids = [conn.connected_user_id for conn in connections]
    connected_user_ids.append(current_user_id)  # Include own activity
    
    # Get recent reviews from connected users
    recent_reviews = db.session.query(Review, User, Product).join(
        User, Review.user_id == User.id
    ).join(Product, Review.product_id == Product.id).filter(
        Review.user_id.in_(connected_user_ids)
    ).order_by(desc(Review.created_at)).limit(20).all()
    
    activity_data = []
    for review, user, product in recent_reviews:
        activity_data.append({
            'type': 'review',
            'user': {
                'username': user.username,
                'trust_score': user.trust_score
            },
            'product': {
                'id': product.id,
                'name': product.name,
                'image': product.image_url
            },
            'review': {
                'rating': review.rating,
                'title': review.title,
                'verified_purchase': review.verified_purchase
            },
            'timestamp': review.created_at.isoformat()
        })
    
    return jsonify({'activity_feed': activity_data})

def calculate_compatibility(user1, user2):
    """Calculate compatibility score between two users based on preferences and behavior"""
    score = 0.5  # Base compatibility
    
    # Parse preferences
    prefs1 = json.loads(user1.preferences) if user1.preferences else {}
    prefs2 = json.loads(user2.preferences) if user2.preferences else {}
    
    # Compare category preferences
    categories1 = set(prefs1.get('categories', []))
    categories2 = set(prefs2.get('categories', []))
    
    if categories1 and categories2:
        category_overlap = len(categories1.intersection(categories2)) / len(categories1.union(categories2))
        score += category_overlap * 0.3
    
    # Compare sustainability scores
    sustain_diff = abs(user1.sustainability_score - user2.sustainability_score)
    if sustain_diff < 20:
        score += 0.2
    
    return min(score, 1.0)
