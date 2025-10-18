import React, { useState } from 'react'
import { X, Key, User, Lock, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [authType, setAuthType] = useState('login') // 'login' or 'apiKey'
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    apiKey: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      })

      const result = await response.json()

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('auth_token', result.token)
        localStorage.setItem('user_info', JSON.stringify({
          user_id: result.user_id,
          permissions: result.permissions
        }))
        
        toast.success('Login successful!')
        onAuthSuccess(result)
        onClose()
      } else {
        toast.error(result.error || 'Login failed')
      }
    } catch (error) {
      toast.error('Network error during login')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApiKeyAuth = () => {
    if (!credentials.apiKey.trim()) {
      toast.error('Please enter an API key')
      return
    }

    // Store API key in localStorage
    localStorage.setItem('api_key', credentials.apiKey)
    localStorage.setItem('user_info', JSON.stringify({
      type: 'api_key',
      permissions: ['analyze_xray', 'view_results']
    }))
    
    toast.success('API key authentication successful!')
    onAuthSuccess({ type: 'api_key', api_key: credentials.apiKey })
    onClose()
  }

  const handleDemoLogin = () => {
    setCredentials({
      username: 'demo',
      password: 'demo123'
    })
  }

  const handleDemoApiKey = () => {
    setCredentials({
      apiKey: 'demo-key-123'
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Authentication</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Auth Type Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setAuthType('login')}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              authType === 'login'
                ? 'text-medical-600 border-b-2 border-medical-600 bg-medical-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Login
          </button>
          <button
            onClick={() => setAuthType('apiKey')}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              authType === 'apiKey'
                ? 'text-medical-600 border-b-2 border-medical-600 bg-medical-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Key className="w-4 h-4 inline mr-2" />
            API Key
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {authType === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-500"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-500"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-medical-600 text-white py-2 px-4 rounded-md hover:bg-medical-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Demo
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="text"
                  value={credentials.apiKey}
                  onChange={(e) => setCredentials(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-500"
                  placeholder="Enter API key"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleApiKeyAuth}
                  className="flex-1 bg-medical-600 text-white py-2 px-4 rounded-md hover:bg-medical-700"
                >
                  Authenticate
                </button>
                <button
                  onClick={handleDemoApiKey}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Demo
                </button>
              </div>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div><strong>Username:</strong> demo | <strong>Password:</strong> demo123</div>
              <div><strong>API Key:</strong> demo-key-123</div>
              <div><strong>Admin:</strong> admin | <strong>Password:</strong> admin123</div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Authentication is optional for demo purposes. 
              In production, this would be required for API access.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal


