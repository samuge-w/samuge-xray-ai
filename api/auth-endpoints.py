#!/usr/bin/env python3
"""
Authentication endpoints for X-ray Analysis API
Provides login, API key management, and user authentication
"""

import json
import os
import sys
from typing import Dict, Any
import logging

# Add the current directory to the path
sys.path.append(os.path.dirname(__file__))

try:
    from auth import login_endpoint, api_keys_endpoint, create_jwt_token, authenticate_user
except ImportError as e:
    logging.error(f"Could not import auth modules: {e}")
    login_endpoint = None
    api_keys_endpoint = None

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def handler(request):
    """
    Authentication handler for Vercel serverless function
    
    Endpoints:
    - POST /api/auth/login - Login with username/password
    - GET /api/auth/keys - Get available API keys
    - POST /api/auth/refresh - Refresh JWT token
    """
    
    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    }
    
    # Handle preflight requests
    if request.get('method') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'CORS preflight'})
        }
    
    # Get the path to determine endpoint
    path = request.get('path', '')
    
    try:
        if path.endswith('/login') and request.get('method') == 'POST':
            if login_endpoint:
                return login_endpoint(request)
            else:
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': json.dumps({'error': 'Authentication service not available'})
                }
        
        elif path.endswith('/keys') and request.get('method') == 'GET':
            if api_keys_endpoint:
                return api_keys_endpoint(request)
            else:
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': json.dumps({'error': 'Authentication service not available'})
                }
        
        elif path.endswith('/refresh') and request.get('method') == 'POST':
            return refresh_token_endpoint(request)
        
        elif path.endswith('/demo') and request.get('method') == 'GET':
            return demo_auth_endpoint(request)
        
        else:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({
                    'error': 'Endpoint not found',
                    'available_endpoints': [
                        'POST /api/auth/login',
                        'GET /api/auth/keys',
                        'POST /api/auth/refresh',
                        'GET /api/auth/demo'
                    ]
                })
            }
    
    except Exception as e:
        logger.error(f"Authentication error: {e}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': 'Internal server error',
                'message': 'An unexpected error occurred during authentication'
            })
        }

def refresh_token_endpoint(request):
    """Refresh JWT token endpoint"""
    try:
        # For demo purposes, we'll just create a new token
        # In production, validate the refresh token
        
        data = json.loads(request.body) if isinstance(request.body, str) else request.body
        username = data.get('username', 'demo')
        
        # Authenticate user (simplified for demo)
        user = authenticate_user(username, 'demo123')  # Demo password
        if not user:
            user = authenticate_user(username, 'admin123')  # Try admin password
        
        if not user:
            return {
                'statusCode': 401,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'Invalid credentials'})
            }
        
        token = create_jwt_token(user['user_id'], user['permissions'])
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'token': token,
                'user_id': user['user_id'],
                'permissions': user['permissions'],
                'expires_in': 24 * 3600  # 24 hours
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': f'Token refresh failed: {str(e)}'})
        }

def demo_auth_endpoint(request):
    """Demo authentication endpoint with sample credentials"""
    demo_info = {
        'demo_credentials': {
            'username': 'demo',
            'password': 'demo123',
            'permissions': ['analyze_xray', 'view_results']
        },
        'admin_credentials': {
            'username': 'admin',
            'password': 'admin123',
            'permissions': ['analyze_xray', 'view_results', 'export_data', 'manage_users']
        },
        'api_keys': [
            {
                'key': 'demo-key-123',
                'name': 'Demo API Key',
                'permissions': ['analyze_xray', 'view_results']
            },
            {
                'key': 'research-key-456',
                'name': 'Research API Key',
                'permissions': ['analyze_xray', 'view_results', 'export_data']
            }
        ],
        'usage_examples': {
            'login': {
                'method': 'POST',
                'url': '/api/auth/login',
                'body': {
                    'username': 'demo',
                    'password': 'demo123'
                }
            },
            'api_key_usage': {
                'header': 'Authorization: ApiKey demo-key-123',
                'note': 'Use this header for API key authentication'
            },
            'jwt_usage': {
                'header': 'Authorization: Bearer <jwt_token>',
                'note': 'Use this header for JWT token authentication'
            }
        }
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps(demo_info, indent=2)
    }

# For local testing
if __name__ == "__main__":
    # Test login endpoint
    test_request = {
        'method': 'POST',
        'path': '/api/auth/login',
        'body': json.dumps({
            'username': 'demo',
            'password': 'demo123'
        })
    }
    
    result = handler(test_request)
    print("Login test:")
    print(json.dumps(result, indent=2))
    
    # Test demo endpoint
    test_request = {
        'method': 'GET',
        'path': '/api/auth/demo'
    }
    
    result = handler(test_request)
    print("\nDemo endpoint test:")
    print(json.dumps(result, indent=2))
