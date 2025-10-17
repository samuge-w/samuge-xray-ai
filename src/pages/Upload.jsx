import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload as UploadIcon, X, FileImage, Brain, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [symptoms, setSymptoms] = useState('')
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    medicalHistory: ''
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.dicom']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        toast.error('Alguns arquivos foram rejeitados. Verifique o formato e tamanho.')
      }
      
      const newFiles = acceptedFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file)
      }))
      
      setUploadedFiles(prev => [...prev, ...newFiles])
      toast.success(`${acceptedFiles.length} arquivo(s) carregado(s) com sucesso!`)
    }
  })

  const removeFile = (fileId) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter(f => f.id !== fileId)
    })
  }

  const analyzeXRay = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('Por favor, envie pelo menos uma imagem de raio-X')
      return
    }

    setIsAnalyzing(true)
    
    try {
      // Simular análise de IA - na implementação real, isso chamaria a API de IA
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Call the real API for analysis
      const formData = new FormData()
      uploadedFiles.forEach(fileData => {
        formData.append('images', fileData.file)
      })
      formData.append('patientInfo', JSON.stringify(patientInfo))
      formData.append('symptoms', symptoms)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Erro na análise da imagem')
      }

      const result = await response.json()
      const mockResult = result.data
      
      setAnalysisResult(mockResult)
      toast.success('Análise concluída com sucesso!')
    } catch (error) {
      toast.error('Análise falhou. Tente novamente.')
      console.error('Erro na análise:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetForm = () => {
    setUploadedFiles([])
    setSymptoms('')
    setPatientInfo({
      name: '',
      age: '',
      gender: '',
      medicalHistory: ''
    })
    setAnalysisResult(null)
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'normal':
        return 'bg-success-100 text-success-800'
      case 'menor':
        return 'bg-warning-100 text-warning-800'
      case 'moderado':
        return 'bg-orange-100 text-orange-800'
      case 'grave':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Enviar Raio-X para Análise com IA
        </h1>
        <p className="text-gray-600">
          Envie imagens de raio-X e forneça informações do paciente para assistência de diagnóstico com IA
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Seção de Upload */}
        <div className="space-y-6">
          {/* Upload de Arquivos */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Enviar Imagens de Raio-X
            </h2>
            
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
                isDragActive
                  ? 'border-medical-500 bg-medical-50'
                  : isDragReject
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-medical-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-medical-600 font-medium">Solte os arquivos aqui...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Arraste e solte imagens de raio-X aqui, ou clique para selecionar
                  </p>
                  <p className="text-sm text-gray-500">
                    Suporta arquivos JPG, PNG, DICOM (máx. 10MB cada)
                  </p>
                </div>
              )}
            </div>

            {/* Arquivos Enviados */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Arquivos Enviados:</h3>
                {uploadedFiles.map((fileData) => (
                  <div key={fileData.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileImage className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{fileData.file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(fileData.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Paciente */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informações do Paciente
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Nome do Paciente</label>
                <input
                  type="text"
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="Digite o nome do paciente"
                />
              </div>
              
              <div>
                <label className="label">Idade</label>
                <input
                  type="number"
                  value={patientInfo.age}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, age: e.target.value }))}
                  className="input-field"
                  placeholder="Digite a idade"
                />
              </div>
              
              <div>
                <label className="label">Gênero</label>
                <select
                  value={patientInfo.gender}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, gender: e.target.value }))}
                  className="input-field"
                >
                  <option value="">Selecione o gênero</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              
              <div>
                <label className="label">Histórico Médico</label>
                <input
                  type="text"
                  value={patientInfo.medicalHistory}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, medicalHistory: e.target.value }))}
                  className="input-field"
                  placeholder="Condições prévias, medicamentos, etc."
                />
              </div>
            </div>
          </div>

          {/* Sintomas */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sintomas e Queixas
            </h2>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="Descreva os sintomas do paciente, queixas principais, duração, etc."
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex space-x-4">
            <button
              onClick={analyzeXRay}
              disabled={isAnalyzing || uploadedFiles.length === 0}
              className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Analisando...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>Analisar com IA</span>
                </>
              )}
            </button>
            <button
              onClick={resetForm}
              className="btn-secondary"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Seção de Resultados */}
        <div className="space-y-6">
          {analysisResult ? (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Resultados da Análise
              </h2>
              
              {/* Achados */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Achados:</h3>
                <div className="space-y-3">
                  {analysisResult.findings.map((finding, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{finding.condition}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(finding.severity)}`}>
                            {finding.severity}
                          </span>
                          <span className="text-sm text-gray-600">{finding.confidence}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{finding.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendações */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Recomendações:</h3>
                <ul className="space-y-2">
                  {analysisResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fatores de Risco */}
              {analysisResult.riskFactors && analysisResult.riskFactors.length > 0 && (
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Fatores de Risco:</h3>
                  <ul className="space-y-2">
                    {analysisResult.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-warning-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* AI Provider Info */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-medical-600" />
                    <span className="text-sm text-gray-600">
                      Análise realizada por: <strong>{analysisResult.aiProvider || 'Sistema Local'}</strong>
                    </span>
                  </div>
                  {analysisResult.confidence && (
                    <span className="text-sm text-gray-500">
                      Confiança geral: {analysisResult.confidence}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aguardando Análise
                </h3>
                <p className="text-gray-600">
                  Envie imagens de raio-X e clique em "Analisar com IA" para ver os resultados aqui.
                </p>
              </div>
            </div>
          )}

          {/* Aviso Médico */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800 mb-1">
                  Aviso Médico
                </h4>
                <p className="text-sm text-yellow-700">
                  Esta análise é apenas para fins de assistência. Sempre consulte um médico 
                  qualificado para diagnóstico final e tratamento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
