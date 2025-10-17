#!/usr/bin/env python3
"""
Authentication service for X-ray Analysis API
Provides JWT-based authentication and API key management
"""

import os
import jwt
import hashlib
import secrets
from datetime import datetime, timedelta
from functools import wraps
import json

# Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24

# API Keys (in production, store in database)
API_KEYS = {
    'demo-key-123': {
        'name': 'Demo API Key',
        'permissions': ['analyze_xray', 'view_results'],
        'rate_limit': 100,  # requests per hour
        'created_at': '2024-01-01T00:00:00Z'
    },
    'research-key-456': {
        'name': 'Research API Key',
        'permissions': ['analyze_xray', 'view_results', 'export_data'],
        'rate_limit': 1000,
        'created_at': '2024-01-01T00:00:00Z'
    }
}

def generate_api_key():
    """Generate a new API key"""
    return f"xray-{secrets.token_urlsafe(32)}"

def hash_password(password):
    """Hash password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password, hashed):
    """Verify password against hash"""
    return hash_password(password) == hashed

def create_jwt_token(user_id, permissions=None):
    """Create JWT token for user"""
    payload = {
        'user_id': user_id,
        'permissions': permissions or [],
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token):
    """Verify JWT token and return payload"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def verify_api_key(api_key):
    """Verify API key and return permissions"""
    if api_key in API_KEYS:
        return API_KEYS[api_key]
    return None

def require_auth(permission=None):
    """Decorator to require authentication"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Get authorization header
            auth_header = None
            if hasattr(args[0], 'headers'):
                auth_header = args[0].headers.get('Authorization')
            
            if not auth_header:
                return {
                    'statusCode': 401,
                    'body': json.dumps({'error': 'Authorization header required'})
                }
            
            # Check for Bearer token or API key
            if auth_header.startswith('Bearer '):
                token = auth_header[7:]
                payload = verify_jwt_token(token)
                if not payload:
                    return {
                        'statusCode': 401,
                        'body': json.dumps({'error': 'Invalid or expired token'})
                    }
                
                # Check permission if required
                if permission and permission not in payload.get('permissions', []):
                    return {
                        'statusCode': 403,
                        'body': json.dumps({'error': f'Permission {permission} required'})
                    }
                
                # Add user info to kwargs
                kwargs['user_id'] = payload['user_id']
                kwargs['permissions'] = payload['permissions']
                
            elif auth_header.startswith('ApiKey '):
                api_key = auth_header[7:]
                key_info = verify_api_key(api_key)
                if not key_info:
                    return {
                        'statusCode': 401,
                        'body': json.dumps({'error': 'Invalid API key'})
                    }
                
                # Check permission if required
                if permission and permission not in key_info.get('permissions', []):
                    return {
                        'statusCode': 403,
                        'body': json.dumps({'error': f'Permission {permission} required'})
                    }
                
                # Add API key info to kwargs
                kwargs['api_key'] = api_key
                kwargs['permissions'] = key_info['permissions']
                
            else:
                return {
                    'statusCode': 401,
                    'body': json.dumps({'error': 'Invalid authorization format. Use Bearer <token> or ApiKey <key>'})
                }
            
            return func(*args, **kwargs)
        return wrapper
    return decorator

def rate_limit_check(api_key, endpoint):
    """Check rate limit for API key (simplified implementation)"""
    # In production, implement proper rate limiting with Redis or similar
    return True

def authenticate_user(username, password):
    """Authenticate user with username/password (demo implementation)"""
    # Demo users (in production, use database)
    users = {
        'demo': {
            'password_hash': hash_password('demo123'),
            'permissions': ['analyze_xray', 'view_results']
        },
        'admin': {
            'password_hash': hash_password('admin123'),
            'permissions': ['analyze_xray', 'view_results', 'export_data', 'manage_users']
        }
    }
    
    if username in users and verify_password(password, users[username]['password_hash']):
        return {
            'user_id': username,
            'permissions': users[username]['permissions']
        }
    return None

def get_auth_info(request):
    """Extract authentication info from request"""
    auth_header = request.headers.get('Authorization', '')
    
    if auth_header.startswith('Bearer '):
        token = auth_header[7:]
        payload = verify_jwt_token(token)
        if payload:
            return {
                'type': 'jwt',
                'user_id': payload['user_id'],
                'permissions': payload['permissions']
            }
    
    elif auth_header.startswith('ApiKey '):
        api_key = auth_header[7:]
        key_info = verify_api_key(api_key)
        if key_info:
            return {
                'type': 'api_key',
                'api_key': api_key,
                'permissions': key_info['permissions']
            }
    
    return None

# Demo endpoints for authentication
def login_endpoint(request):
    """Login endpoint to get JWT token"""
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Username and password required'})
            }
        
        user = authenticate_user(username, password)
        if not user:
            return {
                'statusCode': 401,
                'body': json.dumps({'error': 'Invalid credentials'})
            }
        
        token = create_jwt_token(user['user_id'], user['permissions'])
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'token': token,
                'user_id': user['user_id'],
                'permissions': user['permissions'],
                'expires_in': JWT_EXPIRATION_HOURS * 3600
            })
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid JSON'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Login failed: {str(e)}'})
        }

def api_keys_endpoint(request):
    """Get available API keys (demo endpoint)"""
    keys_info = []
    for key, info in API_KEYS.items():
        keys_info.append({
            'key': key,
            'name': info['name'],
            'permissions': info['permissions'],
            'rate_limit': info['rate_limit']
        })
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'api_keys': keys_info,
            'note': 'These are demo API keys. In production, generate unique keys for each user.'
        })
    }
