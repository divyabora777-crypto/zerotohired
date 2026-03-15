import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, LayoutTemplate, Flame, Mic, Sparkles, Loader2, Download,
  Target, Database, ChevronRight, ChevronLeft, User, BookOpen, Briefcase,
  Code, Heart, AlertCircle, Wrench, Check
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import LivePreview from '../components/builder/LivePreview';
import { generateResumeFromStory, enhanceBullet } from '../services/aiService';
import { saveResumeToDatabase } from '../services/supabaseClient';

// ─── AI Tools available to select ────────────────────────────────────────────
const AI_TOOLS = [
  { id: 'summary', label: '✍️ Write My Summary', desc: 'AI writes a professional summary for you' },
  { id: 'bullets', label: '⚡ Enhance Bullets', desc: 'Rewrites job bullets with action verbs + metrics' },
  { id: 'keywords', label: '🔑 Add ATS Keywords', desc: 'Adds in-demand keywords for your target role' },
  { id: 'indian', label: '🇮🇳 Indian Format', desc: 'Adds Declaration, Father Name, DOB section' },
  { id: 'fresher', label: '🎓 Fresher Boost', desc: 'Highlights academic projects and skills' },
];

// ─── Form steps ───────────────────────────────────────────────────────────────
const STEPS = [
  { id: 'basic',      label: 'Personal',   icon: User },
  { id: 'education',  label: 'Education',  icon: BookOpen },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills',     label: 'Skills',     icon: Code },
  { id: 'extras',     label: 'Extras',     icon: Heart },
];

// ─── Build resume object from form state ─────────────────────────────────────
function buildFromForm(f, selectedTools) {
  const educationList = [];
  if (f.degreeTitle) educationList.push({ degree: f.degreeTitle, fieldOfStudy: f.degreeField, college: f.degreeCollege, year: f.degreeYear, percentage: f.degreePct });
  if (f.interBoard)  educationList.push({ degree: '12th / Intermediate', college: f.interCollege, board: f.interBoard, year: f.interYear, percentage: f.interPct });
  if (f.sscBoard)    educationList.push({ degree: '10th / SSC', college: f.sscSchool, board: f.sscBoard, year: f.sscYear, percentage: f.sscPct });

  return {
    name: f.name, email: f.email, phone: f.phone,
    location: f.location, targetRole: f.targetRole,
    dob: f.dob, fatherName: f.fatherName, languages: f.languages,
    summary: f.summary,
    links: {
      linkedin: f.linkedin,
      github: f.github,
      portfolio: f.portfolio,
      vercel: f.vercel,
    },
    education: educationList,
    experience: f.expRole ? [{ role: f.expRole, company: f.expCompany, duration: f.expDuration, responsibilities: f.expDesc.split('\n').filter(Boolean) }] : [],
    skills: f.skills.split(',').map(s => s.trim()).filter(Boolean),
    projects: f.projName ? [{ name: f.projName, techStack: f.projTech, description: f.projDesc }] : [],
    achievements: f.achievements.split('\n').filter(Boolean),
    certifications: f.certifications.split('\n').filter(Boolean),
    interests: f.interests.split(',').map(s => s.trim()).filter(Boolean),
    _tools: selectedTools,
    _showDeclaration: selectedTools.includes('indian'),
  };
}

