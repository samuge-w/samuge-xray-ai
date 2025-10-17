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

// Mock AI Analysis Service
const analyzeXRay = async (imageBuffer, patientInfo, symptoms) => {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Mock analysis results based on patient info
  const mockResults = [
    {
      condition: 'Raio-X Normal do Tórax',
      confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
      description: 'Nenhuma anormalidade aguda detectada. Tamanho cardíaco e campos pulmonares aparentam normais.',
      severity: 'Normal'
    },
    {
      condition: 'Possível Atelectasia Leve',
      confidence: Math.floor(Math.random() * 30) + 10, // 10-39%
      description: 'Áreas menores de colapso pulmonar nos lobos inferiores, provavelmente posicional.',
      severity: 'Menor'
    },
    {
      condition: 'Sugestão de Pneumonia',
      confidence: Math.floor(Math.random() * 40) + 30, // 30-69%
      description: 'Opacidade no lobo inferior direito sugestiva de processo inflamatório.',
      severity: 'Moderado'
    }
  ]

  // Select results based on symptoms
  let selectedResults = []
  if (symptoms.toLowerCase().includes('febre') || symptoms.toLowerCase().includes('tosse')) {
    selectedResults = [mockResults[2], mockResults[1]]
  } else if (symptoms.toLowerCase().includes('dor') || symptoms.toLowerCase().includes('peito')) {
    selectedResults = [mockResults[0], mockResults[1]]
  } else {
    selectedResults = [mockResults[0]]
  }

  return {
    findings: selectedResults,
    recommendations: [
      'Continuar monitoramento de rotina',
      'Considerar raio-X de acompanhamento se sintomas persistirem',
      'Nenhuma intervenção imediata necessária'
    ],
    riskFactors: [
      'Mudanças relacionadas à idade',
      'Condições respiratórias prévias'
    ],
    analysisId: Date.now().toString(),
    timestamp: new Date().toISOString()
  }
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
