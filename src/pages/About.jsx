import React from 'react'
import { Stethoscope, Award, Users, Shield, Brain, Heart } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'Inteligência Artificial Avançada',
      description: 'Utilizamos algoritmos de última geração treinados em milhares de imagens radiológicas para fornecer diagnósticos precisos e confiáveis.'
    },
    {
      icon: Shield,
      title: 'Privacidade e Segurança',
      description: 'Todos os dados são processados localmente. Não armazenamos informações pessoais dos pacientes, garantindo total privacidade e conformidade com LGPD.'
    },
    {
      icon: Award,
      title: 'Precisão Clínica',
      description: 'Desenvolvido em colaboração com especialistas em radiologia, o sistema atinge altos níveis de precisão em diagnósticos auxiliares.'
    },
    {
      icon: Users,
      title: 'Interface Intuitiva',
      description: 'Design pensado para profissionais médicos, com interface limpa e funcionalidades que agilizam o processo de análise.'
    }
  ]

  const conditions = [
    'Pneumonia',
    'Pneumotórax',
    'Derrame Pleural',
    'Cardiomegalia',
    'Atelectasia',
    'Consolidação',
    'Edema',
    'Massa/Lesão',
    'Fraturas',
    'Variações Normais'
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-medical-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Samuge</h1>
            <p className="text-lg text-gray-600">Assistente de Diagnóstico por Raio-X</p>
          </div>
        </div>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Powered by <strong>Dr. Silvio Samuge MD, MSc</strong> - Uma ferramenta revolucionária 
          que combina inteligência artificial com expertise médica para auxiliar profissionais 
          de saúde no diagnóstico por imagem.
        </p>
      </div>

      {/* About Dr. Silvio Samuge */}
      <div className="card">
        <div className="flex items-start space-x-6">
          <div className="w-20 h-20 bg-medical-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-10 h-10 text-medical-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Dr. Silvio Samuge MD, MSc
            </h2>
            <p className="text-gray-700 mb-4">
              Médico especialista com vasta experiência em radiologia e diagnóstico por imagem. 
              Com formação em Medicina e Mestrado em Ciências Médicas, o Dr. Samuge dedica-se 
              ao desenvolvimento de soluções tecnológicas que aprimoram a prática médica.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Formação:</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Medicina - Universidade de Medicina</li>
                  <li>• Mestrado em Ciências Médicas</li>
                  <li>• Especialização em Radiologia</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Especialidades:</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Radiologia Torácica</li>
                  <li>• Diagnóstico por Imagem</li>
                  <li>• Inteligência Artificial Médica</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Por que escolher o Samuge?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-medical-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Supported Conditions */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Condições Suportadas
        </h2>
        <p className="text-gray-600 text-center mb-8">
          O sistema pode auxiliar na detecção das seguintes condições:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className="bg-medical-50 border border-medical-200 rounded-lg p-3 text-center"
            >
              <span className="text-sm font-medium text-medical-800">
                {condition}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Tecnologia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              IA e Machine Learning
            </h3>
            <p className="text-gray-600 text-sm">
              Algoritmos de deep learning treinados especificamente para análise radiológica
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Processamento Local
            </h3>
            <p className="text-gray-600 text-sm">
              Análise realizada localmente, sem envio de dados para servidores externos
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Validação Clínica
            </h3>
            <p className="text-gray-600 text-sm">
              Sistema validado por especialistas e testado em ambiente clínico real
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-yellow-600 text-sm font-bold">!</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Aviso Médico Importante
            </h3>
            <p className="text-yellow-700">
              Esta aplicação é destinada exclusivamente para fins educacionais e de assistência. 
              Ela nunca deve substituir o julgamento médico profissional ou a expertise clínica. 
              Sempre consulte profissionais de saúde qualificados para diagnóstico final e 
              decisões de tratamento.
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="card text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Entre em Contato
        </h2>
        <p className="text-gray-600 mb-6">
          Para dúvidas, sugestões ou suporte técnico
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:contato@samuge.com"
            className="btn-primary inline-flex items-center justify-center"
          >
            contato@samuge.com
          </a>
          <a
            href="tel:+5511999999999"
            className="btn-secondary inline-flex items-center justify-center"
          >
            +55 11 99999-9999
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