export default function BuilderPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') || 'story';

  const [activeTab, setActiveTab]     = useState(initialMode);
  const [storyText, setStoryText]     = useState('');
  const [hybridText, setHybridText]   = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsg, setLoadingMsg]   = useState('');
  const [resumeData, setResumeData]   = useState(null);
  const [apiError, setApiError]       = useState('');
  const [dbStatus, setDbStatus]       = useState({ state: 'idle', message: '' });
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [formStep, setFormStep]       = useState(0);
  const [selectedTools, setSelectedTools] = useState([]);
  const [toolLog, setToolLog]         = useState('');

  const [form, setForm] = useState({
    // Personal
    name: '', email: '', phone: '', location: '', targetRole: '',
    dob: '', fatherName: '', languages: '',
    summary: '',
    // Social Links
    linkedin: '', github: '', portfolio: '', vercel: '',
    // Degree
    degreeTitle: '', degreeField: '', degreeCollege: '', degreeYear: '', degreePct: '',
    // Intermediate / 12th
    interCollege: '', interBoard: '', interYear: '', interPct: '',
    // SSC / 10th
    sscSchool: '', sscBoard: '', sscYear: '', sscPct: '',
    // Experience
    expRole: '', expCompany: '', expDuration: '', expDesc: '',
    // Skills & Projects
    skills: '', projName: '', projTech: '', projDesc: '',
    // Extras
    achievements: '', certifications: '', interests: '',
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const loadingMessages = [
    'Reading your information... 🧠', 'Crafting professional bullets... ✍️',
    'Adding ATS keywords... 🔑',       'Formatting your resume... 📄',
    'Almost ready... ✨',
  ];

  const apiKey   = localStorage.getItem('gemini_api_key') || '';
  const hasApiKey = apiKey.length > 20;

  const toggleTool = (id) => setSelectedTools(t => t.includes(id) ? t.filter(x => x !== id) : [...t, id]);

  const saveDB = async (data) => {
    const res = await saveResumeToDatabase(data, selectedTemplate);
    if (res?.success) {
      setDbStatus({ state: 'success', message: 'Saved to Supabase ✓' });
      setTimeout(() => setDbStatus({ state: 'idle', message: '' }), 4000);
    } else {
      setDbStatus({ state: 'idle', message: '' });
    }
  };

  const runGeneration = async (fn) => {
    setIsGenerating(true);
    setApiError('');
    let i = 0;
    setLoadingMsg(loadingMessages[0]);
    const t = setInterval(() => { i = (i + 1) % loadingMessages.length; setLoadingMsg(loadingMessages[i]); }, 2000);
    try {
      const data = await fn();
      setResumeData(data);
      // Save for cross-page sync
      localStorage.setItem('zerotohired_resume_data', JSON.stringify(data));
      setDbStatus({ state: 'loading', message: 'Saving to Cloud...' });
      saveDB(data);
    } catch (err) {
      setApiError(err.message || 'Generation failed. Check your Gemini API key in Settings.');
    } finally {
      clearInterval(t);
      setIsGenerating(false);
    }
  };

  const handleStoryGenerate  = () => runGeneration(() => generateResumeFromStory(storyText));
  const handleHybridGenerate = () => runGeneration(() => generateResumeFromStory(hybridText));

  const handleFormGenerate = async () => {
    const data = buildFromForm(form, selectedTools);

    // Apply selected AI tools
    if (selectedTools.includes('bullets') && data.experience.length > 0 && hasApiKey) {
      setToolLog('Enhancing bullet points...');
      try {
        const enhanced = await Promise.all(
          data.experience[0].responsibilities.map(r => enhanceBullet(r))
        );
        data.experience[0].responsibilities = enhanced;
      } catch { /* silently skip */ }
    }

    if (selectedTools.includes('fresher')) {
      data.summary = data.summary || `A motivated ${data.targetRole || 'professional'} fresher with hands-on project experience. Eager to apply academic knowledge to real-world challenges in a dynamic organization.`;
    }

    if (selectedTools.includes('indian')) {
      data._showDeclaration = true;
    }

    setToolLog('');
    setResumeData(data);
    // CRITICAL: Sync with localStorage so DNA/Tools pages work
    localStorage.setItem('zerotohired_resume_data', JSON.stringify(data));
    saveDB(data);
  };

  const handleDownload = () => {
    if (!resumeData) return;
    alert("To save as PDF: Use 'Print' (Ctrl+P) and select 'Save as PDF'. \n\nA JSON backup will also be downloaded now.");
    const content = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'resume-backup.json'; a.click();
  };

  const sectionH = 'text-base font-bold text-gray-300 uppercase tracking-widest border-b border-white/10 pb-2 mb-4';
  const subLabel = 'block text-xs text-[var(--text-secondary)] mb-1 font-semibold uppercase tracking-wider';

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* API Key Warning */}
      {!hasApiKey && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0" />
          <p className="text-yellow-300 text-sm">
            <strong>No API Key!</strong> Add your free Gemini API key in{' '}
            <a href="/settings" className="underline font-bold">Settings</a>{' '}
            to enable AI-powered Story &amp; Hybrid modes. <strong>Form mode works without any key.</strong>
          </p>
        </div>
      )}

      {/* Tab Selector */}
      <div className="flex justify-center mb-10">
        <div className="bg-[var(--card)] p-1.5 rounded-2xl inline-flex border border-[rgba(124,58,237,0.2)]">
          {[
            { id: 'story',  icon: <MessageSquare className="h-4 w-4" />, label: 'Tell My Story' },
            { id: 'form',   icon: <LayoutTemplate className="h-4 w-4" />, label: 'Fill Form' },
            { id: 'hybrid', icon: <Flame className="h-4 w-4 text-orange-400" />, label: 'Hybrid ⭐' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setFormStep(0); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all text-sm ${activeTab === tab.id ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* ───────── LEFT PANEL ───────── */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">

            {/* ── STORY MODE ── */}
            {activeTab === 'story' && (
              <motion.div key="story" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">Tell us your story 👋</h2>
                  <p className="text-[var(--text-secondary)] text-sm">Talk naturally — include your 10th, 12th, degree, experience, skills, interests, anything!</p>
                </div>
                <textarea
                  value={storyText}
                  onChange={e => setStoryText(e.target.value)}
                  className="w-full h-80 bg-[var(--card)] border border-[rgba(124,58,237,0.3)] rounded-2xl p-6 text-white focus:outline-none focus:border-[var(--primary)] resize-none text-sm"
                  placeholder={"Hi! My name is Divya Bora. I scored 82% in 10th from ABC School, Board: CBSE.\nI did my 12th from XYZ College with 78%, PCM stream.\nI'm currently doing BTech CSE at JNTU (2024 pass-out).\nI know Python, React, SQL, Machine Learning.\nI built a Fake News Detector project using ML.\nI did an internship at TCS for 3 months.\nI want to become a Software Engineer at a startup.\nMy interests include coding, reading, cricket."}
                />
                {apiError && <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex gap-2"><AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />{apiError}</div>}
                <Button variant="gradient" className="w-full mt-4 flex items-center justify-center gap-2" size="lg" onClick={handleStoryGenerate} disabled={isGenerating || storyText.length < 30 || !hasApiKey}>
                  {isGenerating ? <><Loader2 className="h-5 w-5 animate-spin" /> {loadingMsg}</> : <><Sparkles className="h-5 w-5" /> Generate My Perfect Resume</>}
                </Button>
              </motion.div>
            )}

            {/* ── FORM MODE ── */}
            {activeTab === 'form' && (
              <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

                {/* Step bar */}
                <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
                  {STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <button key={step.id} onClick={() => setFormStep(idx)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                          formStep === idx ? 'bg-[var(--primary)] text-white border-[var(--primary)]' :
                          formStep > idx ? 'bg-green-500/15 text-green-400 border-green-500/30' :
                          'bg-[var(--card)] text-[var(--text-secondary)] border-white/10 hover:border-white/30'
                        }`}
                      >
                        {formStep > idx ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                        {step.label}
                      </button>
                    );
                  })}
                </div>

                <Card className="mb-4">
                  <AnimatePresence mode="wait">

                    {/* Step 0 — Personal */}
                    {formStep === 0 && (
                      <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <p className={sectionH}>👤 Personal Information</p>
                        <div className="space-y-3">
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div><label className={subLabel}>Full Name *</label><Input placeholder="Divya Bora" value={form.name} onChange={e => setField('name', e.target.value)} /></div>
                            <div><label className={subLabel}>Target Role *</label><Input placeholder="Software Engineer" value={form.targetRole} onChange={e => setField('targetRole', e.target.value)} /></div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div><label className={subLabel}>Email *</label><Input type="email" placeholder="divya@gmail.com" value={form.email} onChange={e => setField('email', e.target.value)} /></div>
                            <div><label className={subLabel}>Phone</label><Input placeholder="9491296343" value={form.phone} onChange={e => setField('phone', e.target.value)} /></div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div><label className={subLabel}>City, State</label><Input placeholder="Hyderabad, Telangana" value={form.location} onChange={e => setField('location', e.target.value)} /></div>
                            <div><label className={subLabel}>Date of Birth</label><Input type="date" value={form.dob} onChange={e => setField('dob', e.target.value)} /></div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div><label className={subLabel}>Father's Name</label><Input placeholder="Ramesh Bora" value={form.fatherName} onChange={e => setField('fatherName', e.target.value)} /></div>
                            <div><label className={subLabel}>Languages Known</label><Input placeholder="Telugu, English, Hindi" value={form.languages} onChange={e => setField('languages', e.target.value)} /></div>
                          </div>
                          <div>
                            <label className={subLabel}>Career Objective / Summary</label>
                            <textarea className="w-full h-20 bg-[var(--background)] border border-[rgba(124,58,237,0.3)] rounded-xl p-3 text-white focus:outline-none focus:border-[var(--primary)] resize-none text-sm"
                              placeholder="Passionate and dedicated BTech CSE graduate seeking an opportunity to apply..."
                              value={form.summary} onChange={e => setField('summary', e.target.value)} />
                          </div>
                          {/* Social Links */}
                          <div className="pt-3 border-t border-white/10">
                            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-3">🔗 Social & Portfolio Links (Optional)</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div><label className={subLabel}>LinkedIn URL</label><Input placeholder="linkedin.com/in/divyabora" value={form.linkedin} onChange={e => setField('linkedin', e.target.value)} /></div>
                              <div><label className={subLabel}>GitHub URL</label><Input placeholder="github.com/divyabora" value={form.github} onChange={e => setField('github', e.target.value)} /></div>
                              <div><label className={subLabel}>Portfolio / Vercel</label><Input placeholder="myportfolio.vercel.app" value={form.portfolio} onChange={e => setField('portfolio', e.target.value)} /></div>
                              <div><label className={subLabel}>Any Other Link</label><Input placeholder="leetcode.com/divya or vercel.app..." value={form.vercel} onChange={e => setField('vercel', e.target.value)} /></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 1 — Education */}
                    {formStep === 1 && (
                      <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <p className={sectionH}>🎓 Education Details</p>

                        <div className="space-y-5">
                          {/* Degree */}
                          <div className="p-4 bg-[var(--background)]/60 rounded-xl border border-[rgba(124,58,237,0.2)]">
                            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-3">📚 Graduation / BTech / BCA / BSc</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div><label className={subLabel}>Degree Name</label><Input placeholder="B.Tech / BCA / BSc..." value={form.degreeTitle} onChange={e => setField('degreeTitle', e.target.value)} /></div>
                              <div><label className={subLabel}>Branch / Stream</label><Input placeholder="Computer Science" value={form.degreeField} onChange={e => setField('degreeField', e.target.value)} /></div>
                              <div><label className={subLabel}>College Name</label><Input placeholder="JNTU Hyderabad" value={form.degreeCollege} onChange={e => setField('degreeCollege', e.target.value)} /></div>
                              <div><label className={subLabel}>Year of Passing</label><Input placeholder="2024" value={form.degreeYear} onChange={e => setField('degreeYear', e.target.value)} /></div>
                              <div><label className={subLabel}>CGPA / Percentage</label><Input placeholder="8.5 CGPA / 82%" value={form.degreePct} onChange={e => setField('degreePct', e.target.value)} /></div>
                            </div>
                          </div>

                          {/* 12th */}
                          <div className="p-4 bg-[var(--background)]/60 rounded-xl border border-[rgba(124,58,237,0.2)]">
                            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-3">🏫 12th / Intermediate</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div><label className={subLabel}>College Name</label><Input placeholder="Sri Chaitanya Jr College" value={form.interCollege} onChange={e => setField('interCollege', e.target.value)} /></div>
                              <div><label className={subLabel}>Board</label><Input placeholder="TSBIE / CBSE / ICSE" value={form.interBoard} onChange={e => setField('interBoard', e.target.value)} /></div>
                              <div><label className={subLabel}>Year of Passing</label><Input placeholder="2020" value={form.interYear} onChange={e => setField('interYear', e.target.value)} /></div>
                              <div><label className={subLabel}>Marks / Percentage</label><Input placeholder="94% / 940/1000" value={form.interPct} onChange={e => setField('interPct', e.target.value)} /></div>
                            </div>
                          </div>

                          {/* 10th */}
                          <div className="p-4 bg-[var(--background)]/60 rounded-xl border border-[rgba(124,58,237,0.2)]">
                            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-3">🏫 10th / SSC</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div><label className={subLabel}>School Name</label><Input placeholder="ABC High School" value={form.sscSchool} onChange={e => setField('sscSchool', e.target.value)} /></div>
                              <div><label className={subLabel}>Board</label><Input placeholder="BSEAP / CBSE / ICSE" value={form.sscBoard} onChange={e => setField('sscBoard', e.target.value)} /></div>
                              <div><label className={subLabel}>Year of Passing</label><Input placeholder="2018" value={form.sscYear} onChange={e => setField('sscYear', e.target.value)} /></div>
                              <div><label className={subLabel}>GPA / Percentage</label><Input placeholder="9.2 GPA / 92%" value={form.sscPct} onChange={e => setField('sscPct', e.target.value)} /></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2 — Experience */}
                    {formStep === 2 && (
                      <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <p className={sectionH}>💼 Work / Internship Experience</p>
                        <p className="text-xs text-[var(--text-secondary)] mb-4">Leave blank if you are a fresher! Your projects will carry this section.</p>
                        <div className="space-y-3">
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div><label className={subLabel}>Your Role / Title</label><Input placeholder="Software Developer Intern" value={form.expRole} onChange={e => setField('expRole', e.target.value)} /></div>
                            <div><label className={subLabel}>Company Name</label><Input placeholder="TCS / Infosys / Startup..." value={form.expCompany} onChange={e => setField('expCompany', e.target.value)} /></div>
                          </div>
                          <div><label className={subLabel}>Duration</label><Input placeholder="Jun 2023 – Aug 2023 (3 months)" value={form.expDuration} onChange={e => setField('expDuration', e.target.value)} /></div>
                          <div>
                            <label className={subLabel}>What you did (one per line)</label>
                            <textarea className="w-full h-32 bg-[var(--background)] border border-[rgba(124,58,237,0.3)] rounded-xl p-3 text-white focus:outline-none focus:border-[var(--primary)] resize-none text-sm"
                              placeholder={"Built REST APIs using Django\nReduced page load time by 40%\nWorked with a team of 5 engineers"}
                              value={form.expDesc} onChange={e => setField('expDesc', e.target.value)} />
                          </div>
                          {/* Project */}
                          <div className="pt-3 border-t border-white/10">
                            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-3">🚀 Featured Project</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div><label className={subLabel}>Project Name</label><Input placeholder="Fake News Detector" value={form.projName} onChange={e => setField('projName', e.target.value)} /></div>
                              <div><label className={subLabel}>Tech Stack</label><Input placeholder="Python, scikit-learn, Flask" value={form.projTech} onChange={e => setField('projTech', e.target.value)} /></div>
                            </div>
                            <textarea className="w-full h-20 bg-[var(--background)] border border-[rgba(124,58,237,0.3)] rounded-xl p-3 text-white focus:outline-none focus:border-[var(--primary)] resize-none text-sm mt-3"
                              placeholder="Built an ML model to detect fake news with 93% accuracy. Deployed on Heroku."
                              value={form.projDesc} onChange={e => setField('projDesc', e.target.value)} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3 — Skills */}
                    {formStep === 3 && (
                      <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <p className={sectionH}>⚙️ Skills & Certifications</p>
                        <div className="space-y-4">
                          <div>
                            <label className={subLabel}>Technical Skills (comma separated) *</label>
                            <Input placeholder="Python, React, SQL, TensorFlow, Docker, AWS..." value={form.skills} onChange={e => setField('skills', e.target.value)} />
                          </div>
                          <div>
                            <label className={subLabel}>Certifications (one per line)</label>
                            <textarea className="w-full h-24 bg-[var(--background)] border border-[rgba(124,58,237,0.3)] rounded-xl p-3 text-white focus:outline-none focus:border-[var(--primary)] resize-none text-sm"
                              placeholder={"Google Data Analytics Certificate (2023)\nAWS Cloud Practitioner (2024)"}
                              value={form.certifications} onChange={e => setField('certifications', e.target.value)} />
                          </div>
                          <div>
                            <label className={subLabel}>Achievements / Awards (one per line)</label>
                            <textarea className="w-full h-24 bg-[var(--background)] border border-[rgba(124,58,237,0.3)] rounded-xl p-3 text-white focus:outline-none focus:border-[var(--primary)] resize-none text-sm"
                              placeholder={"1st place in College Hackathon 2023\nState-level chess champion 2019"}
                              value={form.achievements} onChange={e => setField('achievements', e.target.value)} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4 — Extras */}
                    {formStep === 4 && (
                      <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <p className={sectionH}>❤️ Interests & AI Tools</p>
                        <div className="space-y-6">
                          <div>
                            <label className={subLabel}>Hobbies / Interests (comma separated)</label>
                            <Input placeholder="Reading, Cricket, Photography, Cooking, Coding..." value={form.interests} onChange={e => setField('interests', e.target.value)} />
                          </div>

                          {/* AI Tool selector */}
                          <div>
                            <p className="text-sm font-bold text-[var(--primary)] mb-3 flex items-center gap-2"><Wrench className="h-4 w-4" /> Choose AI Tools to Apply</p>
                            <div className="space-y-2">
                              {AI_TOOLS.map(tool => (
                                <label key={tool.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedTools.includes(tool.id) ? 'border-[var(--primary)] bg-[var(--primary)]/10' : 'border-white/10 hover:border-white/30 bg-[var(--card)]'}`}>
                                  <input type="checkbox" checked={selectedTools.includes(tool.id)} onChange={() => toggleTool(tool.id)} className="accent-purple-500 h-4 w-4" />
                                  <div>
                                    <p className="text-sm font-semibold">{tool.label}</p>
                                    <p className="text-xs text-[var(--text-secondary)]">{tool.desc}</p>
                                  </div>
                                  {selectedTools.includes(tool.id) && <Check className="h-4 w-4 text-[var(--primary)] ml-auto" />}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        {toolLog && <p className="text-xs text-[var(--primary)] mt-3 animate-pulse">{toolLog}</p>}

                        <div className="space-y-4 mt-6">
                           {(!form.name || !form.targetRole) && (
                             <p className="text-xs text-orange-400 bg-orange-400/10 p-2 rounded-lg border border-orange-400/20 flex gap-2">
                               <AlertCircle size={14} className="shrink-0" /> Please fill Name and Target Role in Step 1 to enable building.
                             </p>
                           )}
                           <Button variant="gradient" className="w-full flex items-center justify-center gap-2 text-base py-4" onClick={handleFormGenerate} disabled={!form.name || !form.targetRole}>
                             <Sparkles className="h-5 w-5" /> Build My Resume ✨
                           </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  {formStep < 4 && (
                    <div className="flex gap-3 mt-6 pt-5 border-t border-white/10">
                      {formStep > 0 && (
                        <Button variant="outline" className="flex items-center gap-2" onClick={() => setFormStep(s => s - 1)}>
                          <ChevronLeft className="h-4 w-4" /> Back
                        </Button>
                      )}
                      <Button variant="gradient" className="flex-1 flex items-center justify-center gap-2" onClick={() => setFormStep(s => s + 1)}>
                        Next: {STEPS[formStep + 1]?.label} <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}

            {/* ── HYBRID MODE ── */}
            {activeTab === 'hybrid' && (
              <motion.div key="hybrid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Card variant="gradient">
                  <h2 className="text-2xl font-bold mb-2">The Best of Both Worlds ⚡</h2>
                  <p className="text-[var(--text-secondary)] mb-4 text-sm">Write anything about yourself — include your 10th, 12th, degree, skills, projects, interests — AI builds a full professional resume instantly.</p>
                  <textarea
                    className="w-full h-56 bg-[var(--background)]/60 border border-[rgba(124,58,237,0.3)] rounded-xl p-4 mb-4 text-white focus:outline-none focus:border-[var(--primary)] resize-none text-sm"
                    placeholder={"Name: Divya Bora\nPhone: 9491296343 | Email: divya@gmail.com\n10th: ABC School, CBSE, 2018, 92%\n12th: XYZ Jr College, TSBIE, 2020, 94%\nDegree: BTech CSE, JNTU, 2024, 8.5 CGPA\nSkills: Python, React, SQL, ML\nProject: Fake News Detector (Flask, scikit-learn)\nInterests: Coding, Chess, Cricket\nTarget Role: Software Engineer"}
                    value={hybridText}
                    onChange={e => setHybridText(e.target.value)}
                  />
                  {apiError && <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex gap-2"><AlertCircle className="h-4 w-4 shrink-0 mt-0.5"/>{apiError}</div>}
                  <Button
                    className="w-full bg-white text-[var(--primary)] hover:bg-gray-100 font-bold flex items-center justify-center gap-2"
                    onClick={handleHybridGenerate}
                    disabled={isGenerating || hybridText.length < 20 || !hasApiKey}
                  >
                    {isGenerating
                      ? <><Loader2 className="h-5 w-5 animate-spin text-[var(--primary)]" /> {loadingMsg}</>
                      : <><Sparkles className="h-5 w-5" /> Generate Full Resume AI ✨</>}
                  </Button>
                </Card>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ───────── RIGHT PANEL ───────── */}
        <div className="sticky top-24">

          {/* Template Gallery */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">Template</h2>
              <span className="text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-md">{selectedTemplate.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: 'modern',  label: '🎨 Modern' },
                { id: 'classic', label: '📄 Classic' },
                { id: 'minimal', label: '⚡ Minimal' },
                { id: 'indian',  label: '🇮🇳 India' },
                { id: 'us',      label: '🇺🇸 USA' },
              ].map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`rounded-xl text-[10px] font-bold py-2.5 px-1 transition-all border-2 ${
                    selectedTemplate === tpl.id
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]'
                      : 'border-white/10 bg-[var(--card)] text-[var(--text-secondary)] hover:border-white/30'
                  }`}
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold border-l-4 border-[var(--primary)] pl-3">Live Preview</h2>
            {dbStatus.state === 'success' && (
              <span className="text-xs text-green-400 font-bold flex items-center gap-1"><Database size={12} /> {dbStatus.message}</span>
            )}
          </div>

          <div className="relative">
            {isGenerating && (
              <div className="absolute inset-0 z-10 backdrop-blur-sm bg-[var(--background)]/70 rounded-2xl flex flex-col items-center justify-center">
                <div className="w-14 h-14 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-base font-bold text-transparent bg-clip-text bg-[var(--gradient)] animate-pulse">{loadingMsg}</p>
              </div>
            )}
            <div className="rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[rgba(124,58,237,0.2)]">
              <LivePreview data={resumeData} template={selectedTemplate} />
            </div>
          </div>

          {resumeData && !isGenerating && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex gap-2 items-center justify-center text-sm" onClick={() => window.location.href = '/ats'}>
                <Target className="h-4 w-4" /> ATS Check
              </Button>
              <Button variant="gradient" className="flex gap-2 items-center justify-center text-sm" onClick={handleDownload}>
                <Download className="h-4 w-4" /> Download
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
