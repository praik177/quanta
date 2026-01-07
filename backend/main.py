from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
import os

# Create Flask app
app = Flask(__name__)

# Configuration - Works locally AND in production
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-later')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///quanta.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

# CORS - Works locally AND in production
allowed_origins = os.environ.get('FRONTEND_URL', 'http://localhost:5173')
CORS(app, 
     supports_credentials=True, 
     origins=[allowed_origins, 'http://localhost:5173'],
     allow_headers=['Content-Type', 'Authorization'],
     expose_headers=['Content-Type'],
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

# Define models
from flask_login import UserMixin
from datetime import datetime

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Strategy(db.Model):
    __tablename__ = 'strategies'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    ticker = db.Column(db.String(10), nullable=False)
    roi = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

# User loader
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Create tables
with app.app_context():
    db.create_all()
    print("✅ Database created successfully!")

# ========== AUTH ROUTES ==========

@app.route('/api/auth/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not username or not email or not password:
            return jsonify({'error': 'All fields required'}), 400
        
        if User.query.filter_by(username=username).first():
            return jsonify({'error': 'Username exists'}), 400
        
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email exists'}), 400
        
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=username, email=email, password_hash=password_hash)
        
        db.session.add(new_user)
        db.session.commit()
        
        login_user(new_user, remember=True)
        
        return jsonify({
            'message': 'Success',
            'user': {'id': new_user.id, 'username': new_user.username, 'email': new_user.email}
        }), 201
    except Exception as e:
        print(f"Signup error: {e}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        user = User.query.filter_by(email=email).first()
        
        if not user or not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        login_user(user, remember=True)
        
        return jsonify({
            'message': 'Success',
            'user': {'id': user.id, 'username': user.username, 'email': user.email}
        }), 200
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/logout', methods=['POST', 'OPTIONS'])
@login_required
def logout():
    if request.method == 'OPTIONS':
        return '', 200
    logout_user()
    return jsonify({'message': 'Logged out'}), 200

@app.route('/api/auth/check', methods=['GET', 'OPTIONS'])
def check_auth():
    if request.method == 'OPTIONS':
        return '', 200
    
    if current_user.is_authenticated:
        return jsonify({
            'authenticated': True,
            'user': {'id': current_user.id, 'username': current_user.username, 'email': current_user.email}
        }), 200
    return jsonify({'authenticated': False}), 200

@app.route('/api/simulate', methods=['POST', 'OPTIONS'])
@login_required
def simulate():
    if request.method == 'OPTIONS':
        return '', 200
    
    return jsonify({
        'paths': [{'month': i, 'path1': 10000 + i * 100} for i in range(60)],
        'statistics': {
            'median': 15000,
            'median_roi': 50.0,
            'probability_of_profit': 75.0,
            'sharpe_ratio': 1.5,
            'min': 8000,
            'max': 25000
        }
    }), 200

# Health check for Railway
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    debug_mode = os.environ.get('FLASK_ENV') != 'production'
    print(f"🚀 Starting Quanta Backend on http://localhost:{port}")
    app.run(debug=debug_mode, port=port, host='0.0.0.0')