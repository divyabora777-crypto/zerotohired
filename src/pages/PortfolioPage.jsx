import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Globe, Link as LinkIcon, Download, Copy, Share2, Smartphone } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const themes = [
  { id: 'purple', name: 'Purple', bg: 'bg-[#0f0f1a]', accent: 'text-purple-500', btn: 'bg-purple-600', border: 'border-purple-500/20' },
  { id: 'blue', name: 'Blue', bg: 'bg-[#0a192f]', accent: 'text-blue-400', btn: 'bg-blue-600', border: 'border-blue-500/20' },
  { id: 'green', name: 'Green', bg: 'bg-[#091e13]', accent: 'text-emerald-400', btn: 'bg-emerald-600', border: 'border-emerald-500/20' },
  { id: 'dark', name: 'Dark', bg: 'bg-[#111111]', accent: 'text-gray-300', btn: 'bg-gray-700', border: 'border-gray-500/20' },
  { id: 'light', name: 'Light', bg: 'bg-[#f4f4f5]', accent: 'text-indigo-600', btn: 'bg-indigo-600', border: 'border-gray-300', isLight: true },
];

export default function PortfolioPage() {
  const [activeTheme, setActiveTheme] = useState(themes[0]);
  const [copied, setCopied] = useState(false);

  // Dynamic Data Logic: Load from saved resume sync
  const savedData = JSON.parse(localStorage.getItem('zerotohired_resume_data') || 'null');
  const hname = savedData?.name || "Rahul Sharma";
  const hrole = savedData?.targetRole || "Software Engineer • AI/ML Developer";
  const hsummary = savedData?.summary || "Passionate about building scalable technical solutions. I combine a strong foundation in Machine Learning with full-stack development skills to solve real-world problems.";
  const hskills = savedData?.skills?.split(',').map(s => ({ name: s.trim(), val: 75 + Math.floor(Math.random() * 20) })) || [];
  const hprojects = (savedData?.projects || []).length > 0 ? savedData.projects : [
    { name: 'Fake News Detector', tech: 'Python, Scikit-learn, Flask' },
    { name: 'Algorithmic Trader', tech: 'Pandas, AWS, WebSockets' }
  ];

  const slug = hname.toLowerCase().replace(/ /g, '-');
  const link = `zerotohired.vercel.app/p/${slug}`;
  const qrRef = useRef();

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Portfolio Website Generator <span className="text-4xl shadow-[0_0_30px_rgba(124,58,237,0.5)]">🌐</span></h1>
        <p className="text-[var(--text-secondary)] text-lg">Auto-generates from your resume in one click based on your DNA profile</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Side: Controls */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-[var(--primary)]/30">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Globe className="text-[var(--primary)]"/> Your Live Link</h2>
            
            <div className="flex items-center gap-2 bg-[var(--background)] border border-white/10 rounded-xl p-2 mb-6">
              <div className="bg-white/5 p-2 rounded-lg">
                <LinkIcon size={16} className="text-[var(--text-secondary)]" />
              </div>
              <input 
                type="text" 
                readOnly 
                value={link} 
                className="bg-transparent text-sm w-full outline-none text-[var(--text-secondary)]"
              />
              <button 
                onClick={handleCopy}
                className="bg-[var(--primary)] text-white p-2 rounded-lg hover:bg-[var(--primary)]/80 transition-colors"
                title="Copy Link"
              >
                {copied ? <CircleCheck size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <h3 className="text-sm border-t border-[var(--primary)]/20 pt-6 font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Color Theme</h3>
            <div className="flex gap-3 mb-6">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTheme(t)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${activeTheme.id === t.id ? 'scale-125 border-white' : 'border-transparent opacity-70'} ${t.id === 'light' ? 'bg-white' : t.id === 'dark' ? 'bg-gray-800' : t.bg}`}
                  title={t.name}
                />
              ))}
            </div>

            <div className="pt-6 border-t border-[var(--primary)]/20 text-center">
               <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Scan QR Code</h3>
               <div className="bg-white p-4 rounded-xl inline-block mb-4 shadow-lg border-4 border-[var(--primary)]/20" ref={qrRef}>
                 <QRCodeSVG value={`https://${link}`} size={120} level="H" fgColor="#000000" />
               </div>
               <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">Add this QR code to your resume! Recruiter scans → sees your full portfolio instantly.</p>
               <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                 <Download size={16} /> Download QR Code Image
               </Button>
            </div>
          </Card>
        </div>

        {/* Right Side: Mockup Preview */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#2a2a2a] relative">
            {/* Browser Header */}
            <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-black/40 rounded-lg px-3 py-1 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                 <Globe size={12} /> {link}
              </div>
            </div>

            {/* Generated Portfolio View inside mock browser */}
            <div className={`${activeTheme.bg} ${activeTheme.isLight ? 'text-gray-900 border-gray-200' : 'text-gray-100'} min-h-[600px] overflow-y-auto transition-colors duration-500`}>
              {/* Portfolio Hero */}
              <div className={`py-16 px-8 text-center border-b ${activeTheme.border}`}>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${activeTheme.isLight ? 'text-gray-900' : 'text-white'}`}>{hname}</h1>
                  <h2 className={`text-xl font-medium mb-6 ${activeTheme.accent}`}>{hrole}</h2>
                  <p className={`max-w-2xl mx-auto text-sm leading-relaxed ${activeTheme.isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                    {hsummary}
                  </p>
                  <div className="flex justify-center gap-4 mt-8">
                    <button className={`${activeTheme.btn} text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:opacity-90 transition-opacity`}>Download Resume</button>
                    <button className={`px-6 py-2 rounded-lg font-medium border ${activeTheme.isLight ? 'border-gray-300 hover:bg-gray-100' : 'border-white/20 hover:bg-white/5'}`}>Contact Me</button>
                  </div>
                </motion.div>
              </div>

              {/* Portfolio Body Sections */}
              <div className="p-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                 <div>
                   <h3 className={`text-lg font-bold uppercase tracking-wider mb-6 border-b pb-2 inline-block ${activeTheme.accent} ${activeTheme.border}`}>Skills & Expertise</h3>
                   <div className="space-y-4">
                     {hskills.slice(0, 4).map(skill => (
                       <div key={skill.name}>
                         <div className="flex justify-between text-xs font-bold mb-1">
                           <span>{skill.name}</span>
                         </div>
                         <div className={`h-1.5 w-full rounded-full ${activeTheme.isLight ? 'bg-gray-200' : 'bg-white/10'}`}>
                           <div className={`h-full rounded-full ${activeTheme.btn}`} style={{ width: `${skill.val}%` }}></div>
                         </div>
                       </div>
                     ))}
                     {hskills.length === 0 && <p className="text-xs text-gray-500 italic">No skills analyzed yet.</p>}
                   </div>
                 </div>

                 <div>
                   <h3 className={`text-lg font-bold uppercase tracking-wider mb-6 border-b pb-2 inline-block ${activeTheme.accent} ${activeTheme.border}`}>Featured Projects</h3>
                   <div className="space-y-4">
                     {hprojects.map((p, i) => (
                       <div key={i} className={`p-4 rounded-xl border ${activeTheme.border} ${activeTheme.isLight ? 'bg-white shadow-sm' : 'bg-white/5'}`}>
                         <h4 className="font-bold text-sm mb-1">{p.name || p.projName || 'Project'}</h4>
                         <p className={`text-xs ${activeTheme.isLight ? 'text-gray-500' : 'text-gray-400'} mb-3`}>{p.tech || p.projTech || 'AI Stack'}</p>
                         <div className="flex gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${activeTheme.accent}`}><Globe size={10}/> Live Demo</span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${activeTheme.isLight ? 'text-gray-600' : 'text-gray-500'}`}><LinkIcon size={10}/> Source</span>
                         </div>
                       </div>
                     ))}
                     {hprojects.length === 0 && <p className="text-xs text-gray-500 italic">No projects added yet.</p>}
                   </div>
                 </div>
              </div>
            </div>
            
            {/* Desktop / Mobile view toggle overlay */}
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur border border-white/20 p-1 rounded-xl flex items-center text-white">
              <button className="p-2 bg-[var(--primary)] rounded-lg"><Globe size={16} /></button>
              <button className="p-2 opacity-50 hover:opacity-100 transition-opacity"><Smartphone size={16} /></button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
