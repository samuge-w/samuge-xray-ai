# Samuge - Assistente de Diagnóstico por Raio-X

**Powered by Dr. Silvio Samuge MD, MSc**

Uma ferramenta revolucionária que combina inteligência artificial com expertise médica para auxiliar profissionais de saúde no diagnóstico por imagem.

## 🚀 Características

- **MONAI Integration**: Framework médico especializado para análise de imagens
- **Datasets Open-Source**: Integração com NIH, CheXpert, MIMIC-CXR e outros
- **Raio-X Geral**: Suporte para tórax, ossos, dental, coluna, crânio e mais
- **Interface Intuitiva**: Design pensado para profissionais médicos
- **Deploy Automático**: GitHub Actions + Vercel (100% gratuito)
- **Análise Rápida**: Resultados em segundos
- **Histórico Completo**: Acompanhamento de todas as análises realizadas
- **Exportação de Relatórios**: Geração de relatórios em PDF

## 🏥 Tipos de Raio-X Suportados

### Tórax
- Pneumonia, Pneumotórax, Derrame Pleural
- Cardiomegalia, Atelectasia, Consolidação
- Edema, Massa/Lesão

### Ossos e Articulações
- Fraturas, Artrite, Osteoporose
- Lesões ósseas, Luxações

### Odontológico
- Cárie, Doença periodontal
- Canal radicular, Implantes

### Geral
- Coluna vertebral, Crânio
- Abdome, Pelve, Extremidades

## 🔬 Integração MONAI

- **Framework Médico**: MONAI para processamento especializado
- **Datasets Profissionais**: NIH, CheXpert, MIMIC-CXR, MURA
- **Análise Avançada**: Algoritmos específicos para cada tipo de raio-X
- **Confiança Elevada**: Métricas de confiança baseadas em datasets médicos

## 🛠️ Tecnologias

### Frontend
- **React 18**: Interface moderna e responsiva
- **Vite**: Build tool rápido e eficiente
- **Tailwind CSS**: Estilização utilitária
- **Lucide React**: Ícones modernos

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **MONAI**: Framework médico para IA
- **Python**: Scripts de análise avançada

### IA e Processamento
- **MONAI**: Framework médico especializado
- **PyTorch**: Deep learning
- **OpenCV**: Processamento de imagem
- **Sharp.js**: Processamento de imagem Node.js

### Deploy e CI/CD
- **Vercel**: Deploy automático (plano gratuito)
- **GitHub Actions**: CI/CD automatizado
- **GitHub**: Versionamento e colaboração

### Datasets Open-Source
- **NIH Chest X-ray**: 112,120 imagens
- **CheXpert**: 224,316 radiografias
- **MIMIC-CXR**: 377,110 imagens
- **MURA**: 40,561 radiografias musculoesqueléticas

## 📁 Estrutura do Projeto

```
samuge-xray-ai/
├── src/
│   ├── components/          # Componentes React reutilizáveis
│   │   └── Header.jsx
│   ├── pages/              # Páginas principais da aplicação
│   │   ├── Dashboard.jsx
│   │   ├── Upload.jsx
│   │   ├── History.jsx
│   │   └── About.jsx
│   ├── services/           # Serviços de API
│   │   └── api.js
│   ├── App.jsx             # Componente principal da aplicação
│   ├── main.jsx            # Ponto de entrada da aplicação
│   └── index.css           # Estilos globais
├── server.js               # Servidor Express.js
├── package.json            # Dependências e scripts
├── vite.config.js          # Configuração do Vite
├── tailwind.config.js      # Configuração do Tailwind CSS
└── README.md               # Este arquivo
```

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 16+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/samuge-xray-ai.git
cd samuge-xray-ai
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

### Execução

#### Desenvolvimento

1. Inicie o servidor backend:
```bash
npm run server
```

2. Em outro terminal, inicie o frontend:
```bash
npm run dev
```

3. Acesse a aplicação em: `http://localhost:3000`

#### Produção

1. Construa a aplicação:
```bash
npm run build
```

2. Inicie o servidor:
```bash
npm start
```

