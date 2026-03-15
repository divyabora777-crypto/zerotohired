import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Dna, Lock, CheckCircle, ChevronRight, Trophy, Sparkles, TriangleAlert } from 'lucide-react';
import { Card } from '../components/ui/Card';

const badges = [
  { id: 1, name: "DNA Unlocked", icon: "🧬", unlocked: true, desc: "Generated DNA profile" },
  { id: 2, name: "ATS Master", icon: "📊", unlocked: false, desc: "Scored above 80 on ATS" },
  { id: 3, name: "Speed Builder", icon: "⚡", unlocked: true, desc: "Built resume in under 2 minutes" },
  { id: 4, name: "Skill Champion", icon: "💪", unlocked: true, desc: "Filled 10+ skills" },
  { id: 5, name: "Portfolio Pro", icon: "🌐", unlocked: false, desc: "Generated portfolio" },
  { id: 6, name: "Story Teller", icon: "🎤", unlocked: true, desc: "Used storytelling mode" },
  { id: 7, name: "Red Flag Cleaner", icon: "🚨", unlocked: false, desc: "Fixed all red flags" },
  { id: 8, name: "Roast Survived", icon: "😂", unlocked: false, desc: "Completed resume roaster" },
];

export default function DnaPage() {
  const [level] = useState(4); // Out of 10
  
  // Dynamic Data Logic: Load from saved resume sync
  const savedData = JSON.parse(localStorage.getItem('zerotohired_resume_data') || 'null');
  const skillsList = savedData?.skills?.split(',').map(s => s.trim()) || [];
  const projectsCount = savedData?.projects?.length || 0;
  const experienceCount = savedData?.experience?.length || 0;

  const dnaData = [
    { subject: 'Technical', A: skillsList.length > 5 ? 95 : (skillsList.length > 0 ? 75 : 30), fullMark: 100 },
    { subject: 'Creativity', A: projectsCount > 0 ? 90 : 40, fullMark: 100 },
    { subject: 'Consistency', A: experienceCount > 0 ? 85 : 30, fullMark: 100 },
    { subject: 'Potential', A: 99, fullMark: 100 },
    { subject: 'Soft Skills', A: 80, fullMark: 100 },
    { subject: 'Industry', A: 75, fullMark: 100 },
  ];

  const firstName = savedData?.name ? savedData.name.split(' ')[0] : null;
  const profileSummary = savedData?.summary || "Strong technical foundation, loves creating systems and architectural puzzles.";

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Your Unique Career DNA <Dna className="inline h-10 w-10 text-[var(--primary)] -mt-2" /></h1>
        <p className="text-[var(--text-secondary)] text-lg">Based on AI analysis of your resume and background.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-16">
        {/* HUGE DNA CARD */}
        <div className="lg:col-span-8">
          <Card className="h-full border-[var(--primary)] shadow-[0_0_30px_rgba(124,58,237,0.15)] relative overflow-hidden p-0">
            {/* Header part */}
            <div className="bg-[var(--card-hover)] p-6 border-b border-[var(--primary)]/20 flex justify-between items-center">
              <div className="flex justify-center items-center gap-2 font-bold tracking-widest text-[var(--text-secondary)]">
                <Dna className="h-5 w-5" /> RESUME DNA PROFILE
              </div>
              <div className="font-mono text-sm bg-black/50 px-3 py-1 rounded-md text-[var(--primary)] border border-[var(--primary)]/30">
                ZTH-DNA-9F2A4X
              </div>
            </div>

            <div className="p-6 md:p-10 grid lg:grid-cols-12 gap-12 items-center bg-[var(--background)] relative min-h-[500px]">
              
              {/* Left Side: Advanced DNA Visual */}
              <div className="lg:col-span-5 relative flex justify-center items-center">
                <div className="absolute inset-0 bg-[var(--primary)]/5 rounded-full blur-[80px] scale-150 animate-pulse"></div>
                
                {/* 3D-ish DNA Helix Animation */}
                <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 border border-white/5 rounded-full rotate-45"></div>
                  
                  {/* The DNA Core */}
                  <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          x: [ -30, 30, -30 ],
                          opacity: [ 0.3, 1, 0.3 ],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: i * 0.3
                        }}
                        className="w-full flex justify-between items-center px-6"
                      >
                         <div className={`w-2.5 h-2.5 rounded-full bg-[var(--primary)] shadow-[0_0_15px_var(--primary)]`}></div>
                         <div className="flex-1 h-0.5 bg-gradient-to-r from-[var(--primary)] to-blue-500 opacity-20 mx-2"></div>
                         <div className={`w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]`}></div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Floating Data Nodes */}
                  <motion.div 
                    animate={{ y: [-10, 10, -10], rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4 p-3 bg-[var(--card)] border border-[var(--primary)]/30 rounded-xl shadow-xl z-20"
                  >
                    <Sparkles className="text-yellow-500 h-5 w-5" />
                  </motion.div>
                </div>
              </div>

              {/* Right Side: Radar Chart + Personality */}
              <div className="lg:col-span-7 space-y-8 relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Radar Display */}
                  <div className="h-[220px] w-full max-w-[220px] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dnaData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                          name="Student"
                          dataKey="A"
                          stroke="var(--primary)"
                          strokeWidth={2}
                          fill="var(--primary)"
                          fillOpacity={0.4}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="text-center md:text-left">
                    <h2 className="text-4xl font-black italic tracking-tight text-white mb-2 leading-none uppercase">
                      {firstName ? `${firstName}'s Profile` : "THE BUILDER"} <span className="text-2xl">🔨</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs line-clamp-2">
                       "{profileSummary}"
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[var(--card)] p-4 rounded-xl border border-white/5 shadow-inner hover:border-[var(--primary)]/30 transition-colors group">
                    <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider block mb-2 opacity-70">Roles</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Architect", "AI lead"].map(role => (
                        <span key={role} className="text-white font-bold bg-white/5 px-2 py-0.5 rounded text-[10px]">{role}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[var(--card)] p-4 rounded-xl border border-white/5 shadow-inner hover:border-[var(--primary)]/30 transition-colors group">
                    <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider block mb-1 opacity-70">Superpower</span>
                    <span className="text-white font-black text-sm tracking-tight group-hover:text-[var(--primary)] transition-colors">Architectural Vision</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer metrics */}
            <div className="bg-[var(--gradient-card)] p-6 md:px-10 border-t border-[var(--primary)]/20 text-sm">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                 <div className="flex-1">
                   <div className="flex justify-between font-bold mb-2">
                     <span>Uniqueness Score</span>
                     <span className="text-[var(--primary)]">94/100</span>
                   </div>
                   <div className="w-full bg-black/50 rounded-full h-2 mb-2 border border-white/5">
                     <div className="bg-[var(--gradient)] h-2 rounded-full" style={{ width: '94%' }}></div>
                   </div>
                   <p className="text-xs text-[var(--text-secondary)]">Your skill combination is rarer than 94% of candidates</p>
                 </div>
                 <div className="flex-1 space-y-3">
                   <div className="flex items-start gap-2 text-yellow-400">
                     <Sparkles className="h-5 w-5 shrink-0" />
                     <div>
                       <span className="font-bold block text-sm">Rare Combination Detected:</span>
                       <span className="text-xs text-yellow-500">AI + UX Design — only 6% have both</span>
                     </div>
                   </div>
                   <div className="flex items-start gap-2 text-[var(--warning)]">
                     <TriangleAlert className="h-5 w-5 shrink-0" />
                     <div>
                       <span className="font-bold block text-sm">DNA Weakness:</span>
                       <span className="text-xs opacity-80">Missing: Leadership experience. Try leading a team project.</span>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Level System */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="flex-1 flex flex-col border-[var(--primary)]/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><Trophy className="h-5 w-5 text-yellow-500"/> Resume Level</h2>
              <span className="bg-yellow-500 text-black font-black px-3 py-1 rounded-full text-sm">LEVEL {level}</span>
            </div>
            
            <div className="mb-6 relative">
              <div className="flex justify-between text-xs text-[var(--text-secondary)] font-bold mb-2">
                <span>LVL 1</span>
                <span>LVL 5</span>
                <span>LVL 10</span>
              </div>
              <div className="h-4 bg-[var(--background)] rounded-full border border-white/10 overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(level/10)*100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute top-0 left-0 h-full bg-[var(--gradient)]"
                ></motion.div>
                {/* Checkpoints */}
                <div className="absolute top-0 left-1/2 w-px h-full bg-white/30"></div>
              </div>
              <p className="text-center font-bold text-[var(--primary)] mt-3">⚡ Rising Candidate</p>
            </div>

            <div className="bg-[var(--background)] border border-white/5 rounded-xl p-4 flex-1">
              <p className="text-sm font-semibold mb-3">Complete 2 more actions to reach Level 5!</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-white/50"><CheckCircle className="h-4 w-4 text-[var(--success)]"/> <span>Basic info added</span></li>
                <li className="flex items-center gap-2 text-white/50"><CheckCircle className="h-4 w-4 text-[var(--success)]"/> <span>DNA Generated</span></li>
                <li className="flex items-center gap-2"><div className="h-4 w-4 rounded-full border border-dashed border-[var(--text-secondary)]"></div> <span>Optimize skills</span></li>
                <li className="flex items-center gap-2"><div className="h-4 w-4 rounded-full border border-dashed border-[var(--text-secondary)]"></div> <span>Achieve 75+ ATS Score</span></li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      {/* Achievement Badges */}
      <h2 className="text-2xl font-bold mb-6">Achievement Showcase</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <Card 
            key={badge.id} 
            className={`p-5 flex flex-col items-center text-center transition-all ${
              badge.unlocked 
                ? 'border-[var(--primary)]/50 bg-[var(--card)] hover:border-[var(--primary)] shadow-[0_4px_20px_rgba(124,58,237,0.1)]' 
                : 'border-white/5 bg-[var(--background)] opacity-60 grayscale'
            }`}
          >
            <div className="text-4xl mb-3 relative">
              {badge.icon}
              {!badge.unlocked && (
                <div className="absolute -bottom-1 -right-1 bg-[var(--background)] rounded-full p-1 border border-white/20">
                  <Lock className="h-3 w-3 text-white/50" />
                </div>
              )}
            </div>
            <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
            <p className="text-xs text-[var(--text-secondary)]">{badge.desc}</p>
          </Card>
        ))}
      </div>
      
    </div>
  );
}
