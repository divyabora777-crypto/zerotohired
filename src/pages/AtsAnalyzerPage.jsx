import { useState, useRef } from 'react';
import { Upload, FileText, CircleCheck, TriangleAlert, CircleX, Wrench, FileUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { analyzeResumeForAts } from '../services/aiService';

export default function AtsAnalyzerPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [apiError, setApiError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [showJobDesc, setShowJobDesc] = useState(false);
  const fileInputRef = useRef(null);

  const hasApiKey = (localStorage.getItem('gemini_api_key') || '').length > 20;

  // ── Run analysis against AI ──────────────────────────────────────────────────
  const runAnalysis = async (resumeText) => {
    setAnalyzing(true);
    setProgress(0);
    setApiError('');
    setResult(null);

    const interval = setInterval(() => {
      setProgress(p => p < 90 ? p + 3 : p);
    }, 200);

    try {
      if (!hasApiKey) throw new Error('No API Key found. Please add your Gemini API key in Settings first.');
      const data = await analyzeResumeForAts(resumeText, jobDesc);
      setResult(data);
      setProgress(100);
    } catch (err) {
      setApiError(err.message || 'Analysis failed. Please check your API key in Settings.');
    } finally {
      clearInterval(interval);
      setAnalyzing(false);
    }
  };

  // ── Use previously generated resume ─────────────────────────────────────────
  const handleUseGenerated = () => {
    const savedData = localStorage.getItem('zerotohired_resume_data');
    if (!savedData) {
      setApiError('No resume found! Please build a resume first in the Builder page.');
      return;
    }
    runAnalysis(savedData);
  };

  // ── Handle file upload (PDF / TXT / DOC) ─────────────────────────────────────
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setApiError('');

    const reader = new FileReader();

    // For text files: read as text
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      reader.onload = (ev) => {
        const text = ev.target.result;
        runAnalysis(text);
      };
      reader.readAsText(file);
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      // For PDF: read as ArrayBuffer and extract text using basic parsing
      reader.onload = async (ev) => {
        try {
          // Try to extract readable text from PDF binary
          const bytes = new Uint8Array(ev.target.result);
          const raw = new TextDecoder('utf-8', { ignoreBOM: true, fatal: false }).decode(bytes);
          // Extract text between BT...ET (PDF text streams)
          const textMatches = [...raw.matchAll(/BT[\s\S]*?ET/g)];
          let extracted = '';
          textMatches.forEach(m => {
            const tjMatches = [...m[0].matchAll(/\((.*?)\)\s*T[jJ]/g)];
            tjMatches.forEach(t => { extracted += t[1] + ' '; });
          });
          const finalText = extracted.trim() || raw.replace(/[^\x20-\x7E\n]/g, ' ').substring(0, 5000);
          runAnalysis(finalText || raw.substring(0, 5000));
        } catch {
          setApiError('Could not parse PDF. Please use a .txt file or paste your resume text instead.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // For other file types: try reading as text
      reader.onload = (ev) => runAnalysis(ev.target.result);
      reader.readAsText(file);
    }

    // Reset file input so user can upload same file again
    e.target.value = '';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-[var(--success)] stroke-[var(--success)]';
    if (score >= 60) return 'text-[var(--warning)] stroke-[var(--warning)]';
    return 'text-[var(--error)] stroke-[var(--error)]';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return '✅ Excellent! Your resume will pass most ATS systems.';
    if (score >= 60) return '⚠️ Good but needs improvement in some areas.';
    return '❌ Critical issues found. Fix these to get interviews.';
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">ATS Resume Analyzer <span className="text-4xl shadow-[0_0_30px_rgba(124,58,237,0.5)]">📊</span></h1>
        <p className="text-[var(--text-secondary)] text-lg">Check if your resume passes company screening software</p>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".pdf,.txt,.doc,.docx"
        onChange={handleFileUpload}
      />

      {!result && !analyzing && (
        <div className="max-w-3xl mx-auto space-y-4">

          {/* API Key warning */}
          {!hasApiKey && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0" />
              <p className="text-yellow-300 text-sm">
                <strong>No API Key!</strong> Go to <a href="/settings" className="underline font-bold">Settings</a> and add your free Gemini API Key to enable AI analysis.
              </p>
            </div>
          )}

          {/* Upload Card */}
          <Card className="text-center border-dashed border-2 border-[var(--primary)]/30 hover:border-[var(--primary)]/60 transition-colors p-12">
            <div className="w-20 h-20 mx-auto bg-[var(--card)] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
              <Upload className="h-10 w-10 text-[var(--primary)]" />
            </div>
            <h2 className="text-xl font-bold mb-2">Upload Resume or Use Generated</h2>
            <p className="text-[var(--text-secondary)] text-sm mb-8">Supports PDF, TXT, DOC files — or use the resume you built on the Builder page</p>

            {apiError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" /> {apiError}
              </div>
            )}

            {uploadedFileName && (
              <div className="mb-4 p-3 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-xl text-sm text-[var(--primary)] font-medium">
                📄 Loaded: {uploadedFileName}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <Button variant="outline" className="h-full py-5 text-base flex items-center justify-center gap-2" onClick={handleUseGenerated}>
                <FileText className="h-5 w-5" /> Use My Generated Resume
              </Button>
              <Button variant="gradient" className="h-full py-5 text-base flex items-center justify-center gap-2" onClick={() => fileInputRef.current?.click()}>
                <FileUp className="h-5 w-5" /> Upload PDF / TXT File
              </Button>
            </div>

            {/* Optional Job Description */}
            <div className="text-left">
              <button
                onClick={() => setShowJobDesc(j => !j)}
                className="text-sm text-[var(--primary)] hover:underline mb-3 flex items-center gap-1"
              >
                {showJobDesc ? '▼' : '▶'} Add Job Description for better accuracy (optional)
              </button>
              {showJobDesc && (
                <textarea
                  className="w-full h-28 bg-[var(--background)] border border-[rgba(124,58,237,0.3)] rounded-xl p-4 text-white focus:outline-none focus:border-[var(--primary)] resize-none text-sm"
                  placeholder="Paste the job description here to get keyword-specific analysis..."
                  value={jobDesc}
                  onChange={e => setJobDesc(e.target.value)}
                />
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Analyzing progress ring */}
      {analyzing && (
        <Card className="max-w-2xl mx-auto text-center py-16">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
              <circle
                cx="80" cy="80" r="70"
                stroke="currentColor" strokeWidth="8" fill="transparent"
                strokeDasharray="440"
                strokeDashoffset={440 - (440 * progress) / 100}
                className="text-[var(--primary)] transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
              {progress}%
            </div>
          </div>
          <p className="text-xl font-medium animate-pulse text-[var(--primary)]">Scanning through 500+ ATS rules... 🤖</p>
          {uploadedFileName && <p className="text-sm text-[var(--text-secondary)] mt-2">Analyzing: {uploadedFileName}</p>}
        </Card>
      )}

      {/* Results */}
      {result && !analyzing && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Score meter */}
          <div className="flex flex-col items-center mb-16">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                <circle
                  cx="128" cy="128" r="110"
                  stroke="currentColor" strokeWidth="12" fill="transparent"
                  strokeDasharray="690"
                  strokeDashoffset={690 - (690 * result.score) / 100}
                  className={`${getScoreColor(result.score)} transition-all duration-1000`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center absolute">
                <div className={`text-7xl font-black ${getScoreColor(result.score).split(' ')[0]}`}>{result.score}</div>
                <div className="text-xl text-[var(--text-secondary)] font-bold">/ 100</div>
              </div>
            </div>
            <div className="mt-8 text-xl font-semibold bg-[var(--card)] px-6 py-3 rounded-2xl border border-white/5 shadow-lg">
              {getScoreMessage(result.score)}
            </div>
            <button
              onClick={() => { setResult(null); setUploadedFileName(''); }}
              className="mt-4 text-sm text-[var(--text-secondary)] hover:text-white underline"
            >
              ← Analyze another resume
            </button>
          </div>

          {/* Three Columns */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-[var(--success)]/30 bg-[var(--success)]/5">
              <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--success)] mb-4 border-b border-[var(--success)]/20 pb-2">
                <CircleCheck size={24} /> WHAT&apos;S GREAT
              </h3>
              <ul className="space-y-3">
                {result.goodPoints.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[var(--success)]"><span className="opacity-50">✓</span> {pt}</li>
                ))}
              </ul>
            </Card>

            <Card className="border-[var(--warning)]/30 bg-[var(--warning)]/5">
              <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--warning)] mb-4 border-b border-[var(--warning)]/20 pb-2">
                <TriangleAlert size={24} /> NEEDS IMPROVEMENT
              </h3>
              <ul className="space-y-3">
                {result.improvements.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-sm text-yellow-400"><span className="opacity-50">⚠️</span> {pt}</li>
                ))}
              </ul>
            </Card>

            <Card className="border-[var(--error)]/30 bg-[var(--error)]/5">
              <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--error)] mb-4 border-b border-[var(--error)]/20 pb-2">
                <CircleX size={24} /> CRITICAL ISSUES
              </h3>
              <ul className="space-y-3">
                {result.criticalIssues.map((pt, i) => (
                  <li key={i} className="flex flex-col gap-2 text-sm p-3 bg-red-900/20 rounded-lg border border-red-500/20">
                    <div className="flex gap-2 text-[var(--error)]"><span className="opacity-50">✕</span> {pt}</div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Keyword Analysis */}
          <Card className="mb-12 border-[var(--primary)]/20">
            <h2 className="text-2xl font-bold mb-6">Keyword Match Analysis</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Keywords found in your resume</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  {result.keywordsHave?.map((kw, i) => (
                    <span key={i} className="bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/30 px-3 py-1 rounded-lg">✓ {kw}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Keywords missing from your resume</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  {result.keywordsNeed?.map((kw, i) => (
                    <span key={i} className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded-lg">✕ {kw}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Button variant="gradient" size="lg" className="w-full max-w-xl mx-auto flex items-center justify-center gap-3 text-lg py-5 shadow-[0_10px_30px_rgba(124,58,237,0.3)]" onClick={() => window.location.href = '/builder'}>
            <Wrench /> Go to Builder to Fix Issues
          </Button>

        </motion.div>
      )}
    </div>
  );
}
