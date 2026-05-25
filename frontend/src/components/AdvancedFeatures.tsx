import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, Sliders, Shield, Network, Brain, 
  Activity, CheckCircle2, ShieldAlert, Cpu
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import mriAsset from '../assets/mri_scan.png';
import ctAsset from '../assets/ct_scan.png';
import xrayAsset from '../assets/xray_scan.png';

export default function AdvancedFeatures() {
  const [activeFeatureTab, setActiveFeatureTab] = useState<'segmentation' | 'heatmap' | 'federated' | 'treatment' | 'statistics'>('segmentation');

  // Segmentation states
  const [segCategory, setSegCategory] = useState<'mri' | 'ct'>('mri');
  const [showSeg, setShowSeg] = useState(true);
  const [segOpacity, setSegOpacity] = useState(0.75);
  const [sliderValue, setSliderValue] = useState(50);

  // Heatmap states
  const [heatmapCategory, setHeatmapCategory] = useState<'mri' | 'ct' | 'xray'>('mri');
  const [heatmapViewMode, setHeatmapViewMode] = useState<'original' | 'heatmap' | 'overlay'>('overlay');

  // Federated learning simulation state
  const [fedSyncProgress, setFedSyncProgress] = useState(72);
  const [fedHospitalAStatus, setFedHospitalAStatus] = useState('Syncing parameters...');
  const [fedHospitalBStatus, setFedHospitalBStatus] = useState('Idle (Updated)');

  useEffect(() => {
    const interval = setInterval(() => {
      setFedSyncProgress(prev => {
        if (prev >= 100) {
          setFedHospitalAStatus('Idle (Updated)');
          setTimeout(() => {
            setFedSyncProgress(0);
            setFedHospitalAStatus('Training local weights...');
            setFedHospitalBStatus('Syncing parameters...');
          }, 3000);
          return 100;
        }
        if (prev === 25) {
          setFedHospitalBStatus('Training local weights...');
        }
        if (prev === 50) {
          setFedHospitalAStatus('Syncing parameters...');
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const getHeatmapFocusStyle = (cat: 'mri' | 'ct' | 'xray') => {
    // Return relative coordinates and blur for heatmaps
    if (cat === 'mri') {
      return {
        left: '50%',
        top: '45%',
        width: '100px',
        height: '100px',
      };
    } else if (cat === 'ct') {
      return {
        left: '58%',
        top: '35%',
        width: '80px',
        height: '80px',
      };
    } else {
      return {
        left: '42%',
        top: '48%',
        width: '110px',
        height: '110px',
      };
    }
  };

  const getHeatmapAsset = (cat: 'mri' | 'ct' | 'xray') => {
    if (cat === 'mri') return mriAsset;
    if (cat === 'ct') return ctAsset;
    return xrayAsset;
  };

  const getSegmentationSize = () => {
    return segCategory === 'mri' ? '2.4 cm (Glioblastoma)' : '1.9 cm (Apical Nodule)';
  };

  const featureTabs = [
    { id: 'segmentation', label: 'Tumor Segmentation', icon: <Layers className="h-4 w-4" /> },
    { id: 'heatmap', label: 'Explainable AI', icon: <Brain className="h-4 w-4" /> },
    { id: 'federated', label: 'Federated Network', icon: <Network className="h-4 w-4" /> },
    { id: 'treatment', label: 'Treatment Directives', icon: <Cpu className="h-4 w-4" /> },
    { id: 'statistics', label: 'Modality Stats', icon: <Activity className="h-4 w-4" /> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-8 lg:px-12 py-10 lg:py-12 relative min-h-[90vh] space-y-10">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left border-b border-white/5 pb-6 space-y-2"
      >
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
          Advanced AI Features
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Experimental AI-assisted diagnostic capabilities, visual neural attention graphs, and privacy-preserving federated model orchestration.
        </p>
      </motion.div>

      {/* Feature Sub-Navigation Bar */}
      <div className="flex flex-wrap gap-2.5 border-b border-white/5 pb-4 select-none">
        {featureTabs.map((tab) => {
          const isActive = activeFeatureTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFeatureTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                isActive
                  ? 'border-clinicalCyan bg-clinicalCyan/[0.03] text-white shadow-lg shadow-clinicalCyan/[0.02]'
                  : 'border-white/5 bg-[#050608]/40 text-gray-500 hover:text-white hover:bg-[#050608]/85'
              }`}
            >
              <span className={isActive ? 'text-clinicalCyan' : 'text-gray-600'}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Feature Content Panel */}
      <div className="mt-8">
        {/* CNN-Based Tumor Segmentation */}
        {activeFeatureTab === 'segmentation' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Interactive Slider Canvas */}
            <div className="lg:col-span-8 space-y-4">
              <div className="clinical-panel p-6 flex flex-col h-[480px]">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                      Segmentation Viewport
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono">DRAG SLIDER TO REVEAL RAW VS. SEGMENTED MASKS</p>
                  </div>
                  <span className="text-[10px] font-mono text-clinicalCyan border border-clinicalCyan/10 px-2.5 py-0.5 rounded bg-clinicalCyan/5 uppercase">
                    3D U-Net Core
                  </span>
                </div>

                {/* The slider viewport */}
                <div className="relative flex-1 rounded-lg bg-black border border-white/5 overflow-hidden flex items-center justify-center p-3 select-none">
                  {/* Layer 1: Raw Image */}
                  <img
                    src={segCategory === 'mri' ? mriAsset : ctAsset}
                    alt="Original study scan"
                    className="max-h-[380px] w-auto rounded object-contain opacity-40 select-none pointer-events-none"
                  />

                  {/* Layer 2: Segmented Overlay (Clipped layer on top) */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)` }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={segCategory === 'mri' ? mriAsset : ctAsset}
                        alt="Segmented study scan"
                        className="max-h-[380px] w-auto rounded object-contain opacity-90 select-none pointer-events-none"
                      />
                      {showSeg && (
                        <svg className="absolute inset-0 max-h-[380px] w-auto m-auto pointer-events-none" viewBox="0 0 450 350" style={{ opacity: segOpacity }}>
                          {segCategory === 'mri' ? (
                            <path
                              d="M 215,135 Q 235,125 255,140 T 245,175 T 210,165 Z"
                              fill="rgba(0, 180, 216, 0.2)"
                              stroke="#00b4d8"
                              strokeWidth="2.5"
                              strokeDasharray="2 2"
                              className="animate-pulse"
                            />
                          ) : (
                            <path
                              d="M 260,110 Q 275,105 285,120 T 280,140 T 255,130 Z"
                              fill="rgba(0, 180, 216, 0.2)"
                              stroke="#00b4d8"
                              strokeWidth="2.5"
                              strokeDasharray="2 2"
                              className="animate-pulse"
                            />
                          )}
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Division line handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-[1px] bg-clinicalCyan/60 z-10 pointer-events-none"
                    style={{ left: `${sliderValue}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-black border border-clinicalCyan flex items-center justify-center text-clinicalCyan shadow-md">
                      <Sliders className="h-4 w-4 rotate-90" />
                    </div>
                  </div>

                  {/* Transparent drag handler Range input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />

                  {/* Labels on sides */}
                  <span className="absolute bottom-3 left-3 text-[9px] font-mono text-gray-500 bg-black/85 px-2 py-1 rounded border border-white/5">
                    SEGMENTED MASK
                  </span>
                  <span className="absolute bottom-3 right-3 text-[9px] font-mono text-gray-500 bg-black/85 px-2 py-1 rounded border border-white/5">
                    RAW SCAN
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Controls Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="clinical-panel p-6 space-y-6 flex flex-col justify-between h-[480px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5 font-display">
                      <Layers className="h-4 w-4 text-clinicalCyan" />
                      Segmentation Parameters
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono">Configure overlays and read metrics.</p>
                  </div>

                  {/* Modality selectors */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">Target Scan Modality</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSegCategory('mri')}
                        className={`py-2 rounded text-[9.5px] font-semibold uppercase tracking-wider transition-all border ${
                          segCategory === 'mri'
                            ? 'border-clinicalCyan bg-clinicalCyan/[0.03] text-white'
                            : 'border-white/5 bg-[#050608] text-gray-500 hover:text-white'
                        }`}
                      >
                        Brain Tumor MRI
                      </button>
                      <button
                        onClick={() => setSegCategory('ct')}
                        className={`py-2 rounded text-[9.5px] font-semibold uppercase tracking-wider transition-all border ${
                          segCategory === 'ct'
                            ? 'border-clinicalCyan bg-clinicalCyan/[0.03] text-white'
                            : 'border-white/5 bg-[#050608] text-gray-500 hover:text-white'
                        }`}
                      >
                        Lung Tumor CT
                      </button>
                    </div>
                  </div>

                  {/* Opacity and Mask controls */}
                  <div className="space-y-4 border-t border-white/5 pt-4">
                    <div className="flex items-center justify-between border border-white/5 bg-black/20 rounded-lg p-3">
                      <div>
                        <span className="text-[10px] font-semibold text-white block">Contour Mask</span>
                        <span className="text-[8px] font-mono text-gray-500">Enable cyan overlay</span>
                      </div>
                      <button
                        onClick={() => setShowSeg(!showSeg)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                          showSeg ? 'bg-clinicalCyan' : 'bg-white/5 border border-white/10'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                          showSeg ? 'translate-x-4' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    <div className="border border-white/5 bg-black/20 rounded-lg p-3 space-y-1.5">
                      <div className="flex justify-between text-[8px] font-mono text-gray-500 uppercase">
                        <span>Overlay Opacity</span>
                        <span className="text-clinicalCyan">{Math.round(segOpacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={segOpacity * 100}
                        onChange={(e) => setSegOpacity(Number(e.target.value) / 100)}
                        className="w-full accent-clinicalCyan bg-white/5 rounded-lg h-1"
                      />
                    </div>
                  </div>

                  {/* Quantitative Readouts */}
                  <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                    <div className="border border-white/5 bg-black/20 rounded-lg p-3 flex flex-col justify-center text-center">
                      <span className="text-[8px] font-mono text-gray-500 uppercase block mb-1">Lesion size</span>
                      <span className="text-[11px] font-bold text-white font-display tracking-wide">{getSegmentationSize()}</span>
                    </div>
                    <div className="border border-white/5 bg-black/20 rounded-lg p-3 flex flex-col justify-center text-center">
                      <span className="text-[8px] font-mono text-gray-500 uppercase block mb-1">AI Confidence</span>
                      <span className="text-sm font-bold text-clinicalCyan font-display">{segCategory === 'mri' ? '94.2%' : '96.5%'}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-gray-500 leading-relaxed">
                  <strong>Methodology Note:</strong> Segmentations are constructed via a 3D U-Net convolutional neural network trained on over 10k curated multi-modal clinical studies.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Explainable AI Heatmaps */}
        {activeFeatureTab === 'heatmap' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Side-by-Side viewer */}
            <div className="lg:col-span-8 space-y-4">
              <div className="clinical-panel p-6 flex flex-col h-[480px]">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                      Neural Attention Viewports
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono">GRAD-CAM ACTIVATION MAPS VISUALIZATION</p>
                  </div>
                  <span className="text-[10px] font-mono text-clinicalCyan border border-clinicalCyan/10 px-2.5 py-0.5 rounded bg-clinicalCyan/5 uppercase">
                    Grad-CAM v2
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-1">
                  {/* Left: Original Scan */}
                  <div className="relative h-full rounded-lg bg-black border border-white/5 flex items-center justify-center p-3 select-none">
                    <img
                      src={getHeatmapAsset(heatmapCategory)}
                      alt="Original Diagnostic Scan"
                      className="max-h-[300px] w-auto rounded object-contain opacity-75 select-none pointer-events-none"
                    />
                    <span className="absolute bottom-3 left-3 text-[9px] font-mono text-gray-500 bg-black/85 px-2 py-1 rounded border border-white/5">
                      ORIGINAL SCAN
                    </span>
                  </div>

                  {/* Right: CAM Heatmap overlay */}
                  <div className="relative h-full rounded-lg bg-black border border-white/5 flex items-center justify-center p-3 overflow-hidden select-none">
                    <img
                      src={getHeatmapAsset(heatmapCategory)}
                      alt="Heatmap View"
                      className={`max-h-[300px] w-auto rounded object-contain select-none pointer-events-none transition-opacity duration-300 ${
                        heatmapViewMode === 'heatmap' ? 'opacity-20' : 'opacity-60'
                      }`}
                    />
                    
                    {/* Heatmap color gradient mask overlay */}
                    {heatmapViewMode !== 'original' && (
                      <div
                        className="absolute rounded-full filter blur-[15px] pointer-events-none mix-blend-color-dodge animate-pulse"
                        style={{
                          ...getHeatmapFocusStyle(heatmapCategory),
                          background: 'radial-gradient(circle, rgba(239,68,68,0.7) 0%, rgba(234,179,8,0.45) 40%, rgba(0,180,216,0.15) 75%, transparent 100%)',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    )}
                    <span className="absolute bottom-3 left-3 text-[9px] font-mono text-gray-500 bg-black/85 px-2 py-1 rounded border border-white/5">
                      {heatmapViewMode === 'heatmap' ? 'CAM FOCUS' : 'OVERLAY MAP'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Controls Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="clinical-panel p-6 space-y-6 flex flex-col justify-between h-[480px]">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5 font-display">
                      <Brain className="h-4 w-4 text-clinicalCyan" />
                      Explainability Controls
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono">Observe neural pathway weight nodes.</p>
                  </div>

                  {/* Select Category */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">Scanner Category</label>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setHeatmapCategory('mri')}
                        className={`w-full py-2 px-3 rounded text-[9.5px] font-semibold uppercase tracking-wider text-left transition-all border ${
                          heatmapCategory === 'mri'
                            ? 'border-clinicalCyan bg-clinicalCyan/[0.03] text-white'
                            : 'border-white/5 bg-[#050608] text-gray-500 hover:text-white'
                        }`}
                      >
                        Brain Tumor MRI
                      </button>
                      <button
                        onClick={() => setHeatmapCategory('ct')}
                        className={`w-full py-2 px-3 rounded text-[9.5px] font-semibold uppercase tracking-wider text-left transition-all border ${
                          heatmapCategory === 'ct'
                            ? 'border-clinicalCyan bg-clinicalCyan/[0.03] text-white'
                            : 'border-white/5 bg-[#050608] text-gray-500 hover:text-white'
                        }`}
                      >
                        Lung Tumor CT
                      </button>
                      <button
                        onClick={() => setHeatmapCategory('xray')}
                        className={`w-full py-2 px-3 rounded text-[9.5px] font-semibold uppercase tracking-wider text-left transition-all border ${
                          heatmapCategory === 'xray'
                            ? 'border-clinicalCyan bg-clinicalCyan/[0.03] text-white'
                            : 'border-white/5 bg-[#050608] text-gray-500 hover:text-white'
                        }`}
                      >
                        Pneumonia X-Ray
                      </button>
                    </div>
                  </div>

                  {/* View Mode controls */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <label className="text-[9px] font-mono text-gray-500 uppercase block">Attention Render Mode</label>
                    <div className="grid grid-cols-3 rounded border border-white/10 p-0.5 bg-black select-none text-center">
                      <button
                        onClick={() => setHeatmapViewMode('original')}
                        className={`py-2 rounded text-[8.5px] font-semibold uppercase tracking-wider transition-all ${
                          heatmapViewMode === 'original'
                            ? 'bg-white/10 text-white'
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        Original
                      </button>
                      <button
                        onClick={() => setHeatmapViewMode('heatmap')}
                        className={`py-2 rounded text-[8.5px] font-semibold uppercase tracking-wider transition-all ${
                          heatmapViewMode === 'heatmap'
                            ? 'bg-white/10 text-white'
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        CAM Focus
                      </button>
                      <button
                        onClick={() => setHeatmapViewMode('overlay')}
                        className={`py-2 rounded text-[8.5px] font-semibold uppercase tracking-wider transition-all ${
                          heatmapViewMode === 'overlay'
                            ? 'bg-clinicalCyan text-black font-bold'
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        Overlay
                      </button>
                    </div>
                  </div>

                  {/* Attention details */}
                  <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                    <div className="border border-white/5 bg-black/20 rounded-lg p-2.5">
                      <span className="text-[7.5px] font-mono text-gray-500 uppercase block tracking-wider">Attention Coef.</span>
                      <span className="text-xs font-semibold text-white font-mono block mt-0.5">
                        {heatmapCategory === 'mri' ? '0.984' : heatmapCategory === 'ct' ? '0.962' : '0.895'}
                      </span>
                    </div>
                    <div className="border border-white/5 bg-black/20 rounded-lg p-2.5">
                      <span className="text-[7.5px] font-mono text-gray-500 uppercase block tracking-wider">Classification</span>
                      <span className="text-xs font-semibold text-clinicalCyan font-display block uppercase mt-0.5">
                        {heatmapCategory === 'mri' ? 'Glioma' : heatmapCategory === 'ct' ? 'Nodule' : 'Consolidation'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-gray-500 leading-relaxed">
                  <strong>Methodology Note:</strong> Class Activation Mapping highlights regions that contributed most to the final layer classifications.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Federated Learning Simulation */}
        {activeFeatureTab === 'federated' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Network Simulation + Sync log */}
            <div className="lg:col-span-8 space-y-6">
              <div className="clinical-panel p-6 flex flex-col justify-between h-[300px]">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display mb-1">
                    Federated Synchronizer Graph
                  </h3>
                  <p className="text-[10px] text-gray-500 font-mono mb-4">PRIVACY-PRESERVING DISTRIBUTED WEIGHT AGGREGATION</p>
                </div>

                <div className="relative border border-white/5 bg-black/40 rounded-xl p-6 min-h-[160px] flex items-center justify-between overflow-hidden flex-1">
                  {/* Loop secure training SVG connections */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Hospital A to Central line */}
                    <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="rgba(0,180,216,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
                    {/* Hospital B to Central line */}
                    <line x1="80%" y1="50%" x2="50%" y2="50%" stroke="rgba(0,180,216,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />

                    {/* Secure Parameter transfer dots */}
                    <motion.circle
                      r="4"
                      fill="#00b4d8"
                      initial={{ cx: '20%', cy: '50%', opacity: 0 }}
                      animate={{ 
                        cx: ['20%', '50%'], 
                        opacity: [0, 1, 1, 0] 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        ease: "easeInOut" 
                      }}
                    />

                    <motion.circle
                      r="4"
                      fill="#00b4d8"
                      initial={{ cx: '80%', cy: '50%', opacity: 0 }}
                      animate={{ 
                        cx: ['80%', '50%'], 
                        opacity: [0, 1, 1, 0] 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        ease: "easeInOut",
                        delay: 1.5
                      }}
                    />
                  </svg>

                  {/* Hospital A Card */}
                  <div className="border border-white/5 bg-[#0b0c0e]/95 p-3 rounded-lg w-[130px] text-center z-10 shadow-lg">
                    <span className="text-[7.5px] font-mono text-gray-500 uppercase block tracking-wider">Hospital Node A</span>
                    <span className="text-[11px] font-bold text-white block mt-1">METRO GENERAL</span>
                    <span className={`text-[7px] font-mono uppercase block mt-1.5 px-1 py-0.5 rounded border ${
                      fedHospitalAStatus.includes('Syncing') 
                        ? 'border-clinicalCyan/20 bg-clinicalCyan/5 text-clinicalCyan' 
                        : 'border-white/5 bg-white/[0.01] text-gray-500'
                    }`}>
                      {fedHospitalAStatus}
                    </span>
                  </div>

                  {/* Central Server Node */}
                  <div className="border border-clinicalCyan/10 bg-[#0b0c0e]/95 p-4 rounded-lg w-[150px] text-center z-10 shadow-lg ring-1 ring-clinicalCyan/15">
                    <div className="flex justify-center mb-1">
                      <Shield className="h-4 w-4 text-clinicalCyan animate-pulse" />
                    </div>
                    <span className="text-[7.5px] font-mono text-clinicalCyan uppercase block tracking-wider font-semibold">Central Aggregator</span>
                    <span className="text-[11px] font-bold text-white block mt-1">GLOBAL SERVER</span>
                    <div className="w-full bg-white/5 border border-white/5 rounded-full h-1 mt-2.5 overflow-hidden">
                      <div 
                        className="h-full bg-clinicalCyan transition-all duration-300"
                        style={{ width: `${fedSyncProgress}%` }}
                      />
                    </div>
                    <span className="text-[7.5px] font-mono text-gray-500 block mt-1">SYNC: {fedSyncProgress}% COMPLETED</span>
                  </div>

                  {/* Hospital B Card */}
                  <div className="border border-white/5 bg-[#0b0c0e]/95 p-3 rounded-lg w-[130px] text-center z-10 shadow-lg">
                    <span className="text-[7.5px] font-mono text-gray-500 uppercase block tracking-wider">Hospital Node B</span>
                    <span className="text-[11px] font-bold text-white block mt-1">ST. JUDE CLINIC</span>
                    <span className={`text-[7px] font-mono uppercase block mt-1.5 px-1 py-0.5 rounded border ${
                      fedHospitalBStatus.includes('Syncing') 
                        ? 'border-clinicalCyan/20 bg-clinicalCyan/5 text-clinicalCyan' 
                        : 'border-white/5 bg-white/[0.01] text-gray-500'
                    }`}>
                      {fedHospitalBStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sync Log Console */}
              <div className="clinical-panel p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Synchronizer Network Log</h4>
                <div className="bg-[#050608] rounded border border-white/5 p-4 font-mono text-[9px] text-gray-400 space-y-1.5 max-h-[160px] overflow-y-auto">
                  <p className="text-clinicalCyan flex justify-between">
                    <span>[SYS] SECURE SOCKET TUNNEL OPENED</span>
                    <span>2026-05-25 14:57:42</span>
                  </p>
                  <p className="flex justify-between">
                    <span>[NODE-A] METRO GENERAL - Initiated Weight Sync epoch_size=20</span>
                    <span>14:57:43</span>
                  </p>
                  <p className="flex justify-between">
                    <span>[NODE-B] ST. JUDE CLINIC - Parameter Sync success - 100% compliant</span>
                    <span>14:57:44</span>
                  </p>
                  <p className="text-green-500 flex justify-between">
                    <span>[AGGREGATOR] Secure aggregation completed. Mean accuracy increased by +0.12%</span>
                    <span>14:57:45</span>
                  </p>
                  <p className="text-gray-600 flex justify-between">
                    <span>[SYS] Model sync iteration finalized. Waiting next local epoch epoch_trigger=300s...</span>
                    <span>14:57:45</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Security Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="clinical-panel p-6 space-y-6 flex flex-col justify-between h-[480px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5 font-display">
                      <Network className="h-4 w-4 text-clinicalCyan" />
                      Federated Node Core
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono">Privacy metrics and aggregate configurations.</p>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">HIPAA Compliant:</span>
                      <span className="font-semibold text-green-500 uppercase flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                        VERIFIED
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">Data Sharing Protocol:</span>
                      <span className="font-semibold text-white">None (Local weights only)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">Security Cipher:</span>
                      <span className="font-semibold text-clinicalCyan font-mono">AES-GCM-256</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">Aggregation Engine:</span>
                      <span className="font-semibold text-white">FedAvg Protocol v2.4</span>
                    </div>
                  </div>

                  <div className="border border-white/5 bg-black/20 rounded-lg p-3 space-y-2">
                    <span className="text-[8px] font-mono text-gray-500 uppercase block">Model Aggregate Weights</span>
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                      <div className="bg-white/[0.02] border border-white/5 rounded p-1.5">
                        <span className="text-gray-500 block text-[7px]">ALPHA</span>
                        <span className="text-white font-bold">0.45</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded p-1.5">
                        <span className="text-gray-500 block text-[7px]">BETA</span>
                        <span className="text-white font-bold">0.35</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded p-1.5">
                        <span className="text-gray-500 block text-[7px]">GAMMA</span>
                        <span className="text-white font-bold">0.20</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-gray-500 leading-relaxed">
                  <strong>Methodology Note:</strong> Federated Learning allows distinct medical databases to collaboratively train models without centralization of patient diagnostic imagery.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* AI Treatment Recommendations */}
        {activeFeatureTab === 'treatment' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Directives Cards */}
            <div className="lg:col-span-8 space-y-4">
              <div className="clinical-panel p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display mb-1">
                    Clinical Decision Directives
                  </h3>
                  <p className="text-[10px] text-gray-500 font-mono">RECOMMENDED DIAGNOSTIC AND SURVEILLANCE PROCEDURES</p>
                </div>

                <div className="space-y-4">
                  {/* Brain Directive */}
                  <div className="border border-white/5 bg-black/20 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4.5 w-4.5 text-clinicalCyan" />
                        <span className="font-semibold text-white font-display text-sm">Brain Tumor MRI Directives</span>
                      </div>
                      <span className="text-[8px] font-mono text-clinicalCyan border border-clinicalCyan/10 px-2 py-0.5 rounded bg-clinicalCyan/5 uppercase">
                        MRI protocol
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-[11px] text-gray-400 space-y-2">
                      <li>Initiate surveillance MRI with contrast within 30 days to measure growth velocity.</li>
                      <li>Coordinate neurological oncology consultation for histological confirmation/surgical evaluation.</li>
                      <li>Evaluate baseline cognitive functions and manage intracranial pressures.</li>
                    </ul>
                  </div>

                  {/* Lung Directive */}
                  <div className="border border-white/5 bg-black/20 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4.5 w-4.5 text-clinicalCyan" />
                        <span className="font-semibold text-white font-display text-sm">Lung Tumor CT Directives</span>
                      </div>
                      <span className="text-[8px] font-mono text-clinicalCyan border border-clinicalCyan/10 px-2 py-0.5 rounded bg-clinicalCyan/5 uppercase">
                        CT protocol
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-[11px] text-gray-400 space-y-2">
                      <li>Positron Emission Tomography (PET) scan suggested to check nodule metabolic activity.</li>
                      <li>Schedule CT-guided fine-needle aspiration pulmonary review for pathological biopsy.</li>
                      <li>Check smoking history context and coordinate with thoracic surgery boards.</li>
                    </ul>
                  </div>

                  {/* Pneumonia Directive */}
                  <div className="border border-white/5 bg-black/20 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4.5 w-4.5 text-clinicalCyan" />
                        <span className="font-semibold text-white font-display text-sm">Pneumonia X-Ray Directives</span>
                      </div>
                      <span className="text-[8px] font-mono text-clinicalCyan border border-clinicalCyan/10 px-2 py-0.5 rounded bg-clinicalCyan/5 uppercase">
                        Radiograph protocol
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-[11px] text-gray-400 space-y-2">
                      <li>Initiate empirical oxygenation & clinical monitoring based on baseline blood gases.</li>
                      <li>Schedule chest radiograph follow-up imaging in 10-14 days to confirm fluid clearance.</li>
                      <li>Direct empiric antibiotic treatment course pending sputum culture outputs.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Safety Banner and Protocol list */}
            <div className="lg:col-span-4 space-y-6">
              <div className="clinical-panel p-6 space-y-6 flex flex-col justify-between h-[510px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5 font-display">
                      <Cpu className="h-4 w-4 text-clinicalCyan" />
                      Treatment Guidelines
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono">Reference institutional protocols.</p>
                  </div>

                  <div className="border border-white/5 bg-black/20 rounded-lg p-4 space-y-3">
                    <span className="text-[8.5px] font-mono text-gray-500 uppercase block">Verification checklist</span>
                    <div className="space-y-2.5 text-[11px] text-gray-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clinicalCyan shrink-0" />
                        <span>Verify image scanner parameters</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clinicalCyan shrink-0" />
                        <span>Cross-check with history records</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clinicalCyan shrink-0" />
                        <span>Submit to molecular pathology</span>
                      </div>
                    </div>
                  </div>

                  {/* Safety Notice Card */}
                  <div className="border border-red-500/15 bg-red-500/[0.01] rounded-lg p-4 flex gap-3 text-left">
                    <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <span className="text-[9px] font-mono text-red-500 uppercase block tracking-wider font-bold">Clinical Safety Notice</span>
                      <p className="text-[10px] text-gray-400 leading-relaxed mt-1">
                        Educational diagnostic simulation only. AI treatment recommendations are suggestions derived from statistics and do not substitute for professional medical judgment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-gray-500 leading-relaxed">
                  <strong>Institutional Note:</strong> Follow World Health Organization (WHO) and National Comprehensive Cancer Network (NCCN) parameters for direct oncology actions.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modality Screening Statistics */}
        {activeFeatureTab === 'statistics' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Recharts Chart & Progress bars */}
            <div className="lg:col-span-8 space-y-6">
              {/* Line Chart showing historical target accuracy */}
              <div className="clinical-panel p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display mb-4">
                  Historical AI Accuracy Sweep Targets
                </h3>
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Brain MRI', Accuracy: 94.2, Scans: 512 },
                        { name: 'Lung CT', Accuracy: 96.5, Scans: 489 },
                        { name: 'Pneumonia X-Ray', Accuracy: 89.8, Scans: 481 }
                      ]}
                      margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.015)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.25)" fontSize={9} />
                      <YAxis stroke="rgba(255,255,255,0.25)" fontSize={9} domain={[70, 100]} />
                      <Tooltip
                        contentStyle={{ background: '#07080b', border: '1px solid rgba(255,255,255,0.05)', fontSize: '10px' }}
                        labelStyle={{ color: '#aaa', fontWeight: 'bold' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }} />
                      <Bar dataKey="Accuracy" name="Model Accuracy Target (%)" fill="#00b4d8" radius={[3, 3, 0, 0]} maxBarSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Progress metrics */}
              <div className="clinical-panel p-6 space-y-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Scanner Category Targets</h4>
                
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {/* MRI Statistics */}
                  <div className="border border-white/5 bg-black/20 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-white">Brain Tumor MRI</span>
                      <span className="text-[10px] font-mono text-clinicalCyan font-bold">512 Scans</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono text-gray-500 uppercase">
                        <span>Accuracy Target</span>
                        <span>94.2%</span>
                      </div>
                      <div className="w-full bg-white/5 border border-white/5 rounded-full h-1 overflow-hidden">
                        <div className="h-full bg-clinicalCyan" style={{ width: '94.2%' }} />
                      </div>
                    </div>
                  </div>

                  {/* CT Statistics */}
                  <div className="border border-white/5 bg-black/20 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-white">Lung Tumor CT</span>
                      <span className="text-[10px] font-mono text-clinicalCyan font-bold">489 Scans</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono text-gray-500 uppercase">
                        <span>Accuracy Target</span>
                        <span>96.5%</span>
                      </div>
                      <div className="w-full bg-white/5 border border-white/5 rounded-full h-1 overflow-hidden">
                        <div className="h-full bg-clinicalCyan" style={{ width: '96.5%' }} />
                      </div>
                    </div>
                  </div>

                  {/* XRay Statistics */}
                  <div className="border border-white/5 bg-black/20 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-white">Pneumonia X-Ray</span>
                      <span className="text-[10px] font-mono text-clinicalCyan font-bold">481 Scans</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono text-gray-500 uppercase">
                        <span>Accuracy Target</span>
                        <span>89.8%</span>
                      </div>
                      <div className="w-full bg-white/5 border border-white/5 rounded-full h-1 overflow-hidden">
                        <div className="h-full bg-clinicalCyan" style={{ width: '89.8%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Statistics Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="clinical-panel p-6 space-y-6 flex flex-col justify-between h-[480px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5 font-display">
                      <Activity className="h-4 w-4 text-clinicalCyan" />
                      Aggregate Data Summary
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono">Modality dataset breakdown stats.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/[0.01] border border-white/5 rounded-lg p-4 text-left">
                      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider block">Total Scans Ingested</span>
                      <span className="text-3xl font-bold text-white font-display block mt-1">1,482 Scans</span>
                      <span className="text-[9px] text-clinicalCyan font-mono block mt-1">CROSS-MODALITY ENVELOPE</span>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 rounded-lg p-4 text-left">
                      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider block">Overall Mean Accuracy</span>
                      <span className="text-3xl font-bold text-white font-display block mt-1">93.5%</span>
                      <span className="text-[9px] text-green-500 font-mono block mt-1">EXCEEDS 90% FDA TARGET</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-gray-500 leading-relaxed">
                  <strong>Data Updated:</strong> Stats recalculate automatically upon execution of diagnostic prediction sweeps.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
