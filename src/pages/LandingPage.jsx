import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  CircleCheck, CircleX, FileText, Zap, Globe, Target, 
  BrainCircuit, LayoutTemplate, BriefcaseBusiness, Trophy,
  FileCheck2, Search, LineChart, Code2, MessageSquare, Award, MonitorPlay
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--card)] border border-[var(--primary)]/30 text-sm font-medium text-[var(--primary)] mb-6">
              <Trophy className="h-4 w-4" />
              Built at Ignition in AI Era Hackathon 2026
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-4">
              From Confused Student to<br />
              <span className="text-transparent bg-clip-text bg-[var(--gradient)]">
                Job-Ready Professional
              </span><br />
              in 30 Seconds
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl">
              AI builds your perfect resume, detects skill gaps, generates your unique Career DNA, 
              creates portfolio website, and prepares you for interviews — 100% FREE, no login needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/builder">
                <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                  🚀 Build My Resume Free
                </Button>
              </Link>
              <Link to="/tools">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  🧰 Explore 20 Tools
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-[var(--warning)]" /> 30 seconds</div>
              <div className="flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-[var(--primary)]" /> Unique DNA</div>
              <div className="flex items-center gap-2"><CircleCheck className="h-4 w-4 text-[var(--success)]" /> 100% Free</div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[var(--gradient)] opacity-20 blur-3xl rounded-full"></div>
            <Card className="relative p-2 bg-[var(--card)] border border-[var(--primary)]/20 shadow-2xl backdrop-blur-xl h-[400px] flex items-center justify-center overflow-hidden">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-3/4 bg-[var(--background)] rounded-lg p-6 border border-white/5 shadow-inner"
              >
                <div className="h-4 w-1/3 bg-[var(--primary)]/20 rounded mb-6"></div>
                <div className="space-y-3 mb-6">
                  <div className="h-2 w-full bg-white/5 rounded"></div>
                  <div className="h-2 w-5/6 bg-white/5 rounded"></div>
                  <div className="h-2 w-4/6 bg-white/5 rounded"></div>
                </div>
                <div className="h-4 w-1/4 bg-[var(--secondary)]/20 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                     <div className="h-6 w-16 bg-[var(--primary)]/10 rounded-full"></div>
                     <div className="h-6 w-20 bg-[var(--primary)]/10 rounded-full"></div>
                     <div className="h-6 w-14 bg-[var(--primary)]/10 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -left-6 bottom-12 bg-[var(--card)] p-3 rounded-xl border border-[var(--primary)]/30 shadow-xl flex items-center gap-2"
              >
                <BrainCircuit className="h-5 w-5 text-[var(--primary)]" />
                <div className="font-bold text-white">DNA: The Builder 🔨</div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section className="section-padding bg-[var(--background)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Sound Familiar? 😣</h2>
            <p className="text-xl text-[var(--text-secondary)]">Every student faces these problems</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
               { icon: "😕", text: "Don't know how to structure a resume" },
               { icon: "🤖", text: "Resume keeps failing ATS systems" },
               { icon: "📄", text: "Generic templates don't match the job" },
               { icon: "🌐", text: "No portfolio website to show recruiters" },
               { icon: "🕳️", text: "Don't know which skills are missing" },
               { icon: "💸", text: "Paying for tools that give generic output" }
            ].map((problem, idx) => (
              <motion.div key={idx} {...fadeIn} transition={{ delay: idx * 0.1 }}>
                <Card className="h-full flex flex-col items-center text-center p-6 bg-[var(--card)]/50 border-red-500/10 hover:border-red-500/30">
                  <div className="text-4xl mb-4">{problem.icon}</div>
                  <p className="font-medium text-[var(--text-secondary)]">{problem.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div {...fadeIn}>
            <div className="inline-block px-6 py-3 rounded-full bg-[var(--success)]/10 text-[var(--success)] font-semibold text-lg border border-[var(--success)]/20">
              ZeroToHired solves ALL of these. For free.
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: THREE INPUT MODES */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose How You Want to Start</h2>
            <p className="text-xl text-[var(--text-secondary)]">No other resume tool gives you this choice</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
              <Card className="h-full flex flex-col relative border-t-4 border-t-[var(--secondary)]">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-[var(--secondary)]" /> Tell Your Story
                  </h3>
                  <p className="text-[var(--text-secondary)]">Just talk to us naturally like a friend. No format needed. AI extracts everything automatically.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl text-sm italic text-gray-400 mb-6 flex-grow">
                  "Hi I'm Rahul, I love ML, built a fake news detector using Python, did internship at startup..."
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <span className="flex items-center gap-1 text-sm font-medium"><Zap className="h-4 w-4" /> 2 mins</span>
                  <Link to="/builder?mode=story"><Button variant="outline" size="sm">Start Talking</Button></Link>
                </div>
              </Card>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <Card className="h-full flex flex-col relative border-t-4 border-t-[var(--primary)]">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <LayoutTemplate className="h-6 w-6 text-[var(--primary)]" /> Fill The Form
                  </h3>
                  <p className="text-[var(--text-secondary)]">Structured, precise, and fast. Our AI-powered form enhances every field automatically.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl space-y-2 mb-6 flex-grow flex flex-col justify-center">
                  <div className="h-8 bg-white/10 rounded w-full"></div>
                  <div className="h-8 bg-white/10 rounded w-full"></div>
                  <div className="h-8 bg-white/10 rounded w-full"></div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <span className="flex items-center gap-1 text-sm font-medium"><Zap className="h-4 w-4" /> 3 mins</span>
                  <Link to="/builder?mode=form"><Button variant="outline" size="sm">Fill Form</Button></Link>
                </div>
              </Card>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
              <Card variant="gradient" className="h-full flex flex-col relative border border-[var(--primary)] shadow-[0_0_30px_rgba(124,58,237,0.3)] transform lg:-translate-y-4">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--primary)] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Award className="h-3 w-3" /> RECOMMENDED
                </div>
                <div className="mb-6 mt-2">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-white">
                    🔥 Story + Form
                  </h3>
                  <p className="text-[var(--text-secondary)] text-white/80">Tell your story first. We pre-fill the entire form from your story. You just confirm!</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl text-center mb-6 flex-grow flex flex-col items-center justify-center gap-2">
                  <div className="p-2 bg-[var(--background)] rounded-lg w-full text-xs">Story</div>
                  <div className="h-4 w-0.5 bg-white/30"></div>
                  <div className="p-2 bg-[var(--primary)] rounded-lg w-full text-xs font-bold text-white">Auto-filled Form</div>
                  <div className="h-4 w-0.5 bg-white/30"></div>
                  <div className="p-2 border border-white/20 rounded-lg w-full text-xs">Perfect Resume</div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/20">
                  <span className="flex items-center gap-1 text-sm font-medium text-white"><Zap className="h-4 w-4" /> 1 min</span>
                  <Link to="/builder?mode=hybrid"><Button size="sm" className="bg-white text-[var(--primary)] hover:bg-gray-100">Try Hybrid</Button></Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPETITOR COMPARISON TABLE */}
      <section className="section-padding bg-[var(--card)]/30 border-y border-[var(--primary)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why ZeroToHired Wins Every Time</h2>
            <p className="text-xl text-[var(--text-secondary)]">We studied every competitor. Here is the truth.</p>
          </motion.div>

          <motion.div {...fadeIn} className="overflow-x-auto rounded-2xl border border-[var(--primary)]/20 shadow-xl bg-[var(--background)]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[var(--card)] border-b border-[var(--primary)]/20">
                  <th className="p-4 font-semibold text-lg border-r border-white/5">Feature</th>
                  <th className="p-4 text-center font-medium opacity-60 border-r border-white/5">LinkedIn</th>
                  <th className="p-4 text-center font-medium opacity-60 border-r border-white/5">Canva</th>
                  <th className="p-4 text-center font-medium opacity-60 border-r border-white/5">Typical Builders</th>
                  <th className="p-4 text-center font-bold text-[var(--primary)] text-xl shadow-[inset_0_-2px_0_var(--primary)]">ZeroToHired</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[var(--text-secondary)]">
                {[
                  { name: "AI Resume Writing", li: "❌", ca: "❌", ty: "💰 Paid", zh: "✅ FREE" },
                  { name: "ATS Score Checker", li: "❌", ca: "❌", ty: "💰 Paid", zh: "✅ FREE" },
                  { name: "Skill Gap Detection", li: "❌", ca: "❌", ty: "❌", zh: "✅ FREE" },
                  { name: "Resume DNA Analysis", li: "❌", ca: "❌", ty: "❌", zh: "✅ FREE" },
                  { name: "Portfolio Generator", li: "❌", ca: "❌", ty: "❌", zh: "✅ FREE" },
                  { name: "PDF Download", li: "⚠️ Basic", ca: "💰 Premium", ty: "💰 Paid", zh: "✅ FREE" },
                  { name: "No Login Needed", li: "❌", ca: "❌", ty: "❌", zh: "✅ YES" },
                  { name: "Monthly Cost", li: "Free", ca: "Freemium", ty: "₹1500+", zh: "₹0 FOREVER" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white border-r border-white/5">{row.name}</td>
                    <td className="p-4 text-center border-r border-white/5">{row.li}</td>
                    <td className="p-4 text-center border-r border-white/5">{row.ca}</td>
                    <td className="p-4 text-center border-r border-white/5">{row.ty}</td>
                    <td className="p-4 text-center font-bold text-white bg-[var(--primary)]/5">{row.zh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Your Journey to Job Ready</h2>
            <p className="text-xl text-[var(--text-secondary)]">7 simple steps. 30 minutes. Life changing.</p>
          </motion.div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--primary)] before:via-[var(--secondary)] before:to-[var(--primary)]">
            {[
              { title: "Choose Your Input Mode", desc: "Storytelling, Form, or Hybrid" },
              { title: "Tell Us About Yourself", desc: "Story or form — AI extracts everything" },
              { title: "AI Builds Perfect Resume", desc: "Role-optimized, ATS-friendly in 30 seconds" },
              { title: "Get Your Resume DNA", desc: "Unique career DNA code + personality type" },
              { title: "Fix ATS Score & Skill Gaps", desc: "AI detects issues and fixes them instantly" },
              { title: "Generate Portfolio & LinkedIn", desc: "Complete professional online presence" },
              { title: "Download & Apply With Confidence", desc: "PDF resume + cover letter + interview prep" }
            ].map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--background)] bg-[var(--primary)] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                  {idx + 1}
                </div>
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] hover:border-[var(--primary)] hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                  <h4 className="text-lg font-bold mb-1 text-white">{step.title}</h4>
                  <p className="text-[var(--text-secondary)] text-sm">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: TOOLS SHOWCASE */}
      <section className="section-padding bg-[var(--card)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">20 Powerful AI Tools. All Free.</h2>
            <p className="text-xl text-[var(--text-secondary)]">No other platform gives you all of this</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { icon: "📄", name: "Resume Builder", desc: "Build from story or form" },
              { icon: "💪", name: "Bullet Enhancer", desc: "Weak sentences → powerful impact" },
              { icon: "📈", name: "Quantify AI", desc: "Add numbers to vague achievements" },
              { icon: "📊", name: "ATS Analyzer", desc: "Score out of 100 + auto-fix" },
              { icon: "🕳️", name: "Skill Gap", desc: "Find missing skills instantly" },
              { icon: "🌐", name: "Portfolio", desc: "Auto personal webpage" },
              { icon: "💼", name: "LinkedIn Gen", desc: "Headline + About + Skills" },
              { icon: "😂", name: "Resume Roaster", desc: "Brutal honest funny review" }
            ].map((tool, idx) => (
              <motion.div key={idx} {...fadeIn} transition={{ delay: idx * 0.05 }}>
                <Card className="h-full group hover:border-[var(--primary)] transition-all flex flex-col items-center text-center p-6">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <h4 className="font-bold text-white mb-1">{tool.name}</h4>
                  <p className="text-xs text-[var(--text-secondary)]">{tool.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/tools">
              <Button variant="outline" size="lg">See All 20 Tools &rarr;</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
