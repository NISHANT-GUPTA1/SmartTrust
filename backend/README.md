
# SmartTrust+ Backend

A Flask-based backend for the SmartTrust+ shopping platform that integrates AI-powered intelligence with community-driven social commerce.

## Features

### 🧠 Smart Shopping Intelligence
- AI Shopping Assistant with predictive recommendations
- Predictive Cart that auto-fills essential items
- Smart Budget tracking and analysis
- Consumption-aware restock alerts

### 🤝 TrustConnect Community
- Verified Buyer Network with trust scores
- AI-moderated Product Q&A
- Shopping buddy matching system
- Community activity feeds

### 🌱 Sustainability Features
- EcoChoice sustainability insights
- Environmental impact tracking
- Green alternative suggestions
- Sustainability scoring system

### 🔧 Technical Features
- JWT-based authentication
- Real-time WebSocket connections
- SQLAlchemy database models
- RESTful API endpoints
- AI-powered recommendations

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
export FLASK_APP=app.py
export FLASK_ENV=development
export OPENAI_API_KEY=your_openai_api_key
```

3. Initialize the database:
```bash
python seed_data.py
```

4. Run the application:
```bash
python app.py
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products/` - Get products with filtering and pagination
- `GET /api/products/<id>` - Get product details
- `POST /api/products/<id>/reviews` - Add product review
- `GET /api/products/recommendations` - Get AI recommendations
- `GET /api/products/categories` - Get product categories

### Shopping Cart
- `GET /api/cart/` - Get cart items
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/<id>` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart
- `POST /api/cart/optimize` - Get cart optimization suggestions

### Community
- `GET /api/community/trust-leaders` - Get trust score leaders
- `POST /api/community/shopping-buddies/match` - Find shopping buddies
- `POST /api/community/connect` - Connect with another user
- `GET /api/community/connections` - Get user connections
- `GET /api/community/activity-feed` - Get community activity feed

### AI Assistant
- `POST /api/ai/chat` - Chat with AI assistant
- `GET /api/ai/predictive-cart` - Generate predictive cart
- `POST /api/ai/budget-analysis` - Analyze spending budget
- `GET /api/ai/sustainability-report` - Get sustainability report

## Database Models

### Core Models
- **User**: User accounts with trust scores and preferences
- **Product**: Product catalog with sustainability metrics
- **Review**: User reviews with trust-weighted scoring
- **Purchase**: Purchase history for AI learning
- **CartItem**: Shopping cart functionality

### Social Features
- **SocialConnection**: User connections and shopping buddies
- **TrustScore**: Dynamic trust scoring system
- **AIRecommendation**: AI-generated product recommendations

## WebSocket Events

### Real-time Shopping
- `join_shopping_session` - Join collaborative shopping session
- `cart_update` - Real-time cart synchronization
- `cart_updated` - Broadcast cart changes to session

## AI Features

The backend integrates various AI capabilities:

1. **Predictive Shopping**: Analyzes purchase history to predict future needs
2. **Budget Optimization**: Suggests cost-effective alternatives
3. **Sustainability Scoring**: Calculates environmental impact
4. **Trust Scoring**: Dynamic reputation system for reviews
5. **Compatibility Matching**: Finds compatible shopping buddies

## Security

- JWT tokens for authentication
- Password hashing with Werkzeug
- CORS configuration for frontend integration
- Input validation and sanitization

## Scalability

The backend is designed for horizontal scaling:
- Database connection pooling
- Stateless API design
- Caching strategies with Redis
- Background task processing with Celery

## Development

To add new features:

1. Create new models in `models.py`
2. Add API endpoints in appropriate blueprint files
3. Update database with migrations
4. Add tests for new functionality

## Production Deployment

For production deployment:

1. Use PostgreSQL instead of SQLite
2. Set up Redis for caching
3. Configure Celery for background tasks
4. Use Gunicorn or uWSGI as WSGI server
5. Set up proper logging and monitoring
