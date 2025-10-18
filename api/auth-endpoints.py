#!/usr/bin/env python3
"""
Standalone Python script for authentication
Called by Node.js subprocess
"""

import json
import sys
import os

# Add the api directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from auth import create_jwt_token, authenticate_user, generate_api_key

def main():
    try:
        # Get command line arguments
        if len(sys.argv) < 3:
            print(json.dumps({
                'error': 'Missing arguments. Usage: python auth-endpoints.py <action> <args...>'
            }))
            sys.exit(1)
        
        action = sys.argv[1]
        
        if action == 'login':
            if len(sys.argv) < 4:
                print(json.dumps({
                    'error': 'Missing username/password for login'
                }))
                sys.exit(1)
            
            username = sys.argv[2]
            password = sys.argv[3]
            
            # Authenticate user
            user = authenticate_user(username, password)
            if not user:
                print(json.dumps({
                    'error': 'Invalid credentials'
                }))
                sys.exit(1)
            
            # Create JWT token
            token = create_jwt_token(user['user_id'], user['permissions'])
            
            result = {
                'success': True,
                'token': token,
                'user_id': user['user_id'],
                'permissions': user['permissions'],
                'expires_in': 24 * 3600  # 24 hours
            }
            
            print(json.dumps(result))
            
        elif action == 'generate-key':
            if len(sys.argv) < 3:
                print(json.dumps({
                    'error': 'Missing token for API key generation'
                }))
                sys.exit(1)
            
            token = sys.argv[2]
            
            # Generate API key (simplified for demo)
            api_key = generate_api_key(token)
            
            result = {
                'success': True,
                'api_key': api_key,
                'permissions': ['analyze_xray', 'view_results']
            }
            
            print(json.dumps(result))
            
        else:
            print(json.dumps({
                'error': f'Unknown action: {action}',
                'available_actions': ['login', 'generate-key']
            }))
            sys.exit(1)
        
    except Exception as e:
        print(json.dumps({
            'error': 'Internal server error',
            'details': str(e)
        }))
        sys.exit(1)

if __name__ == '__main__':
    main()