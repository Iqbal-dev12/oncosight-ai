import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Crosshair, Layers } from 'lucide-react';
import mriAsset from '../assets/mri_scan.png';
import ctAsset from '../assets/ct_scan.png';
import xrayAsset from '../assets/xray_scan.png';

interface AIPredictionsProps {
  selectedScan: string | null;
  scanType: 'mri' | 'ct' | 'xray' | null;
  confidence: number;
  probability: number;
}

export default function AIPredictions({
  selectedScan,
  scanType,
  confidence,
  probability
}: AIPredictionsProps) {
  const [showSegmented, setShowSegmented] = useState(true);

  const activeType = scanType || 'mri';
  const activeScan = selectedScan || (activeType === 'ct' ? ctAsset : activeType === 'xray' ? xrayAsset : mriAsset);
  const activeConfidence = selectedScan ? confidence : (activeType === 'mri' ? 94 : activeType === 'ct' ? 96 : 89);
  const activeProbability = selectedScan ? probability : (activeType === 'mri' ? 88 : activeType === 'ct' ? 92 : 72);

  const getScanTypeName = () => {
    if (activeType === 'mri') return 'Brain Tumor MRI Scan';
    if (activeType === 'ct') return 'Lung Tumor CT Scan';
    if (activeType === 'xray') return 'Pneumonia X-Ray Scan';
    return 'Scan';
  };

  const getDiagnosis = () => {
    if (activeType === 'mri') {
      return {
        disease: 'Glioblastoma Multiforme (GBM)',
        location: 'Left Frontal Lobe',
        size: '2.4 cm x 1.8 cm',
        stage: 'Grade IV Astrocytoma',
        risk: 'High',
        coordinates: 'X: 142.3, Y: 89.6',
        description: 'AI model detects a hyperintense lesion on T2/FLAIR scan with surrounding vasogenic edema, consistent with neoplastic expansion.'
      };
    } else if (activeType === 'ct') {
      return {
        disease: 'Bronchogenic Adenocarcinoma',
        location: 'Right Upper Lung Lobe',
        size: '1.9 cm x 2.1 cm',
        stage: 'Stage T1b N0 Mx',
        risk: 'High',
        coordinates: 'X: 204.1, Y: 154.2',
        description: 'Spiculated pulmonary nodule detected in the right apical sector, displaying central calcification anomalies.'
      };
    } else {
      return {
        disease: 'Lobar Pneumonia Consolidation',
        location: 'Bilateral Basal Lobes',
        size: '3.2 cm Area',
        stage: 'Clinical Action Required',
        risk: 'High',
        coordinates: 'X: 98.4, Y: 221.7',
        description: 'Focal alveolar consolidations resolved in the bilateral lower lung bases, displaying air bronchograms consistent with acute pneumonic inflammation.'
      };
    }
  };

  const diag = getDiagnosis();

  // Expanded Radial Gauge
  const radius = 65;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (activeProbability / 100) * circumference;

  return (
    <div className="mx-auto max-w-7xl px-8 lg:px-12 py-10 lg:py-12 relative min-h-[90vh] space-y-10">
      {/* Explicit Spacious Header */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left border-b border-white/5 pb-6 space-y-2"
      >
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
          AI Diagnostic Predictions
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Pathology probability analysis with AI-assisted visualization. Segmented bounds and coordinates resolved in real-time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Side: Probability Meter */}
        <div className="lg:col-span-5 space-y-6">
          {/* Radial score card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="clinical-panel p-6 text-center relative overflow-hidden"
          >
            <div className="absolute top-3 left-3 flex items-center gap-1 text-[8px] font-mono text-gray-600">
              <Activity className="h-3 w-3 text-clinicalCyan" />
              <span>RADAR_DIAGNOSTICS_ACTIVE</span>
            </div>

            <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-6 mt-2">
              Pathology Probability Score
            </h2>

            {/* Expanded Circular Progress Gauge */}
            <div className="relative flex justify-center items-center my-5">
              <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                <circle
                  stroke="rgba(255, 255, 255, 0.02)"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <motion.circle
                  stroke="#00b4d8"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>

              <div className="absolute text-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl font-bold text-white font-display"
                >
                  {activeProbability}%
                </motion.span>
                <p className="text-[8px] text-gray-500 font-mono tracking-widest uppercase font-semibold mt-0.5">Risk Index</p>
              </div>
            </div>

            {/* Sub-Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-6 border-t border-white/5 pt-5">
              <div className="text-left border-r border-white/5">
                <span className="text-[9px] font-mono text-gray-500 block uppercase">Ingestion Confidence</span>
                <span className="text-sm font-semibold text-clinicalCyan font-display">{activeConfidence}%</span>
              </div>
              <div className="text-left pl-4">
                <span className="text-[9px] font-mono text-gray-500 block uppercase">Critical Level</span>
                <span className="text-sm font-semibold text-red-500 flex items-center gap-1 font-display">
                  <ShieldAlert className="h-4 w-4" />
                  HIGH
                </span>
              </div>
            </div>
          </motion.div>

          {/* Finding profile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="clinical-panel p-6 space-y-4"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-clinicalCyan font-display">
              Target Diagnostic Metrics
            </h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Pathology Diagnosis:</span>
                <span className="font-semibold text-white font-display">{diag.disease}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Focus Region:</span>
                <span className="font-semibold text-white">{diag.location}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Measured Area:</span>
                <span className="font-semibold text-white font-mono">{diag.size}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Estimated Staging:</span>
                <span className="font-semibold text-clinicalCyan font-display">{diag.stage}</span>
              </div>
              
              <div className="pt-2">
                <span className="text-gray-500 text-[9px] uppercase font-mono block mb-1.5">Diagnostic Abstract</span>
                <p className="text-[11px] text-gray-400 leading-relaxed bg-[#050608] p-3 rounded border border-white/5">
                  {diag.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Image Viewport */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="clinical-panel p-6 flex flex-col min-h-[480px]"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                  {getScanTypeName()}
                </h3>
                <p className="text-[10px] text-gray-500 font-mono">RESOLVED COORDS: {diag.coordinates}</p>
              </div>
              
              {/* Seg Toggle */}
              <div className="flex rounded border border-white/10 p-0.5 bg-black">
                <button
                  onClick={() => setShowSegmented(false)}
                  className={`px-3 py-2 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${
                    !showSegmented
                      ? 'bg-white/10 text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Raw Scan
                </button>
                <button
                  onClick={() => setShowSegmented(true)}
                  className={`px-3 py-2 rounded text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                    showSegmented
                      ? 'bg-clinicalCyan text-black font-semibold'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  AI Segmentation
                </button>
              </div>
            </div>

            {/* Target Display Frame */}
            <div className="flex-1 bg-black border border-white/5 rounded-lg relative overflow-hidden flex items-center justify-center p-4">
              <img
                src={activeScan}
                alt="Diagnostics Scan Target"
                className="max-h-[350px] w-auto rounded object-contain opacity-80"
              />

              {showSegmented && (
                <div className="absolute inset-0 max-h-[350px] w-auto m-auto pointer-events-none rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-clinicalCyan/10 via-clinicalCyan/5 to-transparent mix-blend-color-dodge" />
                  
                  {/* Bounding box ring */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0.5 }}
                    animate={{ scale: [1, 1.03, 1], opacity: [0.6, 0.8, 0.6] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute border border-dashed border-clinicalCyan rounded-full bg-clinicalCyan/[0.04] shadow-[0_0_12px_rgba(0,180,216,0.3)] pointer-events-auto"
                    style={{
                      width: activeType === 'mri' ? '90px' : activeType === 'ct' ? '70px' : '100px',
                      height: activeType === 'mri' ? '90px' : activeType === 'ct' ? '70px' : '100px',
                      left: activeType === 'mri' ? '50%' : activeType === 'ct' ? '58%' : '42%',
                      top: activeType === 'mri' ? '45%' : activeType === 'ct' ? '35%' : '48%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="absolute -top-5 -left-5 bg-black/90 border border-clinicalCyan/20 rounded px-2 py-0.5 font-mono text-[7.5px] text-clinicalCyan flex items-center gap-1 shadow-md whitespace-nowrap">
                      <Crosshair className="h-2.5 w-2.5 animate-spin" style={{ animationDuration: '8s' }} />
                      <span>TARGET_ZONE</span>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Bottom metrics */}
            <div className="mt-5 grid grid-cols-3 gap-2 bg-white/[0.01] border border-white/5 rounded-lg p-3.5 text-center">
              <div>
                <span className="text-[8px] font-mono text-gray-500 block uppercase">Nodule Dimension</span>
                <span className="text-xs font-semibold text-white font-display">{diag.size}</span>
              </div>
              <div>
                <span className="text-[8px] font-mono text-gray-500 block uppercase">Region</span>
                <span className="text-xs font-semibold text-clinicalCyan font-display">{diag.location}</span>
              </div>
              <div>
                <span className="text-[8px] font-mono text-gray-500 block uppercase">Diagnostic Coordinates</span>
                <span className="text-xs font-semibold text-white font-mono">{diag.coordinates}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