## 🔧 Configuração

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/samuge-w/samuge-xray-ai.git
cd samuge-xray-ai
```

2. **Instale dependências Node.js**
```bash
npm install
```

3. **Instale dependências Python (para MONAI)**
```bash
pip install -r requirements.txt
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Development
NODE_ENV=development
PORT=5000

# Production
NODE_ENV=production
PORT=5000

# MONAI Configuration
MONAI_ENABLED=true
PYTHON_PATH=python
```

### Configuração MONAI

A aplicação agora integra o framework MONAI para análise médica avançada:

1. **MONAI Framework** - Framework médico especializado
   - Processamento de imagens médicas
   - Algoritmos específicos para cada tipo de raio-X
   - Integração com datasets open-source

2. **Datasets Open-Source** - Conjuntos de dados médicos
   - NIH Chest X-ray (112,120 imagens)
   - CheXpert (224,316 radiografias)
   - MIMIC-CXR (377,110 imagens)
   - MURA (40,561 radiografias musculoesqueléticas)

3. **Análise Especializada** - Por tipo de raio-X
   - Tórax: Pneumonia, Pneumotórax, Cardiomegalia
   - Ossos: Fraturas, Artrite, Osteoporose
   - Dental: Cárie, Doença periodontal
   - Geral: Coluna, Crânio, Abdome, Pelve

4. **Fallback Inteligente** - Sistema de backup
   - Análise local com Sharp.js se MONAI indisponível
   - Detecção de características da imagem
   - Recomendações baseadas em padrões médicos

## 🚀 Deploy

### Vercel + GitHub Actions (Recomendado)

1. **Configure secrets no GitHub**:
   - `VERCEL_TOKEN`: Token do Vercel
   - `ORG_ID`: ID da organização Vercel
   - `PROJECT_ID`: ID do projeto Vercel

2. **Deploy automático**:
   - Push para `main` → Deploy automático
   - Pull requests → Preview automático
   - GitHub Actions gerencia todo o processo

3. **Benefícios**:
   - 100% gratuito no plano Vercel
   - Deploy automático via GitHub
   - CI/CD integrado
   - Preview de pull requests

### Configuração Manual

1. **Vercel**:
   - Conecte repositório GitHub
   - Deploy automático configurado

2. **Netlify**:
   - Build: `npm run build`
   - Publish directory: `dist`
   - Redirects para SPA

### Heroku

1. Crie um `Procfile`: `web: node server.js`
2. Deploy usando Heroku CLI ou integração GitHub

## 🔒 Segurança e Privacidade

- **Processamento Local**: Toda análise de IA acontece localmente no seu dispositivo
- **Sem Armazenamento de Dados**: Dados de pacientes não são armazenados em servidores externos
- **Criptografia End-to-End**: Transmissão segura de dados
- **Conformidade LGPD**: Desenvolvido com padrões de privacidade em saúde

## ⚠️ Aviso Médico

**IMPORTANTE**: Esta aplicação é destinada exclusivamente para fins educacionais e de assistência. Ela nunca deve substituir o julgamento médico profissional ou a expertise clínica. Sempre consulte profissionais de saúde qualificados para diagnóstico final e decisões de tratamento.

## 🤝 Contribuição

1. Faça um fork do repositório
2. Crie uma branch para sua feature: `git checkout -b feature-name`
3. Commit suas mudanças: `git commit -am 'Add feature'`
4. Push para a branch: `git push origin feature-name`
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **Dr. Silvio Samuge MD, MSc** - Especialista em radiologia e desenvolvimento
- **Chester AI** - Assistente de radiologia open-source
- **MedRAX** - Agente de IA para análise de imagens médicas
- **Microsoft Project InnerEye** - Toolkit de IA para imagens médicas
- **Comunidade React** - Ecossistema open-source incrível

## 📞 Suporte

- **Email**: contato@samuge.com
- **Documentação**: [docs.samuge.com](https://docs.samuge.com)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/samuge-xray-ai/issues)

## 🔄 Atualizações

- **v1.0.0** - Lançamento inicial com análise básica de raio-X
- **v1.1.0** - Adicionado rastreamento de histórico e recursos de exportação
- **v1.2.0** - IA aprimorada e detecção de novas condições

---

Feito com ❤️ para a comunidade médica

**Powered by Dr. Silvio Samuge MD, MSc**
