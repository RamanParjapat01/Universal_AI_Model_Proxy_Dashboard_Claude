import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Server, 
  Waypoints, 
  Plug, 
  Save, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff, 
  Activity, 
  Key, 
  Users,
  RefreshCw,
  Plus,
  Trash2
} from 'lucide-react';

// --- UI Components ---

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-900/50 border-green-500 text-green-200' : 'bg-red-900/50 border-red-500 text-red-200';
  const Icon = type === 'success' ? CheckCircle2 : XCircle;

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 border rounded-lg shadow-lg backdrop-blur-md z-50 animate-in fade-in slide-in-from-bottom-5 ${bgColor}`}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-gray-900 border border-gray-800 rounded-xl shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

const Input = ({ label, type = 'text', value, onChange, placeholder, isPassword }) => {
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-gray-400">{label}</label>}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-gray-600"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

const Toggle = ({ label, checked, onChange, description }) => (
  <div className="flex items-start gap-4">
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${checked ? 'bg-indigo-500' : 'bg-gray-700'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-200">{label}</span>
      {description && <span className="text-xs text-gray-500 mt-0.5">{description}</span>}
    </div>
  </div>
);

// --- Main Views ---

const DashboardView = ({ status }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div>
      <h2 className="text-2xl font-bold text-gray-100">System Dashboard</h2>
      <p className="text-gray-400 mt-1">Real-time overview of your universal proxy server.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-gray-400">
          <span className="text-sm font-medium">Status</span>
          <Activity className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-2xl font-bold text-gray-100">Online</span>
        </div>
      </Card>

      <Card className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-gray-400">
          <span className="text-sm font-medium">Server Port</span>
          <Server className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-100">{status.port}</span>
        </div>
      </Card>

      <Card className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-gray-400">
          <span className="text-sm font-medium">Active Connections</span>
          <Users className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-100">{status.connections}</span>
        </div>
      </Card>

      <Card className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-gray-400">
          <span className="text-sm font-medium">Auth Token</span>
          <Key className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="flex items-center gap-2 truncate">
          <span className="text-lg font-mono font-bold text-gray-100 truncate">{status.authToken}</span>
        </div>
      </Card>
    </div>

    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Quick Start Guides</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
          <h4 className="font-medium text-gray-300 mb-2">Claude Code</h4>
          <pre className="text-xs text-emerald-400 font-mono bg-gray-900 p-3 rounded border border-gray-800 overflow-x-auto">
            export ANTHROPIC_API_KEY="sk-proxy-local"<br/>
            export ANTHROPIC_BASE_URL="http://localhost:8080/v1"<br/>
            claude
          </pre>
        </div>
        <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
          <h4 className="font-medium text-gray-300 mb-2">VS Code Codex / Continue</h4>
          <p className="text-xs text-gray-400 mb-2">Configure `config.json` models to point to localhost:</p>
          <pre className="text-xs text-emerald-400 font-mono bg-gray-900 p-3 rounded border border-gray-800 overflow-x-auto">
            {`"models": [{
  "title": "Proxy Claude",
  "provider": "anthropic",
  "model": "claude-3-5-sonnet-20241022",
  "apiBase": "http://localhost:8080/v1"
}]`}
          </pre>
        </div>
      </div>
    </Card>
  </div>
);

const ProvidersView = ({ config, updateConfig, showToast }) => {
  const [validating, setValidating] = useState(null);

  const handleValidate = (provider) => {
    setValidating(provider);
    // Simulate API call
    setTimeout(() => {
      setValidating(null);
      showToast(`Successfully connected to ${provider} API`, 'success');
    }, 1500);
  };

  const providersList = [
    { id: 'openai', name: 'OpenAI', defaultBaseUrl: 'https://api.openai.com/v1' },
    { id: 'anthropic', name: 'Anthropic', defaultBaseUrl: 'https://api.anthropic.com/v1' },
    { id: 'gemini', name: 'Google Gemini', defaultBaseUrl: 'https://generativelanguage.googleapis.com/v1beta' },
    { id: 'local', name: 'Local (Ollama/LM Studio)', defaultBaseUrl: 'http://localhost:11434/v1' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Model Providers</h2>
          <p className="text-gray-400 mt-1">Configure your upstream API keys and custom endpoints.</p>
        </div>
        <button 
          onClick={() => showToast('All provider settings saved', 'success')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          Save All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {providersList.map((p) => (
          <Card key={p.id} className="p-5 border-l-4 border-l-indigo-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <h3 className="text-lg font-semibold text-gray-200">{p.name}</h3>
              <button
                onClick={() => handleValidate(p.name)}
                disabled={validating === p.name}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                {validating === p.name ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                {validating === p.name ? 'Testing...' : 'Validate'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="API Key"
                isPassword
                placeholder="sk-..."
                value={config.providers[p.id]?.apiKey || ''}
                onChange={(e) => updateConfig('providers', { ...config.providers, [p.id]: { ...config.providers[p.id], apiKey: e.target.value } })}
              />
              <Input
                label="Base URL (Optional)"
                placeholder={p.defaultBaseUrl}
                value={config.providers[p.id]?.baseUrl || ''}
                onChange={(e) => updateConfig('providers', { ...config.providers, [p.id]: { ...config.providers[p.id], baseUrl: e.target.value } })}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const RoutingView = ({ config, updateConfig, showToast }) => {
  const addRoute = () => {
    const newRoute = { id: Date.now(), source: 'claude-3-5-sonnet-20241022', targetProvider: 'openai', targetModel: 'gpt-4o' };
    updateConfig('routes', [...config.routes, newRoute]);
  };

  const removeRoute = (id) => {
    updateConfig('routes', config.routes.filter(r => r.id !== id));
  };

  const updateRoute = (id, field, value) => {
    updateConfig('routes', config.routes.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const providers = ['openai', 'anthropic', 'gemini', 'local'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Model Routing</h2>
          <p className="text-gray-400 mt-1">Intercept client model requests and route them to different providers.</p>
        </div>
        <button 
          onClick={addRoute}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg font-medium transition-colors border border-gray-700"
        >
          <Plus className="w-4 h-4" />
          Add Route
        </button>
      </div>

      <Card className="overflow-hidden">
        {config.routes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No routes configured. All requests will pass through normally.
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-950/50 text-sm font-medium text-gray-400">
              <div className="col-span-4">Intercepted Client Model</div>
              <div className="col-span-1 text-center"></div>
              <div className="col-span-3">Target Provider</div>
              <div className="col-span-3">Target Model Name</div>
              <div className="col-span-1"></div>
            </div>
            
            {config.routes.map((route) => (
              <div key={route.id} className="grid grid-cols-12 gap-4 p-4 items-center bg-gray-900 hover:bg-gray-800/50 transition-colors">
                <div className="col-span-4">
                  <input
                    type="text"
                    value={route.source}
                    onChange={(e) => updateRoute(route.id, 'source', e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. claude-3-opus-20240229"
                  />
                </div>
                <div className="col-span-1 flex justify-center text-gray-600">
                  <Waypoints className="w-5 h-5" />
                </div>
                <div className="col-span-3">
                  <select
                    value={route.targetProvider}
                    onChange={(e) => updateRoute(route.id, 'targetProvider', e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:ring-1 focus:ring-indigo-500 capitalize"
                  >
                    {providers.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="col-span-3">
                  <input
                    type="text"
                    value={route.targetModel}
                    onChange={(e) => updateRoute(route.id, 'targetModel', e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. gpt-4o"
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button onClick={() => removeRoute(route.id)} className="text-gray-500 hover:text-red-400 transition-colors p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      <div className="flex justify-end mt-4">
        <button 
          onClick={() => showToast('Routing rules saved and applied to proxy', 'success')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          Apply Routing Rules
        </button>
      </div>
    </div>
  );
};

const IntegrationsView = ({ config, updateConfig, showToast }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Remote Integrations</h2>
          <p className="text-gray-400 mt-1">Connect your local proxy to remote bots and services.</p>
        </div>
        <button 
          onClick={() => showToast('Integrations saved successfully', 'success')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#5865F2]/20 rounded-lg">
              <svg className="w-6 h-6 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-200">Discord Bot</h3>
          </div>
          <Input
            label="Bot Token"
            isPassword
            placeholder="MTE..."
            value={config.integrations.discordToken || ''}
            onChange={(e) => updateConfig('integrations', { ...config.integrations, discordToken: e.target.value })}
          />
          <p className="mt-3 text-xs text-gray-500 leading-relaxed">
            Allow interaction with your local proxy via Discord DMs or channels. Restart required after saving.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#0088cc]/20 rounded-lg">
              <svg className="w-6 h-6 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.11.03-1.84 1.18-5.21 3.45-.49.33-.94.5-1.34.49-.45-.01-1.3-.25-1.94-.46-.78-.26-1.4-.4-1.35-.85.03-.23.33-.47.9-.71 3.53-1.54 5.88-2.55 7.07-3.04 3.37-1.4 4.07-1.64 4.53-1.65.1 0 .32.02.44.11.1.08.13.19.14.28-.01.07-.01.16-.02.26z"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-200">Telegram Bot</h3>
          </div>
          <Input
            label="Bot Token"
            isPassword
            placeholder="123456789:ABC..."
            value={config.integrations.telegramToken || ''}
            onChange={(e) => updateConfig('integrations', { ...config.integrations, telegramToken: e.target.value })}
          />
          <p className="mt-3 text-xs text-gray-500 leading-relaxed">
            Interact with your proxy securely via Telegram. Chat ID whitelisting is recommended in advanced settings.
          </p>
        </Card>

        <Card className="p-6 col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Media Processing</h3>
          <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
            <Toggle
              label="Enable Voice Note Transcription"
              description="Automatically transcribe voice notes received via Discord or Telegram using a local Whisper model before sending to the LLM."
              checked={config.integrations.voiceTranscription}
              onChange={(val) => updateConfig('integrations', { ...config.integrations, voiceTranscription: val })}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- App Shell ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);
  
  // Simulated state for proxy config
  const [config, setConfig] = useState({
    providers: {
      openai: { apiKey: '', baseUrl: '' },
      anthropic: { apiKey: '', baseUrl: '' },
      gemini: { apiKey: '', baseUrl: '' },
      local: { apiKey: 'lm-studio', baseUrl: 'http://localhost:1234/v1' }
    },
    routes: [
      { id: 1, source: 'claude-3-5-sonnet-20241022', targetProvider: 'openai', targetModel: 'gpt-4o' }
    ],
    integrations: {
      discordToken: '',
      telegramToken: '',
      voiceTranscription: true
    }
  });

  const serverStatus = {
    port: '8080',
    connections: 3,
    uptime: '4h 12m',
    authToken: 'sk-proxy-local-dev-token'
  };

  const updateConfig = (section, data) => {
    setConfig(prev => ({ ...prev, [section]: data }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'providers', label: 'Providers', icon: Database },
    { id: 'routing', label: 'Routing', icon: Waypoints },
    { id: 'integrations', label: 'Integrations', icon: Plug },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-gray-800">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
            <Waypoints className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-100 leading-tight">UniProxy</h1>
            <p className="text-xs text-gray-500">Local AI Router</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400 font-medium' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-400' : 'text-gray-500'}`} />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-950 p-3 rounded-lg border border-gray-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Daemon running on :8080
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center overflow-x-auto gap-2">
           {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md whitespace-nowrap text-sm ${
                activeTab === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400 font-medium' 
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'dashboard' && <DashboardView status={serverStatus} />}
            {activeTab === 'providers' && <ProvidersView config={config} updateConfig={updateConfig} showToast={showToast} />}
            {activeTab === 'routing' && <RoutingView config={config} updateConfig={updateConfig} showToast={showToast} />}
            {activeTab === 'integrations' && <IntegrationsView config={config} updateConfig={updateConfig} showToast={showToast} />}
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

// Minimal dummy Database icon since it's missing in some Lucide imports above sometimes, fallback if needed:
function Database(props) {
  return <Server {...props} />; // Re-using server for database/providers representation visually
}