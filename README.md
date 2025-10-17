# Samuge - Assistente de Diagnóstico por Raio-X

**Powered by Dr. Silvio Samuge MD, MSc**

Uma ferramenta revolucionária que combina inteligência artificial com expertise médica para auxiliar profissionais de saúde no diagnóstico por imagem.

## 🚀 Características

- **IA Avançada**: Algoritmos de última geração para análise precisa de raios-X
- **Interface Intuitiva**: Design pensado para profissionais médicos
- **Privacidade Total**: Processamento local, sem armazenamento de dados pessoais
- **Análise Rápida**: Resultados em segundos
- **Histórico Completo**: Acompanhamento de todas as análises realizadas
- **Exportação de Relatórios**: Geração de relatórios em PDF

## 🏥 Condições Suportadas

O sistema pode auxiliar na detecção das seguintes condições:

- Pneumonia
- Pneumotórax
- Derrame Pleural
- Cardiomegalia
- Atelectasia
- Consolidação
- Edema
- Massa/Lesão
- Fraturas
- Variações Normais

## 🛠️ Tecnologias

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **IA**: Algoritmos de deep learning para análise radiológica
- **Processamento de Imagem**: Sharp.js
- **Upload de Arquivos**: Multer, React Dropzone

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

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Development
NODE_ENV=development
PORT=5000

# Production
NODE_ENV=production
PORT=5000
```

### Configuração de IA

A aplicação está configurada para usar serviços de IA gratuitos:

1. **Chester AI** - Serviço principal de IA para análise médica real de raio-X
   - Assistente de radiologia open-source
   - Detecta: Pneumonia, Tuberculose, COVID-19, Pneumotórax, etc.
   - Alta precisão em diagnóstico médico
   - Fallback automático para análise local se indisponível

2. **Análise Local Aprimorada** - Sistema de fallback usando Sharp.js
   - Análise de características da imagem
   - Detecção de brilho e contraste
   - Reconhecimento de padrões para condições comuns

3. **Sistema de Tradução** - Terminologia médica em português
   - Tradução automática de condições médicas
   - Recomendações e fatores de risco localizados

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Conecte seu repositório ao Vercel
3. Deploy com configuração zero

### Netlify

1. Construa o projeto: `npm run build`
2. Deploy da pasta `dist` no Netlify
3. Configure redirects para roteamento SPA

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
