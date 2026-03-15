import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import DnaPage from './pages/DnaPage';
import ToolsPage from './pages/ToolsPage';
import AtsAnalyzerPage from './pages/AtsAnalyzerPage';
import SkillGapPage from './pages/SkillGapPage';
import PortfolioPage from './pages/PortfolioPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20"> {/* pt-20 to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/dna" element={<DnaPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/ats" element={<AtsAnalyzerPage />} />
            <Route path="/skills" element={<SkillGapPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
