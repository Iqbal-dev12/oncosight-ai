import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Cpu, 
  History, ArrowRight, CheckCircle2, RefreshCw
} from 'lucide-react';

interface Report {
  id: string;
  patientName: string;
  patientId: string;
  dob: string;
  scanType: string;
  date: string;
  risk: 'High' | 'Elevated' | 'Low';
  confidence: string;
  findings: string;
  recommendations: string;
  dimensions: string;
  findingsArray: string[];
}

export default function Reports() {
  const [selectedReportId, setSelectedReportId] = useState('REP-0412');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const reports: Report[] = [
    {
      id: 'REP-0412',
      patientName: 'Arthur Pendelton',
      patientId: 'PT-8842',
      dob: '1974-04-12',
      scanType: 'Brain Tumor MRI (T2/FLAIR)',
      date: '2026-05-25',
      risk: 'High',
      confidence: '94.2%',
      dimensions: '2.4 cm x 1.8 cm',
      findings: 'Hyperintense neoplastic lesion identified in the left frontal lobe region, exhibiting peripheral vasogenic edema. Strong indication of high-grade glial expansion. Bounding box coordinates resolved with a confidence of 94.2%.',
      findingsArray: [
        'Hyperintense neoplastic lesion detected in left frontal lobe cortex.',
        'Vasogenic edema detected in surrounding parenchymal tissues.',
        'Midline shifts: None noted at present coordinate mapping.',
        'Vascular infiltration: Marginally elevated cerebral perfusion.'
      ],
      recommendations: 'Urgently schedule stereotactic biopsy to confirm histopathology. Recommend immediate neurosurgery consultation and contrast-enhanced post-op MRI series. Initiate dexamethasone if mass effect symptoms manifest.'
    },
    {
      id: 'REP-1089',
      patientName: 'Sarah Jenkins',
      patientId: 'PT-4109',
      dob: '1988-11-20',
      scanType: 'Lung Tumor CT Scan',
      date: '2026-05-18',
      risk: 'Elevated',
      confidence: '96.5%',
      dimensions: '1.9 cm x 2.1 cm',
      findings: 'Spiculated density nodule resolved within the right apical lobe sector. Displaying mild central calcification markers and pleural retraction cues. Risk index matches early stage adenocarcinoma pathology.',
      findingsArray: [
        'Spiculated apical nodule of 1.9 cm identified.',
        'Localized pleural retraction signs detected.',
        'Hilar lymphadenopathy: Under review, borders currently normal.',
        'Calcification: Minor eccentric calcification observed.'
      ],
      recommendations: 'Recommend chest PET/CT fusion scan to check metabolic activity inside the nodule. Schedule fine-needle lung aspiration within 7 business days. Repeat chest CT scan in 8 weeks to determine volumetric growth velocity.'
    },
    {
      id: 'REP-2154',
      patientName: 'Marcus Vance',
      patientId: 'PT-3091',
      dob: '1962-09-02',
      scanType: 'Pneumonia X-Ray',
      date: '2026-05-12',
      risk: 'Low',
      confidence: '89.8%',
      dimensions: '3.2 cm Area',
      findings: 'Alveolar consolidation resolved within the lower left lung lobe base, displaying prominent air bronchograms and fluid density shifts. No indications of neoplastic masses or pleural effusion.',
      findingsArray: [
        'Focal lobar consolidation in the left lower lung base.',
        'Air bronchograms observed, suggesting filled alveoli.',
        'Pleural spaces: clear with no active effusion.',
        'Cardiomediastinal silhouette within normal limits.'
      ],
      recommendations: 'Initiate empirical oral antibiotic therapy (e.g., azithromycin or doxycycline) matching clinical bacterial pneumonia guidelines. Schedule follow-up radiograph in 10-14 days to monitor consolidation clearance. Encourage hydration.'
    }
  ];

  const selectedReport = reports.find(r => r.id === selectedReportId) || reports[0];

  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            alert(`Report ${selectedReport.id} successfully compiled and downloaded as PDF.`);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 80);
  };

  return (
    <div className="mx-auto max-w-7xl px-8 lg:px-12 py-10 lg:py-12 relative min-h-[90vh] space-y-10">
      {/* Explicit Spacious Header */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left border-b border-white/5 pb-6 space-y-2"
      >
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
          Clinical Reports
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          AI-generated findings and diagnostic summaries. Select a case study folder on the left to inspect detailed clinical diagnostics.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Report Folder Cards */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2.5">
            Diagnostic Records Directory
          </h3>
          
          <div className="space-y-3">
            {reports.map((report) => {
              const isSelected = report.id === selectedReportId;
              const borderStyle = isSelected 
                ? 'border-clinicalCyan bg-clinicalCyan/[0.02]' 
                : 'border-white/5 bg-black/40 hover:border-white/15';

              return (
                <motion.div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  whileHover={{ x: 3 }}
                  className={`clinical-panel p-4.5 rounded-lg cursor-pointer transition-all duration-300 relative ${borderStyle}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded flex items-center justify-center border ${
                        isSelected 
                          ? 'bg-clinicalCyan/5 border-clinicalCyan/20 text-clinicalCyan' 
                          : 'bg-white/5 border-white/10 text-gray-600'
                      }`}>
                        <FileText className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white font-display">{report.patientName}</h4>
                        <span className="text-[8px] font-mono text-gray-500 block mt-0.5">{report.id} // {report.date}</span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded text-[8px] font-semibold uppercase ${
                      report.risk === 'High' 
                        ? 'bg-red-500/10 border border-red-500/20 text-red-500' 
                        : report.risk === 'Elevated'
                        ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500'
                        : 'bg-green-500/10 border border-green-500/20 text-green-500'
                    }`}>
                      {report.risk}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Premium High-Tech Report Viewer */}
        <div className="lg:col-span-8">
          <motion.div
            key={selectedReport.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="clinical-panel p-8 rounded-lg relative overflow-hidden bg-black/80 min-h-[500px] flex flex-col justify-between"
          >
            {/* Top divider */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-clinicalCyan/30 to-transparent" />

            <div>
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-6 gap-3">
                <div>
                  <div className="flex items-center gap-2 font-display text-xs font-bold tracking-wider text-white">
                    <span>ONCOSIGHT</span>
                    <span className="text-clinicalCyan">AI</span>
                    <span className="text-[8px] font-mono border border-clinicalCyan/20 rounded px-2 py-0.2 bg-clinicalCyan/5 text-clinicalCyan">
                      COMPILED
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-500 font-mono mt-1">CLINICAL DIAGNOSTICS LAB REPORT // REGISTRY: METRO_GEN</p>
                </div>

                <button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-3.5 py-2 rounded bg-white/[0.02] border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  <Download className="h-4 w-4 text-clinicalCyan" />
                  Export PDF
                </button>
              </div>

              {/* Patient Profile Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/[0.01] border border-white/5 rounded-lg p-4 mb-6">
                <div>
                  <span className="text-[7.5px] font-mono text-gray-500 uppercase block tracking-wider">Patient Name</span>
                  <span className="text-xs font-semibold text-white font-display">{selectedReport.patientName}</span>
                </div>
                <div>
                  <span className="text-[7.5px] font-mono text-gray-500 uppercase block tracking-wider">Registry ID</span>
                  <span className="text-xs font-semibold text-white font-mono">{selectedReport.patientId}</span>
                </div>
                <div>
                  <span className="text-[7.5px] font-mono text-gray-500 uppercase block tracking-wider">Date of Study</span>
                  <span className="text-xs font-semibold text-white font-mono">{selectedReport.date}</span>
                </div>
                <div>
                  <span className="text-[7.5px] font-mono text-gray-500 uppercase block tracking-wider">Methodology</span>
                  <span className="text-xs font-semibold text-clinicalCyan font-display">{selectedReport.scanType}</span>
                </div>
              </div>

              {/* Findings */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-clinicalCyan mb-3 flex items-center gap-2 font-display">
                    <Cpu className="h-4.5 w-4.5" />
                    Automated Neural Network Findings
                  </h4>
                  <p className="text-[12px] text-gray-300 leading-relaxed bg-white/[0.01] border border-white/5 rounded-lg p-4">
                    {selectedReport.findings}
                  </p>
                </div>

                {/* Bullets & Directives */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-3">Diagnostic Summary Matrix</h5>
                    <ul className="space-y-2.5 text-[12px]">
                      {selectedReport.findingsArray.map((find, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-gray-300">
                          <CheckCircle2 className="h-4.5 w-4.5 text-clinicalCyan shrink-0 mt-0.5" />
                          <span>{find}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-3">Physician Directives</h5>
                    <p className="text-[12px] text-gray-300 leading-relaxed bg-red-950/[0.01] border border-red-500/10 rounded-lg p-4">
                      {selectedReport.recommendations}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5 font-display">
                <History className="h-4.5 w-4.5 text-clinicalCyan" />
                Longitudinal Scan Timeline
              </h4>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.01] border border-white/5 rounded-lg p-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[9.5px] font-mono text-gray-500">2026-01-10</span>
                  <ArrowRight className="h-3 w-3 text-gray-600" />
                  <span className="text-[9.5px] font-mono text-green-500 font-bold">Stable (0% Risk)</span>
                </div>
                <div className="h-[1px] flex-1 bg-white/5 hidden sm:block" />
                <div className="flex items-center gap-2.5">
                  <span className="text-[9.5px] font-mono text-gray-500">2026-03-24</span>
                  <ArrowRight className="h-3 w-3 text-gray-600" />
                  <span className="text-[9.5px] font-mono text-yellow-500 font-bold">Elevated (45% Risk)</span>
                </div>
                <div className="h-[1px] flex-1 bg-white/5 hidden sm:block" />
                <div className="flex items-center gap-2.5">
                  <span className="text-[9.5px] font-mono text-gray-500">Active</span>
                  <ArrowRight className="h-3 w-3 text-gray-600" />
                  <span className="text-[9.5px] font-mono text-red-500 font-bold">{selectedReport.risk.toUpperCase()} ({selectedReport.confidence})</span>
                </div>
              </div>
            </div>

            {/* PDF Exporter Overlay */}
            <AnimatePresence>
              {isExporting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-20"
                >
                  <div className="text-center max-w-xs space-y-4">
                    <RefreshCw className="h-5 w-5 text-clinicalCyan animate-spin mx-auto" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white font-display">
                      Compiling Diagnostics Dossier
                    </h3>
                    <p className="text-[8px] text-gray-500 font-mono">
                      PACKAGING FILES // LOGGING CREDENTIALS // GENERATING PDF
                    </p>
                    
                    <div className="space-y-1.5">
                      <div className="w-full bg-white/5 border border-white/10 rounded-full h-1 overflow-hidden">
                        <div 
                          className="h-full bg-clinicalCyan transition-all duration-75"
                          style={{ width: `${exportProgress}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-mono text-clinicalCyan block">{exportProgress}% COMPLETE</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
