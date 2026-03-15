import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Briefcase, Zap, LayoutTemplate, MessageSquare, PenTool } from 'lucide-react';

const creationTools = [
  { id: 1, name: "Story-to-Resume Gen", icon: <MessageSquare size={32} />, desc: "Tell your career story. We write the resume." },
  { id: 2, name: "Intelligent Form Builder", icon: <LayoutTemplate size={32} />, desc: "A fast, structured form that auto-enhances as you type." },
  { id: 3, name: "Hybrid Mode Engine", icon: <Zap size={32} className="text-yellow-400" />, desc: "Talk first, form fills automatically. The fastest way to build." },
  { id: 4, name: "Bullet Point Optimizer", icon: <PenTool size={32} />, desc: "Transforms weak tasks into powerful, metric-driven achievements." },
  { id: 5, name: "Action Verb Injector", icon: <Sparkles size={32} />, desc: "Scans your resume and replaces passive words with strong verbs." },
  { id: 6, name: "Template Matcher", icon: <Briefcase size={32} />, desc: "Automatically adjusts formatting based on your target industry." }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="text-center mb-16 pt-8">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Built Exclusively for <span className="text-[var(--primary)]">Creation</span></h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-3xl mx-auto mb-10">
          We stripped away the fluff. No confusing "advisors", no "checking", no "testing". 
          This is a pure creation engine. Every tool here is designed to do one thing: 
          Help you build the most powerful, job-winning resume imaginable in record time.
        </p>
      </div>

      {/* Creation Tools Display */}
      <h2 className="text-2xl font-bold mb-8 border-b border-[var(--primary)]/20 pb-4 inline-block">The Creation Engine Core</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {creationTools.map((tool) => (
          <Card key={tool.id} className="p-8 hover:border-[var(--primary)] transition-all bg-[var(--card)]/40 hover:bg-[var(--card)] group text-left">
            <div className="text-[var(--primary)] mb-6 bg-[var(--primary)]/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              {tool.icon}
            </div>
            <h3 className="font-bold text-xl mb-3">{tool.name}</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">{tool.desc}</p>
          </Card>
        ))}
      </div>

      {/* Templates Showcase & CTA */}
      <div className="relative py-16 px-6 sm:px-12 rounded-3xl bg-[var(--card)] border border-[var(--primary)]/20 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent pointer-events-none"></div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10">Beautiful Results. Instant Generation.</h2>
        <p className="text-xl text-[var(--text-secondary)] mb-12 relative z-10">Select your AI-crafted template and dominate the job market.</p>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-4xl mx-auto mb-12 relative z-10">
          <motion.div whileHover={{ y: -10 }} className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[var(--primary)] to-blue-600 rounded-xl opacity-0 group-hover:opacity-40 blur transition duration-500"></div>
            <img 
              src="/src/assets/resume_modern.png" 
              alt="Modern Resume Template" 
              className="relative w-full rounded-xl shadow-2xl border border-white/10 group-hover:border-[var(--primary)]/50 transition-colors"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-left rounded-b-xl border-t border-[var(--primary)]/50">
               <h3 className="font-bold text-xl mb-1">The Modern Executive</h3>
               <p className="text-sm text-gray-300">Clean, crisp, two-column layout</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="relative group mt-8 md:mt-0">
            <div className="absolute -inset-2 bg-gradient-to-r from-[var(--primary)] to-blue-600 rounded-xl opacity-0 group-hover:opacity-40 blur transition duration-500"></div>
            <img 
              src="/src/assets/resume_classic.png" 
              alt="Classic Resume Template" 
              className="relative w-full rounded-xl shadow-2xl border border-white/10 group-hover:border-[var(--primary)]/50 transition-colors"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-left rounded-b-xl border-t border-[var(--primary)]/50">
               <h3 className="font-bold text-xl mb-1">The Timeless Professional</h3>
               <p className="text-sm text-gray-300">Traditional, ATS-optimized block layout</p>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
           <h3 className="text-2xl font-bold mb-6">Are you ready to build your future?</h3>
           <Link to="/builder">
             <Button variant="gradient" size="lg" className="px-12 py-6 text-lg animate-pulse hover:animate-none">
               🚀 Yes, Build My Resume Now
             </Button>
           </Link>
        </div>
      </div>

    </div>
  );
}
