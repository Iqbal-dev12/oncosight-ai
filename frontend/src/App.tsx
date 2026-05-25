import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UploadScan from './components/UploadScan';
import AIPredictions from './components/AIPredictions';
import Reports from './components/Reports';
import Patients from './components/Patients';
import BackgroundEffects from './components/BackgroundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedScan, setSelectedScan] = useState<string | null>(null);
  const [scanType, setScanType] = useState<'mri' | 'ct' | 'xray' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number>(94);
  const [probability, setProbability] = useState<number>(88);

  const handleScanSelected = (scanUrl: string, type: 'mri' | 'ct' | 'xray') => {
    setSelectedScan(scanUrl);
    setScanType(type);
    setAnalysisComplete(false);
    setIsAnalyzing(false);

    if (type === 'mri') {
      setConfidence(94);
      setProbability(88);
    } else if (type === 'ct') {
      setConfidence(96);
      setProbability(92);
    } else {
      setConfidence(89);
      setProbability(72);
    }
  };

  const handleNavigateToPredictions = () => {
    setActiveTab('predictions');
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-sans text-white select-none">
      {/* Background shaders & particle system */}
      <BackgroundEffects />

      {/* Top Header */}
      <Header />

      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace Frame (offset by Header and Sidebar) */}
      <main className="pl-64 pt-14 min-h-screen relative z-10 w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard 
                onNavigateToTab={setActiveTab} 
              />
            </motion.div>
          )}

          {activeTab === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <UploadScan
                onScanSelected={handleScanSelected}
                isAnalyzing={isAnalyzing}
                setIsAnalyzing={setIsAnalyzing}
                analysisComplete={analysisComplete}
                setAnalysisComplete={setAnalysisComplete}
                selectedScan={selectedScan}
                scanType={scanType}
                confidence={confidence}
                setConfidence={setConfidence}
                onNavigateToPredictions={handleNavigateToPredictions}
              />
            </motion.div>
          )}

          {activeTab === 'predictions' && (
            <motion.div
              key="predictions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AIPredictions
                selectedScan={selectedScan}
                scanType={scanType}
                confidence={confidence}
                probability={probability}
              />
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Reports />
            </motion.div>
          )}

          {activeTab === 'patients' && (
            <motion.div
              key="patients"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Patients />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Faint cyan ambient line at very top */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-clinicalCyan/20 z-40 pointer-events-none" />
    </div>
  );
}
