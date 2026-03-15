import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dna } from 'lucide-react';
import { Button } from '../ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Builder', path: '/builder' },
    { name: 'Tools', path: '/tools' },
    { name: 'ATS Check', path: '/ats' },
    { name: 'Skill Gap', path: '/skills' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'DNA', path: '/dna' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled ? 'bg-[var(--background)]/80 backdrop-blur-md border-[rgba(124,58,237,0.1)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <Dna className="h-8 w-8 text-[var(--primary)]" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-[var(--gradient)]">
                ZeroToHired
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden xl:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-[var(--primary)] ${location.pathname === link.path ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/builder">
                <Button variant="gradient" size="sm" className="whitespace-nowrap">Build Resume Free</Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--text-secondary)] hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-[var(--background)]/95 backdrop-blur-lg z-40 overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 rounded-xl text-base font-medium ${location.pathname === link.path ? 'bg-[rgba(124,58,237,0.1)] text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--card)] hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link to="/builder" onClick={() => setIsOpen(false)}>
                <Button variant="gradient" className="w-full">Build Resume Free</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
