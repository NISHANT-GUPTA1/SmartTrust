
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from datetime import datetime, timedelta
import os
from werkzeug.security import generate_password_hash, check_password_hash
import openai
import json

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///smarttrust.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Import models and routes
from models import *
from routes.auth import auth_bp
from routes.products import products_bp
from routes.cart import cart_bp
from routes.community import community_bp
from routes.ai_assistant import ai_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(products_bp, url_prefix='/api/products')
app.register_blueprint(cart_bp, url_prefix='/api/cart')
app.register_blueprint(community_bp, url_prefix='/api/community')
app.register_blueprint(ai_bp, url_prefix='/api/ai')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()})

# WebSocket events for real-time features
@socketio.on('join_shopping_session')
def on_join_shopping_session(data):
    user_id = data.get('user_id')
    session_id = data.get('session_id', f'session_{user_id}')
    join_room(session_id)
    emit('joined_session', {'session_id': session_id})

@socketio.on('cart_update')
def on_cart_update(data):
    session_id = data.get('session_id')
    cart_data = data.get('cart_data')
    emit('cart_updated', cart_data, room=session_id)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
