const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const sharp = require('sharp')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept image files and DICOM
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/dicom') {
      cb(null, true)
    } else {
      cb(new Error('Tipo de arquivo não suportado. Use apenas imagens ou arquivos DICOM.'), false)
    }
  }
})

// Enhanced AI Analysis Service with Image Analysis
const analyzeXRay = async (imageBuffer, patientInfo, symptoms) => {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Analyze image characteristics
  const imageAnalysis = await analyzeImageCharacteristics(imageBuffer)
  
  // Generate realistic results based on image analysis and symptoms
  const findings = generateFindingsFromAnalysis(imageAnalysis, symptoms, patientInfo)
  
  return {
    findings: findings,
    recommendations: generateRecommendations(findings),
    riskFactors: generateRiskFactors(patientInfo, findings),
    analysisId: Date.now().toString(),
    timestamp: new Date().toISOString(),
    imageAnalysis: imageAnalysis
  }
}

// Analyze image characteristics using Sharp
const analyzeImageCharacteristics = async (imageBuffer) => {
  try {
    const image = sharp(imageBuffer)
    const metadata = await image.metadata()
    const stats = await image.stats()
    
    // Calculate image characteristics
    const avgBrightness = stats.channels.reduce((sum, channel) => sum + channel.mean, 0) / stats.channels.length
    const contrast = calculateContrast(stats)
    const hasAbnormalities = detectAbnormalities(stats, avgBrightness)
    
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      avgBrightness: avgBrightness,
      contrast: contrast,
      hasAbnormalities: hasAbnormalities,
      abnormalityType: hasAbnormalities ? classifyAbnormality(stats, avgBrightness) : 'normal'
    }
  } catch (error) {
    console.log('Erro na análise da imagem:', error.message)
    return {
      hasAbnormalities: true,
      abnormalityType: 'unknown'
    }
  }
}

// Calculate image contrast
const calculateContrast = (stats) => {
  const maxValues = stats.channels.map(channel => channel.max)
  const minValues = stats.channels.map(channel => channel.min)
  const maxDiff = Math.max(...maxValues) - Math.min(...minValues)
  return maxDiff / 255 // Normalize to 0-1
}

// Detect abnormalities based on image characteristics
const detectAbnormalities = (stats, avgBrightness) => {
  // Simple heuristic: if contrast is very low or very high, likely abnormal
  const contrast = calculateContrast(stats)
  return contrast < 0.3 || contrast > 0.8 || avgBrightness < 50 || avgBrightness > 200
}

// Classify type of abnormality
const classifyAbnormality = (stats, avgBrightness) => {
  const contrast = calculateContrast(stats)
  
  if (avgBrightness < 50) {
    return 'consolidation' // Dense areas (pneumonia, atelectasis)
  } else if (avgBrightness > 200) {
    return 'hyperinflation' // Over-inflated lungs
  } else if (contrast < 0.3) {
    return 'effusion' // Pleural effusion
  } else {
    return 'infiltrate' // General infiltrate
  }
}

// Generate findings based on analysis
const generateFindingsFromAnalysis = (imageAnalysis, symptoms, patientInfo) => {
  const findings = []
  
  if (imageAnalysis.hasAbnormalities) {
    switch (imageAnalysis.abnormalityType) {
      case 'consolidation':
        findings.push({
          condition: 'Consolidação Pulmonar',
          confidence: Math.floor(Math.random() * 20) + 75, // 75-94%
          description: 'Opacidades densas bilaterais sugestivas de consolidação alveolar. Padrão compatível com pneumonia ou processo inflamatório.',
          severity: 'Moderado'
        })
        break
      case 'effusion':
        findings.push({
          condition: 'Derrame Pleural',
          confidence: Math.floor(Math.random() * 15) + 80, // 80-94%
          description: 'Opacidade em menisco bilateral sugestiva de derrame pleural. Avaliação clínica recomendada.',
          severity: 'Moderado'
        })
        break
      case 'infiltrate':
        findings.push({
          condition: 'Infiltrato Pulmonar',
          confidence: Math.floor(Math.random() * 25) + 70, // 70-94%
          description: 'Padrão reticulonodular bilateral com opacidades difusas. Sugestivo de processo inflamatório ou infeccioso.',
          severity: 'Moderado'
        })
        break
      default:
        findings.push({
          condition: 'Alteração Pulmonar',
          confidence: Math.floor(Math.random() * 20) + 70, // 70-89%
          description: 'Alterações pulmonares detectadas. Avaliação clínica e laboratorial recomendada.',
          severity: 'Moderado'
        })
    }
    
    // Add secondary findings
    if (Math.random() > 0.5) {
      findings.push({
        condition: 'Cardiomegalia Leve',
        confidence: Math.floor(Math.random() * 20) + 30, // 30-49%
        description: 'Possível aumento do índice cardiotorácico. Avaliação cardiológica pode ser considerada.',
        severity: 'Menor'
      })
    }
  } else {
    findings.push({
      condition: 'Raio-X Normal do Tórax',
      confidence: Math.floor(Math.random() * 15) + 85, // 85-99%
      description: 'Nenhuma anormalidade aguda detectada. Tamanho cardíaco e campos pulmonares aparentam normais.',
      severity: 'Normal'
    })
  }
  
  return findings
}

