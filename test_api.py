#!/usr/bin/env python3
"""
Test script for the X-ray Analysis API
Tests both local and deployed endpoints
"""

import requests
import base64
import json
import os
from PIL import Image
import io

def create_test_image():
    """Create a simple test X-ray image"""
    # Create a simple grayscale image that looks like an X-ray
    import numpy as np
    
    # Create a 224x224 grayscale image
    img_array = np.random.randint(50, 200, (224, 224), dtype=np.uint8)
    
    # Add some structure to make it look more like an X-ray
    img_array[50:150, 50:150] = 100  # Darker area (like lungs)
    img_array[100:120, 100:120] = 150  # Brighter area (like heart)
    
    # Convert to PIL Image
    img = Image.fromarray(img_array, mode='L')
    
    # Convert to base64
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    img_str = base64.b64encode(buffer.getvalue()).decode()
    
    return img_str

def test_local_api():
    """Test the local API endpoint"""
    print("Testing Local API...")
    
    try:
        # Import and test the local handler
        import sys
        sys.path.append('api')
        from api.analyze_xray import handler
        
        # Create test request
        test_image = create_test_image()
        request_data = {
            'method': 'POST',
            'body': json.dumps({
                'image': test_image,
                'xrayType': 'chest',
                'patientInfo': {
                    'age': 45,
                    'gender': 'male',
                    'smoking': False,
                    'diabetes': False
                }
            })
        }
        
        # Test the handler
        result = handler(request_data)
        
        print(f"Local API Status: {result['statusCode']}")
        if result['statusCode'] == 200:
            response_data = json.loads(result['body'])
            print(f"Analysis completed successfully")
            print(f"   Framework: {response_data.get('framework', 'Unknown')}")
            print(f"   Confidence: {response_data.get('confidence', 'N/A')}")
            print(f"   Findings: {len(response_data.get('findings', []))} items")
        else:
            print(f"Error: {result['body']}")
            
    except Exception as e:
        print(f"Local API Error: {e}")

def test_deployed_api(vercel_url):
    """Test the deployed API endpoint"""
    print(f"Testing Deployed API at {vercel_url}...")
    
    try:
        # Create test request
        test_image = create_test_image()
        
        payload = {
            'image': test_image,
            'xrayType': 'chest',
            'patientInfo': {
                'age': 45,
                'gender': 'male',
                'smoking': False,
                'diabetes': False
            }
        }
        
        # Make request to deployed API
        response = requests.post(
            f"{vercel_url}/api/analyze-xray",
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        print(f"Deployed API Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Analysis completed successfully")
            print(f"   Framework: {result.get('framework', 'Unknown')}")
            print(f"   Confidence: {result.get('confidence', 'N/A')}")
            print(f"   Findings: {len(result.get('findings', []))} items")
            print(f"   X-ray Type: {result.get('xrayType', 'Unknown')}")
        else:
            print(f"Error: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"Network Error: {e}")
    except Exception as e:
        print(f"Deployed API Error: {e}")

def test_different_xray_types():
    """Test different X-ray types"""
    print("Testing Different X-ray Types...")
    
    xray_types = ['chest', 'bone', 'dental', 'spine', 'skull', 'abdomen', 'pelvis', 'extremities']
    
    for xray_type in xray_types:
        try:
            import sys
            sys.path.append('api')
            from api.analyze_xray import handler
            
            test_image = create_test_image()
            request_data = {
                'method': 'POST',
                'body': json.dumps({
                    'image': test_image,
                    'xrayType': xray_type,
                    'patientInfo': {'age': 30}
                })
            }
            
            result = handler(request_data)
            
            if result['statusCode'] == 200:
                response_data = json.loads(result['body'])
                print(f"{xray_type.title()}: {response_data.get('confidence', 'N/A')} confidence")
            else:
                print(f"{xray_type.title()}: Error")
                
        except Exception as e:
            print(f"{xray_type.title()}: {e}")

def main():
    """Main test function"""
    print("X-ray Analysis API Test Suite")
    print("=" * 50)
    
    # Test local API
    test_local_api()
    print()
    
    # Test different X-ray types
    test_different_xray_types()
    print()
    
    # Test deployed API (replace with your actual Vercel URL)
    vercel_url = "https://your-app-name.vercel.app"  # Replace with your actual URL
    print(f"To test deployed API, update the vercel_url variable with your actual Vercel URL")
    print(f"   Current URL: {vercel_url}")
    print(f"   Then uncomment the line below:")
    print(f"   # test_deployed_api(vercel_url)")
    
    # Uncomment this line when you have your Vercel URL:
    # test_deployed_api(vercel_url)

if __name__ == "__main__":
    main()
