import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Upload, History, Brain, Shield, Clock, Users, TrendingUp, Award, Database, Zap } from 'lucide-react'
import statsService from '../services/statsService'

const Dashboard = () => {
  const [stats, setStats] = useState([])
  const [recentAnalyses, setRecentAnalyses] = useState([])
  const [frameworkInfo, setFrameworkInfo] = useState(null)
  const [systemHealth, setSystemHealth] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Load statistics
      const dashboardStats = await statsService.getDashboardStats()
      const statsArray = [
        {
          ...dashboardStats.todayAnalyses,
          icon: TrendingUp
        },
        {
          ...dashboardStats.totalPatients,
          icon: Users
        },
        {
          ...dashboardStats.avgConfidence,
          icon: Award
        },
        {
          ...dashboardStats.avgProcessingTime,
          icon: Clock
        }
      ]
      setStats(statsArray)

      // Load recent analyses
      const recent = await statsService.getRecentAnalyses()
      setRecentAnalyses(recent)

      // Load framework info
      const framework = statsService.getFrameworkInfo()
      setFrameworkInfo(framework)

      // Load system health
      const health = await statsService.getSystemHealth()
      setSystemHealth(health)

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bem-vindo ao Samuge
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Assistente de Diagnóstico por Raio-X com IA
        </p>
        <p className="text-gray-500">
          Powered by Dr. Silvio Samuge MD, MSc
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/upload"
          className="card hover:shadow-lg transition-shadow duration-200 group cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center group-hover:bg-medical-200 transition-colors">
              <Upload className="w-6 h-6 text-medical-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Nova Análise
              </h3>
              <p className="text-gray-600">
                Envie um raio-X para análise com IA
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/history"
          className="card hover:shadow-lg transition-shadow duration-200 group cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <History className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Ver Histórico
              </h3>
              <p className="text-gray-600">
                Acesse análises anteriores
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-success-600' : 'text-red-600'
                  }`}>
                    {stat.change} vs ontem
                  </p>
                </div>
                <div className="w-10 h-10 bg-medical-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-medical-600" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Analyses */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Análises Recentes
          </h2>
          <Link
            to="/history"
            className="text-medical-600 hover:text-medical-700 font-medium"
          >
            Ver todas
          </Link>
        </div>

        <div className="space-y-4">
          {recentAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-medical-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-medical-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {analysis.patientName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {analysis.age} anos, {analysis.gender} • {analysis.date} às {analysis.time}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {analysis.findings}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(analysis.status)}`}>
                  {analysis.status}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.confidence}% confiança
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MONAI Framework Info */}
      {frameworkInfo && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              MONAI Framework
            </h2>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-medical-600" />
              <span className="text-sm text-gray-600">
                {frameworkInfo.totalImages.toLocaleString()} imagens
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Capacidades</h3>
              <div className="space-y-2">
                {frameworkInfo.capabilities.slice(0, 4).map((capability, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-medical-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Precisão por Tipo</h3>
              <div className="space-y-2">
                {Object.entries(frameworkInfo.accuracy).slice(0, 4).map(([type, accuracy]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 capitalize">{type}</span>
                    <span className="text-sm font-medium text-medical-600">{accuracy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Health */}
      {systemHealth && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Status do Sistema
            </h2>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                systemHealth.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600 capitalize">
                {systemHealth.status}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xs text-gray-600">MONAI</p>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {systemHealth.monai}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Database className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">Datasets</p>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {systemHealth.datasets}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Brain className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xs text-gray-600">API</p>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {systemHealth.api}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4 text-orange-600" />
              </div>
              <p className="text-xs text-gray-600">Uptime</p>
              <p className="text-sm font-medium text-gray-900">
                {systemHealth.uptime}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Brain className="w-6 h-6 text-medical-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            MONAI Framework
          </h3>
          <p className="text-gray-600">
            Medical Open Network for AI - Framework especializado em imagens médicas
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Database className="w-6 h-6 text-medical-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Datasets Open-Source
          </h3>
          <p className="text-gray-600">
            {frameworkInfo ? `${frameworkInfo.totalImages.toLocaleString()} imagens` : '946,586 imagens'} de raios-X reais
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-medical-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Segurança e Privacidade
          </h3>
          <p className="text-gray-600">
            Autenticação JWT, processamento seguro, sem armazenamento de dados pessoais
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
