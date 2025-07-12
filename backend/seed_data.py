
from app import app, db
from models import Product
import json

def seed_products():
    """Seed the database with sample products"""
    sample_products = [
        {
            'id': '1',
            'name': 'iPhone 15 Pro Max 256GB - Natural Titanium',
            'description': 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
            'price': 1199.99,
            'original_price': 1299.99,
            'category': 'Electronics',
            'image_url': 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
            'sustainability_score': 65.0,
            'eco_friendly': False,
            'stock_quantity': 50,
            'ai_metadata': json.dumps({
                'seasonal_demand': 1.2,
                'purchase_frequency': 'once_per_year',
                'target_audience': ['tech_enthusiasts', 'professionals']
            })
        },
        {
            'id': '2',
            'name': 'Samsung 65" 4K Smart TV',
            'description': 'Crystal clear 4K display with smart TV features and voice control',
            'price': 599.99,
            'original_price': 799.99,
            'category': 'Electronics',
            'image_url': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
            'sustainability_score': 55.0,
            'eco_friendly': False,
            'stock_quantity': 25,
            'ai_metadata': json.dumps({
                'seasonal_demand': 1.5,
                'purchase_frequency': 'every_5_years',
                'target_audience': ['families', 'entertainment_lovers']
            })
        },
        {
            'id': '3',
            'name': 'Nike Air Max 270 Running Shoes',
            'description': 'Comfortable running shoes with Air Max technology',
            'price': 129.99,
            'original_price': 159.99,
            'category': 'Fashion',
            'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            'sustainability_score': 45.0,
            'eco_friendly': False,
            'stock_quantity': 100,
            'ai_metadata': json.dumps({
                'seasonal_demand': 1.1,
                'purchase_frequency': 'yearly',
                'target_audience': ['athletes', 'fitness_enthusiasts']
            })
        },
        {
            'id': '4',
            'name': 'KitchenAid Stand Mixer - 5 Quart',
            'description': 'Professional-grade stand mixer for all your baking needs',
            'price': 279.99,
            'original_price': 349.99,
            'category': 'Home & Garden',
            'image_url': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
            'sustainability_score': 85.0,
            'eco_friendly': True,
            'stock_quantity': 30,
            'ai_metadata': json.dumps({
                'seasonal_demand': 1.8,
                'purchase_frequency': 'once_per_decade',
                'target_audience': ['home_bakers', 'cooking_enthusiasts']
            })
        },
        {
            'id': '5',
            'name': 'Organic Cotton Bed Sheets Set',
            'description': 'Luxurious 100% organic cotton bed sheets, GOTS certified',
            'price': 89.99,
            'original_price': 129.99,
            'category': 'Home & Garden',
            'image_url': 'https://images.unsplash.com/photo-1631049421450-348072d9ba0b?w=400&h=400&fit=crop',
            'sustainability_score': 95.0,
            'eco_friendly': True,
            'stock_quantity': 75,
            'ai_metadata': json.dumps({
                'seasonal_demand': 0.9,
                'purchase_frequency': 'every_2_years',
                'target_audience': ['eco_conscious', 'comfort_seekers']
            })
        }
    ]
    
    for product_data in sample_products:
        existing_product = Product.query.get(product_data['id'])
        if not existing_product:
            product = Product(**product_data)
            db.session.add(product)
    
    db.session.commit()
    print("Sample products added to database!")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed_products()
