
from app import db
from datetime import datetime
from sqlalchemy import func
import json

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    username = db.Column(db.String(80), unique=True, nullable=False)
    trust_score = db.Column(db.Float, default=50.0)
    total_purchases = db.Column(db.Integer, default=0)
    verified_buyer = db.Column(db.Boolean, default=False)
    sustainability_score = db.Column(db.Float, default=0.0)
    preferences = db.Column(db.Text)  # JSON string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_active = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    reviews = db.relationship('Review', backref='user', lazy=True)
    purchases = db.relationship('Purchase', backref='user', lazy=True)
    cart_items = db.relationship('CartItem', backref='user', lazy=True)

class Product(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float)
    category = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(500))
    sustainability_score = db.Column(db.Float, default=0.0)
    eco_friendly = db.Column(db.Boolean, default=False)
    stock_quantity = db.Column(db.Integer, default=0)
    ai_metadata = db.Column(db.Text)  # JSON string for AI features
    seasonal_demand = db.Column(db.Float, default=1.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    reviews = db.relationship('Review', backref='product', lazy=True)
    cart_items = db.relationship('CartItem', backref='product', lazy=True)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.String(50), db.ForeignKey('product.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(200))
    content = db.Column(db.Text)
    verified_purchase = db.Column(db.Boolean, default=False)
    trust_weighted_score = db.Column(db.Float)
    helpful_votes = db.Column(db.Integer, default=0)
    images = db.Column(db.Text)  # JSON array of image URLs
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.String(50), db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price_paid = db.Column(db.Float, nullable=False)
    purchase_date = db.Column(db.DateTime, default=datetime.utcnow)
    delivery_date = db.Column(db.DateTime)
    satisfaction_score = db.Column(db.Float)

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.String(50), db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    ai_suggested = db.Column(db.Boolean, default=False)
    prediction_confidence = db.Column(db.Float)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

class TrustScore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    score_type = db.Column(db.String(50))  # 'review_accuracy', 'helpfulness', etc.
    score_value = db.Column(db.Float)
    calculated_at = db.Column(db.DateTime, default=datetime.utcnow)

class SocialConnection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    connected_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    connection_type = db.Column(db.String(50))  # 'shopping_buddy', 'trusted_mentor'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class AIRecommendation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.String(50), db.ForeignKey('product.id'), nullable=False)
    recommendation_type = db.Column(db.String(50))  # 'predictive', 'alternative', 'bundle'
    confidence_score = db.Column(db.Float)
    reasoning = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    acted_upon = db.Column(db.Boolean, default=False)