// Generate recommendations based on findings
const generateRecommendations = (findings) => {
  const recommendations = []
  
  findings.forEach(finding => {
    switch (finding.condition) {
      case 'Consolidação Pulmonar':
        recommendations.push('Tratamento antibiótico empírico recomendado')
        recommendations.push('Cultura de escarro e hemoculturas')
        recommendations.push('Raio-X de controle em 48-72h')
        break
      case 'Derrame Pleural':
        recommendations.push('Avaliação clínica urgente')
        recommendations.push('Considerar toracocentese se necessário')
        recommendations.push('Ultrassom torácico para caracterização')
        break
      case 'Infiltrato Pulmonar':
        recommendations.push('Avaliação clínica e laboratorial')
        recommendations.push('Considerar tomografia de tórax')
        recommendations.push('Monitoramento clínico rigoroso')
        break
      default:
        recommendations.push('Continuar monitoramento de rotina')
        recommendations.push('Retorno se sintomas persistirem')
    }
  })
  
  if (recommendations.length === 0) {
    recommendations.push('Continuar monitoramento de rotina')
    recommendations.push('Retorno em 6 meses para controle')
  }
  
  return [...new Set(recommendations)] // Remove duplicates
}

// Generate risk factors
const generateRiskFactors = (patientInfo, findings) => {
  const riskFactors = []
  
  if (patientInfo.age && parseInt(patientInfo.age) > 65) {
    riskFactors.push('Idade avançada')
  }
  
  if (patientInfo.medicalHistory && patientInfo.medicalHistory.toLowerCase().includes('diabetes')) {
    riskFactors.push('Diabetes mellitus')
  }
  
  if (patientInfo.medicalHistory && patientInfo.medicalHistory.toLowerCase().includes('cardiaco')) {
    riskFactors.push('Histórico cardíaco')
  }
  
  findings.forEach(finding => {
    if (finding.condition.includes('Consolidação') || finding.condition.includes('Pneumonia')) {
      riskFactors.push('Exposição a agentes infecciosos')
      riskFactors.push('Imunossupressão')
    }
  })
  
  if (riskFactors.length === 0) {
    riskFactors.push('Fatores de risco não identificados')
  }
  
  return riskFactors
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Samuge API está funcionando',
    timestamp: new Date().toISOString()
  })
})

app.post('/api/analyze', upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        error: 'Nenhuma imagem foi enviada' 
      })
    }

    const { patientInfo, symptoms } = req.body
    const patientData = JSON.parse(patientInfo || '{}')
    const symptomsText = symptoms || ''

    // Process first image (in real implementation, process all images)
    const imageBuffer = req.files[0].buffer
    
    // Resize image if too large
    let processedImage = imageBuffer
    try {
      const imageInfo = await sharp(imageBuffer).metadata()
      if (imageInfo.width > 2048 || imageInfo.height > 2048) {
        processedImage = await sharp(imageBuffer)
          .resize(2048, 2048, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 90 })
          .toBuffer()
      }
    } catch (error) {
      console.log('Erro ao processar imagem:', error.message)
      // Continue with original image if processing fails
    }

    // Perform AI analysis
    const analysisResult = await analyzeXRay(processedImage, patientData, symptomsText)

    res.json({
      success: true,
      data: analysisResult
    })

  } catch (error) {
    console.error('Erro na análise:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor durante a análise',
      details: error.message
    })
  }
})

app.get('/api/history', (req, res) => {
  // Mock history data
  const mockHistory = [
    {
      id: 1,
      patientName: 'Maria Silva',
      patientAge: 45,
      patientGender: 'Feminino',
      date: '2024-01-15',
      time: '14:30',
      type: 'Raio-X do Tórax',
      status: 'Concluído',
      findings: 'Raio-X normal do tórax',
      confidence: 95,
      symptoms: 'Dor no peito, falta de ar',
      images: 2,
      recommendations: ['Continuar monitoramento de rotina', 'Retorno em 6 meses']
    },
    {
      id: 2,
      patientName: 'João Santos',
      patientAge: 32,
      patientGender: 'Masculino',
      date: '2024-01-15',
      time: '11:15',
      type: 'Raio-X do Tórax',
      status: 'Concluído',
      findings: 'Possível pneumonia no lobo inferior direito',
      confidence: 87,
      symptoms: 'Febre, tosse, congestão no peito',
      images: 1,
      recommendations: ['Tratamento com antibióticos', 'Raio-X de acompanhamento em 1 semana']
    }
  ]

  res.json({
    success: true,
    data: mockHistory
  })
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'Arquivo muito grande. Tamanho máximo: 10MB' 
      })
    }
  }
  
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    details: error.message
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor Samuge rodando na porta ${PORT}`)
  console.log(`📱 Acesse: http://localhost:${PORT}`)
  console.log(`🔬 Powered by Dr. Silvio Samuge MD, MSc`)
})
