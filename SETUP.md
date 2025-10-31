# X-ray Diagnosis AI - MONAI Integration Setup

## 🚀 **Complete Setup Guide for MONAI Integration**

This guide will help you set up the MONAI-powered X-ray diagnosis tool with support for general X-ray analysis (chest, bone, dental, spine, skull, abdomen, pelvis, extremities).

## 📋 **Prerequisites**

### **Python Environment**
- ✅ Python 3.9 installed (you already have this!)
- ✅ Python 3.14.0 also available (for development)

### **System Requirements**
- Windows 10/11 (you're on Windows)
- Git (installed)
- Node.js 18+ (for frontend)
- Visual Studio Build Tools (for Python packages)

## 🔧 **Local Development Setup**

### **1. Python Environment Setup**

```bash
# Use Python 3.9 for MONAI compatibility
py -3.9 --version

# Install MONAI and dependencies
py -3.9 -m pip install -r api/requirements.txt

# Verify MONAI installation
py -3.9 -c "import monai; print('MONAI version:', monai.__version__)"
```

### **2. Frontend Setup**

```bash
# Install Node.js dependencies
npm install

# Start development server
npm run dev
```

### **3. Test MONAI Service**

```bash
# Test the MONAI service
cd api
py -3.9 -c "from services.monai_service import MONAIService; service = MONAIService(); print('Service initialized successfully')"
```

## 🌐 **Vercel Deployment Setup**

### **1. Environment Variables**

Add these to your Vercel project settings:

```env
NODE_ENV=production
PYTHON_VERSION=3.9
```

### **2. GitHub Secrets**

Add these secrets to your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel API token
- `ORG_ID`: Your Vercel organization ID  
- `PROJECT_ID`: Your Vercel project ID

### **3. Deploy**

```bash
# Push to main branch triggers automatic deployment
git add .
git commit -m "Add MONAI integration"
git push origin main
```

## 🏗️ **Project Structure**

```
xray-diagnosis-ai/
├── api/                          # Python backend
│   ├── services/
│   │   └── monai_service.py     # MONAI X-ray analysis service
│   ├── analyze-xray.py          # Vercel serverless function
│   └── requirements.txt         # Python dependencies
├── src/                         # React frontend
├── .github/workflows/           # GitHub Actions
├── vercel.json                  # Vercel configuration
└── package.json                 # Node.js dependencies
```

## 🔬 **MONAI Features**

### **Supported X-ray Types**
- **Chest**: Lung, heart, rib analysis
- **Bone**: Fractures, joint analysis
- **Dental**: Tooth, jaw analysis
- **Spine**: Vertebral analysis
- **Skull**: Cranial analysis
- **Abdomen**: Abdominal organ analysis
- **Pelvis**: Pelvic bone analysis
- **Extremities**: Arms, legs analysis
- **General**: Universal X-ray analysis

### **Analysis Capabilities**
- ✅ MONAI framework integration
- ✅ Fallback analysis (OpenCV)
- ✅ Multiple body part support
- ✅ Patient risk factor assessment
- ✅ Clinical recommendations
- ✅ Confidence scoring

## 🚀 **API Usage**

### **Endpoint**: `/api/analyze-xray`

### **Request Format**:
```json
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
```

### **Response Format**:
```json
{
  "findings": [
    "Chest X-ray analysis completed",
    "Lung fields appear clear bilaterally",
    "No obvious abnormalities detected"
  ],
  "recommendations": [
    "Continue routine monitoring",
    "Follow up as scheduled"
  ],
  "riskFactors": [
    "No significant risk factors identified"
  ],
  "confidence": 0.85,
  "framework": "MONAI",
  "xrayType": "chest",
  "timestamp": "2025-01-17T19:12:00.000Z"
}
```

## 🔄 **Development Workflow**

### **1. Local Testing**
```bash
# Test MONAI service locally
cd api
py -3.9 services/monai_service.py test_image.png chest '{"age": 45}'
```

### **2. Frontend Integration**
```javascript
// Example frontend usage
const analyzeXRay = async (imageFile, xrayType, patientInfo) => {
  const base64 = await fileToBase64(imageFile);
  
  const response = await fetch('/api/analyze-xray', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image: base64,
      xrayType: xrayType,
      patientInfo: patientInfo
    })
  });
  
  return await response.json();
};
```

### **3. Deployment**
- Push to `main` branch
- GitHub Actions runs tests
- Vercel automatically deploys
- MONAI service available at `/api/analyze-xray`

## 🛠️ **Troubleshooting**

### **Python Issues**
```bash
# If MONAI import fails
py -3.9 -m pip install --upgrade pip
py -3.9 -m pip install monai torch torchvision

# If Visual C++ errors occur
# Download and install: https://aka.ms/vs/16/release/vc_redist.x64.exe
```

### **Vercel Issues**
- Check Python version in `vercel.json`
- Ensure `requirements.txt` is in `api/` directory
- Verify function timeout settings

### **GitHub Actions Issues**
- Check secrets are properly set
- Verify Vercel project IDs
- Check Python version compatibility

## 📊 **Performance Optimization**

### **Vercel Limits**
- ✅ 50MB function size limit
- ✅ 30-second timeout
- ✅ Python 3.9 runtime
- ✅ Automatic scaling

### **MONAI Optimization**
- ✅ Lazy loading of models
- ✅ Fallback analysis
- ✅ Efficient image processing
- ✅ Memory management

## 🎯 **Next Steps**

1. **Test the integration** with sample X-ray images
2. **Customize analysis** for specific use cases
3. **Add more X-ray types** as needed
4. **Implement model training** with your datasets
5. **Add authentication** for production use

## 📞 **Support**

- **MONAI Documentation**: https://docs.monai.io/
- **Vercel Python**: https://vercel.com/docs/functions/serverless-functions/runtimes/python
- **GitHub Actions**: https://docs.github.com/en/actions

---

**🎉 Congratulations!** Your MONAI-powered X-ray diagnosis tool is now ready for deployment with support for general X-ray analysis across multiple body parts!








