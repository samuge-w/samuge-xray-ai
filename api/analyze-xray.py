#!/usr/bin/env python3
"""
Standalone Python script for X-ray analysis via MONAI
Called by Node.js subprocess
"""

import json
import sys
import os
from PIL import Image

# Add the api directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services.monai_service import MONAIService

def main():
    try:
        # Get command line arguments
        if len(sys.argv) < 4:
            print(json.dumps({
                'error': 'Missing arguments. Usage: python analyze-xray.py <image_path> <patient_info> <xray_type>'
            }))
            sys.exit(1)
        
        image_path = sys.argv[1]
        patient_info_str = sys.argv[2]
        xray_type = sys.argv[3]
        
        # Parse patient info
        try:
            patient_info = json.loads(patient_info_str)
        except json.JSONDecodeError:
            patient_info = {}
        
        # Load image
        try:
            image = Image.open(image_path)
        except Exception as e:
            print(json.dumps({
                'error': f'Could not load image: {str(e)}'
            }))
            sys.exit(1)
        
        # Initialize MONAI service
        monai_service = MONAIService()
        
        # Perform analysis
        result = monai_service.analyze_xray(
            image=image,
            patient_info=patient_info,
            xray_type=xray_type
        )
        
        # Output result as JSON
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({
            'error': 'Internal server error',
            'details': str(e)
        }))
        sys.exit(1)

if __name__ == '__main__':
    main()