import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Map, CircleCheck, ChevronRight, PlayCircle, Flame, TriangleAlert, ArrowRight } from 'lucide-react';

export default function SkillGapPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const savedData = JSON.parse(localStorage.getItem('zerotohired_resume_data') || 'null');
  const [currentSkills, setCurrentSkills] = useState(savedData?.skills || '');
  const [targetRole, setTargetRole] = useState(savedData?.targetRole || '');
  
  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        has: ["Python", "Machine Learning", "Data Analysis", "SQL"],
        needs: [
          { name: "Apache Spark", importance: "Critical", demand: "🔥 Hot", link: "https://coursera.org", time: "3 weeks" },
          { name: "Docker", importance: "Required", demand: "✅ Good", link: "https://youtube.com", time: "1 week" },
          { name: "Airflow", importance: "Preferred", demand: "⚠️ Declining", link: "https://airflow.apache.org", time: "2 weeks" }
        ],
        bonus: ["AWS SageMaker", "Kubernetes", "FastAPI"],
        roadmap: [
          { week: "Week 1-2", task: "Learn Apache Spark basics and RDDs", resource: "Coursera Course" },
          { week: "Week 3", task: "Containerize existing ML models using Docker", resource: "YouTube Crash Course" },
          { week: "Week 4-5", task: "Set up Airflow pipelines for data ingestion", resource: "Official Docs" },
          { week: "Week 6-8", task: "Build end-to-end Portfolio project combining all three", resource: "GitHub Guidelines" }
        ]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Skill Gap Detector <span className="text-4xl shadow-[0_0_30px_rgba(124,58,237,0.5)]">🕳️</span></h1>
        <p className="text-[var(--text-secondary)] text-lg">Find exactly what skills are holding you back from your dream role</p>
      </div>

      {!result && (
        <Card className="max-w-2xl mx-auto p-8 mb-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Target Role</label>
              <select className="w-full bg-[var(--background)] text-white border border-[rgba(124,58,237,0.3)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--primary)]">
                <option>Data Engineer</option>
                <option>Software Engineer</option>
                <option>Frontend Developer</option>
                <option>Machine Learning Engineer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Current Skills (comma separated)</label>
              <Input placeholder="Python, SQL, Machine Learning..." defaultValue="Python, SQL, Machine Learning" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Experience Level</label>
              <div className="flex gap-4">
                {['Fresher', '1-2 Yrs', '3-5 Yrs', '5+ Yrs'].map(lvl => (
                   <label key={lvl} className="flex-1 cursor-pointer">
                     <input type="radio" name="exp" className="peer sr-only" defaultChecked={lvl === '1-2 Yrs'} />
                     <div className="text-center py-2 px-3 border border-[rgba(124,58,237,0.3)] rounded-lg text-sm transition-colors peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)] text-white">
                       {lvl}
                     </div>
                   </label>
                ))}
              </div>
            </div>

            <Button variant="gradient" className="w-full text-lg py-4 flex items-center justify-center gap-2" onClick={handleAnalyze} disabled={analyzing}>
              {analyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Market Demand...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" /> Analyze My Gap
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            
            {/* YOU HAVE THESE */}
            <Card className="border-[var(--success)]/20 bg-[var(--success)]/5">
               <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--success)] mb-6">
                 <CircleCheck size={24} /> YOU HAVE THESE
               </h3>
               <div className="flex flex-wrap gap-2">
                 {result.has.map((skill, i) => (
                   <span key={i} className="bg-[var(--success)]/10 border border-[var(--success)]/30 text-[var(--success)] px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                     {skill} <CircleCheck size={14} />
                   </span>
                 ))}
               </div>
            </Card>

            {/* YOU NEED THESE */}
            <Card className="border-red-500/20 bg-red-900/10 lg:col-span-2">
               <h3 className="text-lg font-bold flex items-center gap-2 text-red-500 mb-6 border-b border-red-500/20 pb-4">
                 <TriangleAlert size={24} /> YOU NEED THESE CAREFULLY
               </h3>
               <div className="space-y-4">
                 {result.needs.map((skill, i) => (
                   <div key={i} className="bg-[var(--card)]/80 border border-red-500/30 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                         <h4 className="text-lg font-bold text-white tracking-wide">{skill.name}</h4>
                         <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">{skill.importance}</span>
                       </div>
                       <div className="flex items-center gap-4 text-xs font-semibold text-[var(--text-secondary)]">
                         <span className="flex items-center gap-1"><Flame size={12} className="text-orange-500"/> {skill.demand}</span>
                         <span className="flex items-center gap-1"><PlayCircle size={12} className="text-blue-400"/> ~{skill.time} completion</span>
                       </div>
                     </div>
                     <a href={skill.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm border border-white/10 transition-colors shrink-0">
                       Free Course <ChevronRight size={16} />
                     </a>
                   </div>
                 ))}
               </div>
            </Card>

          </div>

          {/* BONUS SKILLS */}
          <div className="mb-16">
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="text-yellow-500 text-xl">⭐</span> Bonus Skills To Stand Out
            </h3>
            <div className="flex flex-wrap gap-3">
               {result.bonus.map((skill, i) => (
                 <span key={i} className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 px-4 py-2 rounded-lg font-bold">
                   {skill}
                 </span>
               ))}
            </div>
          </div>

          {/* CAREER ROADMAP GENERATOR */}
          <Card className="border-[var(--primary)]/30 overflow-hidden relative p-0">
             <div className="bg-[var(--card-hover)] p-6 md:px-10 border-b border-[var(--primary)]/20">
               <h2 className="text-2xl font-bold flex items-center gap-3">
                 <Map className="text-[var(--primary)] h-8 w-8" /> Your Personalized Learning Roadmap
               </h2>
             </div>
             
             <div className="p-6 md:px-10 md:py-12 bg-black/20">
               <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 md:before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--primary)] before:to-white/10">
                 {result.roadmap.map((step, i) => (
                   <div key={i} className="relative flex items-start gap-4 md:gap-6 group">
                     <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-[var(--card)] bg-[var(--primary)] text-white shadow shrink-0 z-10 transition-transform group-hover:scale-110">
                       {i + 1}
                     </div>
                     <div className="pt-1.5 md:pt-2">
                       <h4 className="text-sm font-bold text-[var(--primary)] uppercase tracking-widest mb-1">{step.week}</h4>
                       <p className="text-lg md:text-xl font-medium text-white mb-2">{step.task}</p>
                       <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                         Resource: {step.resource}
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             <div className="bg-[var(--gradient-card)] p-6 md:px-10 text-center border-t border-[var(--primary)]/20">
               <p className="text-lg font-bold">🎯 Estimated Job-Ready Date: <span className="text-[var(--primary)]">8 Weeks From Today</span></p>
               <Button variant="gradient" className="mt-4 flex items-center gap-2 mx-auto">
                 Export Roadmap to PDF <ArrowRight size={16} />
               </Button>
             </div>
          </Card>
        </motion.div>
      )}

    </div>
  );
}
