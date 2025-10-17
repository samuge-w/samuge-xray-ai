#!/usr/bin/env python3
"""
Vercel Serverless Function for X-ray Analysis
Integrates MONAI service with Vercel's serverless environment
"""

import json
import base64
import tempfile
import os
import sys
from typing import Dict, Any
import logging

# Add the services directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'services'))

try:
    from monai_service import MONAIService
    from auth import get_auth_info
except ImportError as e:
    logging.error(f"Could not import required modules: {e}")
    MONAIService = None
    get_auth_info = None

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def handler(request):
    """
    Main handler for Vercel serverless function
    
    Expected request format:
    {
        "image": "base64_encoded_image_data",
        "xrayType": "chest|bone|dental|spine|skull|abdomen|pelvis|extremities|general",
        "patientInfo": {
            "age": 45,
            "gender": "male",
            "smoking": false,
            "diabetes": false,
            "hypertension": false
        }
    }
    """
    
    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    }
    
    # Handle preflight requests
    if request.get('method') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'CORS preflight'})
        }
    
    # Check authentication (optional for demo - can be enabled for production)
    auth_required = os.environ.get('AUTH_REQUIRED', 'false').lower() == 'true'
    if auth_required and get_auth_info:
        auth_info = get_auth_info(request)
        if not auth_info:
            return {
                'statusCode': 401,
                'headers': headers,
                'body': json.dumps({
                    'error': 'Authentication required',
                    'message': 'Please provide valid Authorization header (Bearer token or ApiKey)'
                })
            }
        
        # Check if user has analyze_xray permission
        if 'analyze_xray' not in auth_info.get('permissions', []):
            return {
                'statusCode': 403,
                'headers': headers,
                'body': json.dumps({
                    'error': 'Insufficient permissions',
                    'message': 'analyze_xray permission required'
                })
            }
    
    try:
        # Parse request body
        if isinstance(request.get('body'), str):
            body = json.loads(request['body'])
        else:
            body = request.get('body', {})
        
        # Validate required fields
        if 'image' not in body:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'error': 'Missing required field: image',
                    'message': 'Please provide a base64 encoded image'
                })
            }
        
        # Extract parameters
        image_data = body['image']
        xray_type = body.get('xrayType', 'general')
        patient_info = body.get('patientInfo', {})
        
        # Validate X-ray type
        valid_types = [
            'chest', 'bone', 'dental', 'spine', 'skull', 
            'abdomen', 'pelvis', 'extremities', 'general'
        ]
        if xray_type not in valid_types:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'error': f'Invalid X-ray type: {xray_type}',
                    'validTypes': valid_types
                })
            }
        
        # Decode base64 image
        try:
            # Remove data URL prefix if present
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            
            image_bytes = base64.b64decode(image_data)
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'error': 'Invalid image data',
                    'message': 'Please provide valid base64 encoded image'
                })
            }
        
        # Save image to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
            temp_file.write(image_bytes)
            temp_path = temp_file.name
        
        try:
            # Initialize MONAI service
            if MONAIService is None:
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': json.dumps({
                        'error': 'MONAI service not available',
                        'message': 'Please check server configuration'
                    })
                }
            
            service = MONAIService()
            
            # Perform analysis
            logger.info(f"Starting analysis for {xray_type} X-ray")
            result = service.analyze_xray(temp_path, xray_type, patient_info)
            
            # Add request metadata
            result['requestInfo'] = {
                'xrayType': xray_type,
                'patientInfo': patient_info,
                'timestamp': result.get('timestamp'),
                'framework': result.get('framework', 'Unknown')
            }
            
            logger.info(f"Analysis completed successfully for {xray_type} X-ray")
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(result, indent=2)
            }
            
        finally:
            # Clean up temporary file
            try:
                os.unlink(temp_path)
            except Exception as e:
                logger.warning(f"Could not delete temp file: {e}")
    
    except json.JSONDecodeError as e:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({
                'error': 'Invalid JSON',
                'message': 'Please provide valid JSON in request body'
            })
        }
    
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': 'Internal server error',
                'message': 'An unexpected error occurred during analysis'
            })
        }

# For local testing
if __name__ == "__main__":
    # Test with sample data
    test_request = {
        'method': 'POST',
        'body': json.dumps({
            'image': 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',  # 1x1 pixel PNG
            'xrayType': 'chest',
            'patientInfo': {
                'age': 45,
                'gender': 'male',
                'smoking': False,
                'diabetes': False
            }
        })
    }
    
    result = handler(test_request)
    print(json.dumps(result, indent=2))
