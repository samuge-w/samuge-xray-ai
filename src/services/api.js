import axios from 'axios'

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://samuge-xray-ai.onrender.com/api'
  : 'http://localhost:10000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for AI analysis
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Fazendo requisição para: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ Erro na requisição:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta recebida: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.data || error.message)
    
    // Handle specific error cases
    if (error.response?.status === 413) {
      throw new Error('Arquivo muito grande. Tamanho máximo: 10MB')
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data.error || 'Dados inválidos enviados')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout na análise. Tente novamente.')
    } else if (!error.response) {
      throw new Error('Erro de conexão. Verifique sua internet.')
    }
    
    throw error
  }
)

// API functions
export const apiService = {
  // Health check
  async checkHealth() {
    try {
      const response = await api.get('/health')
      return response.data
    } catch (error) {
      throw new Error('Servidor não está respondendo')
    }
  },

  // Analyze X-ray images
  async analyzeXRay(images, patientInfo, symptoms) {
    try {
      const formData = new FormData()
      
      // Add images to form data
      images.forEach((imageFile, index) => {
        formData.append('images', imageFile)
      })
      
      // Add patient info and symptoms
      formData.append('patientInfo', JSON.stringify(patientInfo))
      formData.append('symptoms', symptoms)
      
      const response = await api.post('/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get analysis history
  async getHistory() {
    try {
      const response = await api.get('/history')
      return response.data
    } catch (error) {
      throw new Error('Erro ao carregar histórico')
    }
  },

  // Export analysis report (mock function)
  async exportReport(analysisId) {
    try {
      // In a real implementation, this would generate and return a PDF
      console.log(`Exportando relatório para análise: ${analysisId}`)
      
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        message: 'Relatório exportado com sucesso',
        downloadUrl: `/reports/${analysisId}.pdf`
      }
    } catch (error) {
      throw new Error('Erro ao exportar relatório')
    }
  }
}

export default api
