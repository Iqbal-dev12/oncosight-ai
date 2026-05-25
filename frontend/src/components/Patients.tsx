import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, User, FileText } from 'lucide-react';

interface Scan {
  date: string;
  type: string;
  finding: string;
  size: string;
  reportId: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  status: 'Critical' | 'Elevated' | 'Stable';
  avatarColor: string;
  scans: Scan[];
}

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('PT-8842');
  const [filterCategory, setFilterCategory] = useState<'all' | 'mri' | 'ct' | 'xray'>('all');

  const patients: Patient[] = [
    {
      id: 'PT-8842',
      name: 'Arthur Pendelton',
      age: 52,
      gender: 'Male',
      bloodType: 'O-positive',
      status: 'Critical',
      avatarColor: 'bg-red-500/10 text-red-500 border border-red-500/20',
      scans: [
        { date: '2026-05-25', type: 'Brain Tumor MRI (T2/FLAIR)', finding: 'Frontal Glioblastoma Mass', size: '2.4 cm', reportId: 'REP-0412' },
        { date: '2026-03-24', type: 'Brain Tumor MRI (contrast)', finding: 'Atypical glial cell proliferation', size: '1.2 cm', reportId: 'REP-0410' },
        { date: '2026-01-10', type: 'Brain Tumor MRI (routine)', finding: 'Negative for active lesion', size: 'N/A', reportId: 'REP-0402' }
      ]
    },
    {
      id: 'PT-4109',
      name: 'Sarah Jenkins',
      age: 37,
      gender: 'Female',
      bloodType: 'A-negative',
      status: 'Elevated',
      avatarColor: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
      scans: [
        { date: '2026-05-18', type: 'Lung Tumor CT Scan', finding: 'Right Apical Nodule', size: '1.9 cm', reportId: 'REP-1089' },
        { date: '2026-02-12', type: 'Lung Tumor CT (routine)', finding: 'Indeterminate density shift', size: 'N/A', reportId: 'REP-1045' }
      ]
    },
    {
      id: 'PT-3091',
      name: 'Marcus Vance',
      age: 64,
      gender: 'Male',
      bloodType: 'AB-positive',
      status: 'Stable',
      avatarColor: 'bg-green-500/10 text-green-500 border border-green-500/20',
      scans: [
        { date: '2026-05-12', type: 'Pneumonia X-Ray', finding: 'Lobar Pneumonia Consolidation', size: '3.2 cm Area', reportId: 'REP-2154' }
      ]
    },
    {
      id: 'PT-1994',
      name: 'Elena Rostova',
      age: 45,
      gender: 'Female',
      bloodType: 'B-positive',
      status: 'Elevated',
      avatarColor: 'bg-clinicalCyan/10 text-clinicalCyan border border-clinicalCyan/20',
      scans: [
        { date: '2026-05-04', type: 'Brain Tumor MRI (T2)', finding: 'Frontal cortex inflammation', size: '0.8 cm', reportId: 'REP-3042' }
      ]
    }
  ];

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterCategory === 'all') return matchesSearch;
    
    // Check if the patient has any scan of that type
    return matchesSearch && p.scans.some(s => {
      if (filterCategory === 'mri') return s.type.toLowerCase().includes('mri') || s.type.toLowerCase().includes('brain');
      if (filterCategory === 'ct') return s.type.toLowerCase().includes('ct') || s.type.toLowerCase().includes('lung');
      if (filterCategory === 'xray') return s.type.toLowerCase().includes('x-ray') || s.type.toLowerCase().includes('xray') || s.type.toLowerCase().includes('pneumonia');
      return false;
    });
  });

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  return (
    <div className="mx-auto max-w-7xl px-8 lg:px-12 py-10 lg:py-12 relative min-h-[90vh] space-y-10">
      {/* Explicit Spacious Header */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left border-b border-white/5 pb-6 space-y-2"
      >
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
          Clinical Patient Registry
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Access longitudinal diagnostic records, filter registry directories by active scanner pathology, and review oncologist annotations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Side: Directory Search & Filters */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search registry by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full clinical-input font-sans text-xs"
            />
          </div>

          {/* Clinical Filter Chips */}
          <div className="flex flex-wrap gap-1.5 py-0.5 select-none">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border ${
                filterCategory === 'all'
                  ? 'border-clinicalCyan bg-clinicalCyan/[0.03] text-white'
                  : 'border-white/5 bg-black/40 text-gray-500 hover:text-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterCategory('mri')}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border ${
                filterCategory === 'mri'
                  ? 'border-clinicalCyan bg-clinicalCyan/[0.03] text-white'
                  : 'border-white/5 bg-black/40 text-gray-500 hover:text-gray-300'
              }`}
            >
              Brain MRI
            </button>
            <button
              onClick={() => setFilterCategory('ct')}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border ${
                filterCategory === 'ct'
                  ? 'border-clinicalCyan bg-clinicalCyan/[0.03] text-white'
                  : 'border-white/5 bg-black/40 text-gray-500 hover:text-gray-300'
              }`}
            >
              Lung CT
            </button>
            <button
              onClick={() => setFilterCategory('xray')}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border ${
                filterCategory === 'xray'
                  ? 'border-clinicalCyan bg-clinicalCyan/[0.03] text-white'
                  : 'border-white/5 bg-black/40 text-gray-500 hover:text-gray-300'
              }`}
            >
              Pneumonia X-Ray
            </button>
          </div>

          {/* Patients list */}
          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredPatients.map((patient) => {
              const isSelected = patient.id === selectedPatientId;
              const cardClass = isSelected 
                ? 'clinical-panel-active ring-1 ring-clinicalCyan/30' 
                : 'clinical-panel hover:border-white/10 hover:bg-[#121316]';

              return (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 relative ${cardClass}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-full ${patient.avatarColor} flex items-center justify-center text-xs font-semibold uppercase font-display`}>
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white tracking-wide">{patient.name}</h4>
                        <span className="text-[10px] font-mono text-gray-500 block mt-0.5">{patient.id} // {patient.age} Yrs</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[8px] font-semibold tracking-wider uppercase ${
                      patient.status === 'Critical' 
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                        : patient.status === 'Elevated'
                        ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/10 border border-green-500/20 text-green-400'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredPatients.length === 0 && (
              <div className="text-center py-10 border border-dashed border-white/5 rounded-xl text-gray-500 text-xs">
                No matching patients found.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Detailed Patient Dossier */}
        <div className="lg:col-span-8">
          <motion.div
            key={selectedPatient.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="clinical-panel p-6 lg:p-8 min-h-[500px] flex flex-col justify-between"
          >
            {/* Dossier Header */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-6 mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#050608] border border-white/5 flex items-center justify-center text-clinicalCyan text-sm font-semibold font-display shadow-inner">
                    <User className="h-5 w-5 text-clinicalCyan" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white uppercase font-display tracking-wide">{selectedPatient.name}</h3>
                    <span className="text-[10px] font-mono text-gray-500 block mt-0.5">REGISTRY ID: {selectedPatient.id}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-black/40 border border-white/5 rounded-lg px-4 py-2 text-center">
                  <div>
                    <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Age / Gender</span>
                    <span className="text-xs font-semibold text-white font-display mt-0.5 block">{selectedPatient.age} / {selectedPatient.gender[0]}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Blood Type</span>
                    <span className="text-xs font-semibold text-white font-mono mt-0.5 block">{selectedPatient.bloodType}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Triage Status</span>
                    <span className={`text-xs font-semibold font-display mt-0.5 block ${
                      selectedPatient.status === 'Critical' ? 'text-red-400' : selectedPatient.status === 'Elevated' ? 'text-yellow-400' : 'text-green-400'
                    }`}>{selectedPatient.status.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Scans Timeline */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-clinicalCyan mb-5 flex items-center gap-2 font-display">
                    <Calendar className="h-4 w-4" />
                    Diagnostics & Scan Timeline
                  </h4>

                  <div className="relative border-l border-white/5 pl-6 ml-3.5 space-y-6">
                    {selectedPatient.scans.map((scan, i) => (
                      <div key={i} className="relative">
                        {/* Dot */}
                        <div className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border bg-black transition-all ${
                          i === 0 
                            ? selectedPatient.status === 'Critical' ? 'border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'border-clinicalCyan shadow-[0_0_8px_rgba(0,180,216,0.5)]'
                            : 'border-white/10'
                        }`} />

                        <div className="clinical-panel p-4 rounded-lg bg-black/20 hover:border-white/10 transition-colors duration-300">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                            <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {scan.date}
                            </span>
                            <span className="text-xs font-semibold uppercase text-white font-display">{scan.type}</span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-white/5">
                            <div>
                              <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Diagnostic Findings</span>
                              <span className="text-xs font-medium text-gray-200 mt-1 block">{scan.finding}</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-mono text-gray-500 block uppercase tracking-wider">Nodule Measured Area</span>
                              <span className="text-xs font-medium text-clinicalCyan font-mono mt-1 block">{scan.size}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom medical safety notice */}
            <div className="mt-8 border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-500 gap-2">
              <span className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-red-500/80" />
                SECURE MEDICAL DATA // ENCRYPTED ACCESS // HIPAA COMPLIANT
              </span>
              <span>INDEX: DB_v6.0.2</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
