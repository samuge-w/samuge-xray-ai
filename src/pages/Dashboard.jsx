import React from 'react'
import { Link } from 'react-router-dom'
import { Upload, History, Brain, Shield, Clock, Users, TrendingUp, Award } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      title: 'Análises Hoje',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Total de Pacientes',
      value: '1,247',
      change: '+15%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Precisão Média',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Award
    },
    {
      title: 'Tempo Médio',
      value: '2.3min',
      change: '-0.5min',
      changeType: 'positive',
      icon: Clock
    }
  ]

  const recentAnalyses = [
    {
      id: 1,
      patientName: 'Maria Silva',
      age: 45,
      gender: 'Feminino',
      date: '2024-01-15',
      time: '14:30',
      findings: 'Raio-X normal do tórax',
      confidence: 95,
      status: 'Concluído'
    },
    {
      id: 2,
      patientName: 'João Santos',
      age: 32,
      gender: 'Masculino',
      date: '2024-01-15',
      time: '11:15',
      findings: 'Possível pneumonia no lobo inferior direito',
      confidence: 87,
      status: 'Concluído'
    },
    {
      id: 3,
      patientName: 'Ana Costa',
      age: 67,
      gender: 'Feminino',
      date: '2024-01-14',
      time: '16:45',
      findings: 'Raio-X normal do tórax',
      confidence: 92,
      status: 'Concluído'
    }
  ]

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

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Brain className="w-6 h-6 text-medical-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            IA Avançada
          </h3>
          <p className="text-gray-600">
            Algoritmos de última geração para análise precisa de raios-X
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-medical-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Privacidade Total
          </h3>
          <p className="text-gray-600">
            Processamento local, sem armazenamento de dados pessoais
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-medical-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Precisão Clínica
          </h3>
          <p className="text-gray-600">
            Desenvolvido por especialistas em radiologia médica
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
