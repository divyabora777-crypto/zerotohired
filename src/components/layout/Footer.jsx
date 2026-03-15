import { Link } from 'react-router-dom';
import { Dna, Github, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(124,58,237,0.1)] bg-[var(--background)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Dna className="h-8 w-8 text-[var(--primary)]" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-[var(--gradient)]">
                ZeroToHired
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] mb-6 max-w-md">
              From Confused Student to Job-Ready Professional in Minutes. The world's first AI Career DNA Platform with 3-mode resume building.
            </p>
            <p className="text-sm font-semibold text-[var(--success)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--success)] inline-block"></span>
              100% Free. No Login. No Paywall. Ever.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">Home</Link></li>
              <li><Link to="/builder" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">Resume Builder</Link></li>
              <li><Link to="/tools" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">20+ AI Tools</Link></li>
              <li><Link to="/ats" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">ATS Analyzer</Link></li>
              <li><Link to="/portfolio" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">Portfolio Generator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors bg-[var(--card)] p-3 rounded-xl border border-[rgba(124,58,237,0.2)]">
                <Github size={20} />
              </a>
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors bg-[var(--card)] p-3 rounded-xl border border-[rgba(124,58,237,0.2)]">
                <Globe size={20} />
              </a>
            </div>
            <Link to="/settings" className="text-sm text-[var(--primary)] hover:underline">
              API Settings
            </Link>
          </div>
        </div>
        
        <div className="border-t border-[rgba(124,58,237,0.1)] pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[var(--text-secondary)] text-sm mb-4 md:mb-0 text-center md:text-left">
            Built at Ignition in AI Era × NxtGenSec Hackathon 2026 | March 15-17, Hyderabad
          </p>
          <p className="text-[var(--text-secondary)] text-sm font-medium">
            &copy; {new Date().getFullYear()} ZeroToHired
          </p>
        </div>
      </div>
    </footer>
  );
}
