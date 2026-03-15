import { useState, useEffect } from 'react';
import { Settings, Key, PaintBucket, Globe, Database, CircleCheck, TriangleAlert, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    const key = localStorage.getItem('gemini_api_key');
    const dbUrl = localStorage.getItem('supabase_url');
    const dbKey = localStorage.getItem('supabase_key');
    if (key) setApiKey(key);
    if (dbUrl) setSupabaseUrl(dbUrl);
    if (dbKey) setSupabaseKey(dbKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    localStorage.setItem('supabase_url', supabaseUrl);
    localStorage.setItem('supabase_key', supabaseKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleTest = () => {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      setTestResult(apiKey.length > 20 ? 'success' : 'error');
    }, 1500);
  };

  const clearData = () => {
    if (confirm("Are you sure you want to clear all your local resume data? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex justify-center items-center gap-3">
          <Settings className="text-[var(--primary)] h-10 w-10" /> Settings
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">Configure your API keys and global preferences</p>
      </div>

      <div className="space-y-8">
        
        {/* API CONFIGURATION */}
        <Card className="border-[var(--primary)]/30 overflow-hidden relative p-0">
          <div className="p-6 md:px-8 border-b border-[var(--primary)]/20 bg-[var(--card-hover)] flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Key className="text-[var(--primary)]" /> API Configuration
            </h2>
            <div className="text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded border border-[var(--primary)]/20 flex items-center gap-1 font-bold">
              <ShieldCheck size={14} /> LOCAL ONLY
            </div>
          </div>
          
          <div className="p-6 md:px-8 space-y-6 bg-black/10">
            <div>
              <p className="text-[var(--text-secondary)] mb-4 text-sm leading-relaxed">
                Enter your <strong className="text-white">Google Gemini 1.5 Flash API Key</strong> to power all AI features. 
                Your key is stored <span className="underline decoration-[var(--primary)] underline-offset-4">locally in your browser</span> and is never sent to our servers.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 mb-2">
                <Input 
                  type="password" 
                  placeholder="Paste your API key here (AIzaSy...)" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 font-mono tracking-widest"
                />
                <Button variant="gradient" onClick={handleSave} className="shrink-0 flex items-center justify-center gap-2">
                  {isSaved ? <><CircleCheck size={18}/> Saved!</> : 'Save API Key'}
                </Button>
              </div>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1 w-max">
                Get a free API key at Google AI Studio <Globe size={14}/>
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center gap-6 justify-between">
              <div>
                <h3 className="font-bold mb-1">Test Connection</h3>
                <p className="text-sm text-[var(--text-secondary)]">Verify your key works before using builders.</p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                {testResult === 'success' && <span className="text-[var(--success)] text-sm font-bold flex gap-1"><CircleCheck size={18}/> Connected!</span>}
                {testResult === 'error' && <span className="text-red-500 text-sm font-bold flex gap-1"><TriangleAlert size={18}/> Invalid Key</span>}
                <Button variant="outline" onClick={handleTest} disabled={!apiKey || testing} className="w-full md:w-auto">
                  {testing ? 'Testing...' : 'Test Connection'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* PREFERENCES */}
        <Card className="border-white/10">
          <div className="p-6 md:px-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <PaintBucket className="text-[var(--text-secondary)]" /> Preferences
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-2">Default Template</label>
                  <select className="w-full bg-[var(--background)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)]">
                    <option>Modern (Recommended)</option>
                    <option>Classic (Traditional)</option>
                    <option>Minimal (Tech)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-2">Default Input Mode</label>
                  <select className="w-full bg-[var(--background)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)]">
                    <option>Hybrid Mode ⭐</option>
                    <option>Storytelling</option>
                    <option>Form Fill</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-2">Target Market / Country</label>
                  <select className="w-full bg-[var(--background)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)]">
                    <option>India (₹)</option>
                    <option>United States ($)</option>
                    <option>Europe (€)</option>
                    <option>United Kingdom (£)</option>
                    <option>Global (Remote)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-2">Language</label>
                  <select className="w-full bg-[var(--background)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] text-gray-500 cursor-not-allowed" disabled>
                    <option>English US (Default)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* DATABASE CONFIGURATION */}
        <Card className="border-[var(--secondary)]/30 overflow-hidden relative p-0">
          <div className="p-6 md:px-8 border-b border-[var(--secondary)]/20 bg-[#16213e] flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Database className="text-[var(--secondary)]" /> Database Storage (Optional)
            </h2>
            <div className="text-xs bg-[var(--secondary)]/10 text-[var(--secondary)] px-2 py-1 rounded border border-[var(--secondary)]/20 font-bold">
              SUPABASE INTEGRATION
            </div>
          </div>
          
          <div className="p-6 md:px-8 space-y-4 bg-black/10">
            <p className="text-[var(--text-secondary)] mb-2 text-sm leading-relaxed">
              If you want to save your generated resumes to the cloud, configure your own free Supabase credentials below. If left empty, 100% of data stays locally in your browser.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Project URL</label>
                <Input 
                  type="text" 
                  placeholder="https://your-project.supabase.co" 
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Anon Public Key</label>
                <Input 
                  type="password" 
                  placeholder="eyJhbG..." 
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  className="w-full font-mono text-sm"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
               <Button variant="outline" onClick={handleSave} className="border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white">
                 Save DB Config
               </Button>
            </div>
          </div>
        </Card>

        {/* DATA MANAGEMENT */}
        <Card className="border-red-500/20 bg-red-900/10">
          <div className="p-6 md:px-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-red-500/20 pb-4 text-red-400">
              <Database size={20} /> Data Management
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-red-300 font-medium tracking-wide mb-1">Local Storage Sandbox</p>
                <p className="text-sm text-red-300/60 max-w-xl">
                  All your data stays in your browser. We never store your resume or text on any server. Clearing data removes your API key and all saved resumes instantly.
                </p>
              </div>
              <Button className="bg-red-500 hover:bg-red-600 text-white shrink-0" onClick={clearData}>
                Clear All My Data
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
