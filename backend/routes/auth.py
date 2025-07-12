
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, db
import re

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validation
    if not data.get('email') or not data.get('password') or not data.get('username'):
        return jsonify({'error': 'Email, username, and password are required'}), 400
    
    # Check if user exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'User already exists'}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already taken'}), 400
    
    # Create new user
    user = User(
        email=data['email'],
        username=data['username'],
        password_hash=generate_password_hash(data['password']),
        preferences='{"categories": [], "budget_range": [0, 1000], "sustainability_preference": 0.5}'
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Create access token
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'trust_score': user.trust_score,
            'verified_buyer': user.verified_buyer
        }
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'trust_score': user.trust_score,
                'verified_buyer': user.verified_buyer,
                'sustainability_score': user.sustainability_score
            }
        }), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'id': user.id,
        'email': user.email,
        'username': user.username,
        'trust_score': user.trust_score,
        'verified_buyer': user.verified_buyer,
        'sustainability_score': user.sustainability_score,
        'total_purchases': user.total_purchases,
        'preferences': user.preferences
    })

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    data = request.get_json()
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Update allowed fields
    if 'username' in data:
        if User.query.filter(User.username == data['username'], User.id != user.id).first():
            return jsonify({'error': 'Username already taken'}), 400
        user.username = data['username']
    
    if 'preferences' in data:
        user.preferences = json.dumps(data['preferences'])
    
    db.session.commit()
    
    return jsonify({'message': 'Profile updated successfully'})
