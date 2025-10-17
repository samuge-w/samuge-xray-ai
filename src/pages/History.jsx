import React, { useState } from 'react'
import { Search, Filter, Download, Eye, Calendar, User, FileImage } from 'lucide-react'

const History = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('all')

  // Dados simulados - na aplicação real, isso viria da API
  const analyses = [
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
    },
    {
      id: 3,
      patientName: 'Ana Costa',
      patientAge: 67,
      patientGender: 'Feminino',
      date: '2024-01-14',
      time: '16:45',
      type: 'Raio-X do Tórax',
      status: 'Concluído',
      findings: 'Raio-X normal do tórax',
      confidence: 92,
      symptoms: 'Check-up de rotina',
      images: 1,
      recommendations: ['Continuar monitoramento de rotina']
    },
    {
      id: 4,
      patientName: 'Carlos Oliveira',
      patientAge: 28,
      patientGender: 'Masculino',
      date: '2024-01-14',
      time: '09:20',
      type: 'Raio-X do Tórax',
      status: 'Processando',
      findings: 'Análise em andamento...',
      confidence: null,
      symptoms: 'Aperto no peito, dificuldade para respirar',
      images: 2,
      recommendations: []
    },
    {
      id: 5,
      patientName: 'Fernanda Lima',
      patientAge: 55,
      patientGender: 'Feminino',
      date: '2024-01-13',
      time: '13:10',
      type: 'Raio-X do Tórax',
      status: 'Concluído',
      findings: 'Cardiomegalia leve, campos pulmonares limpos',
      confidence: 89,
      symptoms: 'Fadiga, desconforto no peito',
      images: 1,
      recommendations: ['Consulta com cardiologista', 'Ecocardiograma recomendado']
    }
  ]

  const filteredAnalyses = analyses.filter(analysis => {
    const matchesSearch = analysis.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         analysis.findings.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || analysis.status.toLowerCase() === filterStatus
    const matchesDate = filterDate === 'all' || 
                       (filterDate === 'today' && analysis.date === '2024-01-15') ||
                       (filterDate === 'week' && ['2024-01-15', '2024-01-14', '2024-01-13'].includes(analysis.date))
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'concluído':
        return 'bg-success-100 text-success-800'
      case 'processando':
        return 'bg-warning-100 text-warning-800'
      case 'falhou':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const exportReport = (analysis) => {
    // Na aplicação real, isso geraria e baixaria um relatório PDF
    console.log('Exportando relatório para:', analysis.id)
  }

  const viewDetails = (analysis) => {
    // Na aplicação real, isso abriria uma visualização detalhada
    console.log('Visualizando detalhes para:', analysis.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Histórico de Análises</h1>
          <p className="text-gray-600 mt-1">
            Visualize e gerencie seu histórico de análises de raio-X
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredAnalyses.length} de {analyses.length} análises
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nome do paciente ou achados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Filtro de Status */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">Todos os Status</option>
              <option value="concluído">Concluído</option>
              <option value="processando">Processando</option>
              <option value="falhou">Falhou</option>
            </select>
          </div>

          {/* Filtro de Data */}
          <div>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="input-field"
            >
              <option value="all">Todo o Período</option>
              <option value="today">Hoje</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
            </select>
          </div>

          {/* Botão de Filtros */}
          <button className="btn-secondary flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Mais Filtros</span>
          </button>
        </div>
      </div>

      {/* Lista de Análises */}
      <div className="space-y-4">
        {filteredAnalyses.map((analysis) => (
          <div key={analysis.id} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {analysis.patientName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {analysis.patientAge} anos, {analysis.patientGender}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {analysis.date} às {analysis.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileImage className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {analysis.images} imagem(ns)
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Tipo de Exame:</h4>
                  <p className="text-sm text-gray-600">{analysis.type}</p>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Sintomas:</h4>
                  <p className="text-sm text-gray-600">{analysis.symptoms}</p>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Achados:</h4>
                  <p className="text-sm text-gray-700">{analysis.findings}</p>
                </div>

                {analysis.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Recomendações:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end space-y-3 ml-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(analysis.status)}`}>
                  {analysis.status}
                </span>
                
                {analysis.confidence && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Confiança</p>
                    <p className="text-lg font-semibold text-gray-900">{analysis.confidence}%</p>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => viewDetails(analysis)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Ver detalhes"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => exportReport(analysis)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Exportar relatório"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnalyses.length === 0 && (
        <div className="card text-center py-12">
          <FileImage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma análise encontrada
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou realizar uma nova análise.
          </p>
        </div>
      )}
    </div>
  )
}

export default History
