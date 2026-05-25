import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { 
  TrendingUp, ShieldAlert, Cpu, Activity, ShieldCheck, Eye
} from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="clinical-panel p-3 rounded border border-white/5 shadow-2xl text-[11px] font-mono bg-black/90">
        <p className="text-white font-semibold mb-1 uppercase tracking-wider">{label}</p>
        {payload.map((pld: any, idx: number) => (
          <p key={idx} style={{ color: pld.color }} className="flex justify-between gap-5 mt-0.5">
            <span>{pld.name}:</span>
            <span className="font-bold">{pld.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface DashboardProps {
  onNavigateToTab: (tab: string) => void;
}

export default function Dashboard({ onNavigateToTab }: DashboardProps) {
  const volumeData = [
    { name: 'Mon', MRI: 24, CT: 35, XRay: 40 },
    { name: 'Tue', MRI: 30, CT: 42, XRay: 38 },
    { name: 'Wed', MRI: 45, CT: 28, XRay: 52 },
    { name: 'Thu', MRI: 38, CT: 48, XRay: 60 },
    { name: 'Fri', MRI: 52, CT: 50, XRay: 48 },
    { name: 'Sat', MRI: 20, CT: 22, XRay: 25 },
    { name: 'Sun', MRI: 18, CT: 15, XRay: 20 },
  ];

  const accuracyData = [
    { name: 'Brain Tumor MRI', Accuracy: 94.2 },
    { name: 'Lung Tumor CT', Accuracy: 96.5 },
    { name: 'Pneumonia X-Ray', Accuracy: 89.8 }
  ];

  const recentScans = [
    { id: 'SC-0412', patient: 'Arthur Pendelton', type: 'Brain Tumor MRI', status: 'Critical', confidence: '94.2%', time: '12m ago' },
    { id: 'SC-1089', patient: 'Sarah Jenkins', type: 'Lung Tumor CT', status: 'Elevated', confidence: '96.5%', time: '1h ago' },
    { id: 'SC-2154', patient: 'Marcus Vance', type: 'Pneumonia X-Ray', status: 'Stable', confidence: '89.8%', time: '3h ago' },
    { id: 'SC-3042', patient: 'Elena Rostova', type: 'Brain Tumor MRI', status: 'Elevated', confidence: '95.1%', time: '5h ago' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-8 lg:px-12 py-10 lg:py-12 relative min-h-[90vh] space-y-10">
      {/* Explicit Spacious Header */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left border-b border-white/5 pb-6 space-y-2"
      >
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
          Clinical Operations Dashboard
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Real-time diagnostic analytics across Brain MRI, Lung CT, and Pneumonia X-Ray studies. Streamlining radiology workflows and multi-disease screening.
        </p>
      </motion.div>

      {/* Grid: Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Scans Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="clinical-panel p-6 flex items-center justify-between"
        >
          <div className="space-y-2">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">Diagnostics Completed</span>
            <span className="text-4xl font-bold text-white font-display">1,482</span>
            <span className="text-[10px] text-clinicalCyan block flex items-center gap-1.5 font-mono">
              <TrendingUp className="h-3.5 w-3.5" />
              Brain: 512 | Lung: 489 | Pneumonia: 481
            </span>
          </div>
          <div className="h-10 w-10 rounded bg-clinicalCyan/5 border border-clinicalCyan/10 flex items-center justify-center text-clinicalCyan">
            <Activity className="h-5 w-5" />
          </div>
        </motion.div>

        {/* High Risk Cases Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="clinical-panel p-6 flex items-center justify-between"
        >
          <div className="space-y-2">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">Active Triage Alerts</span>
            <span className="text-4xl font-bold text-red-500 font-display">124</span>
            <span className="text-[10px] text-red-400 block flex items-center gap-1.5 font-mono">
              <ShieldAlert className="h-3.5 w-3.5 animate-pulse" />
              Brain: 42 | Lung: 56 | Pneumonia: 26
            </span>
          </div>
          <div className="h-10 w-10 rounded bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </motion.div>

        {/* Average AI Confidence Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="clinical-panel p-6 flex items-center justify-between sm:col-span-2 lg:col-span-1"
        >
          <div className="space-y-2">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">AI Engine Accuracy</span>
            <span className="text-4xl font-bold text-clinicalCyan font-display">94.8%</span>
            <span className="text-[10px] text-gray-500 block flex items-center gap-1.5 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-clinicalCyan" />
              MRI: 94% | CT: 96% | X-Ray: 90%
            </span>
          </div>
          <div className="h-10 w-10 rounded bg-white/[0.01] border border-white/10 flex items-center justify-center text-clinicalCyan">
            <Cpu className="h-5 w-5" />
          </div>
        </motion.div>
      </div>

      {/* Grid: Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Chart: Area Volume Chart */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="clinical-panel p-6 lg:col-span-8"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
            Diagnostic Scan Load Over Time
          </h2>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="mriGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#00b4d8" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#00b4d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="ctGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#0077b6" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#0077b6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="xrayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.015)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.25)" fontSize={9} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.25)" fontSize={9} dx={-5} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={5} wrapperStyle={{ fontSize: '9px', paddingTop: '15px' }} />
                <Area type="monotone" dataKey="MRI" name="Brain Tumor MRI" stroke="#00b4d8" strokeWidth={1.5} fillOpacity={1} fill="url(#mriGrad)" />
                <Area type="monotone" dataKey="CT" name="Lung Tumor CT" stroke="#0077b6" strokeWidth={1.5} fillOpacity={1} fill="url(#ctGrad)" />
                <Area type="monotone" dataKey="XRay" name="Pneumonia X-Ray" stroke="#a78bfa" strokeWidth={1.5} fillOpacity={1} fill="url(#xrayGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Chart: Bar Accuracy Chart */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="clinical-panel p-6 lg:col-span-4"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
            AI Accuracy By Target Pathology
          </h2>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accuracyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.015)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.25)" fontSize={8} tickLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.25)" fontSize={8} domain={[80, 100]} dx={-5} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Accuracy" name="AI Accuracy (%)" fill="#00b4d8" radius={[3, 3, 0, 0]} maxBarSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Grid: Recent Activity & Triage Table */}
      <div className="grid grid-cols-1">
        {/* Recent Cases table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="clinical-panel p-6 overflow-hidden"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Recent Case Studies
            </h2>
            <button 
              onClick={() => onNavigateToTab('patients')}
              className="text-[9px] text-clinicalCyan hover:underline uppercase font-bold tracking-wider"
            >
              View Directory
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                  <th className="py-3">Case ID</th>
                  <th className="py-3">Patient</th>
                  <th className="py-3">Scan Type</th>
                  <th className="py-3 text-center">Triage</th>
                  <th className="py-3 text-right">Confidence</th>
                  <th className="py-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentScans.map((scan, i) => (
                  <tr key={i} className="hover:bg-white/[0.01] transition-colors duration-150 text-[12px]">
                    <td className="py-3.5 text-gray-500 font-mono">{scan.id}</td>
                    <td className="py-3.5 font-semibold text-white">{scan.patient}</td>
                    <td className="py-3.5 text-gray-400">{scan.type}</td>
                    <td className="py-3.5 text-center">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-semibold uppercase ${
                        scan.status === 'Critical' 
                          ? 'bg-red-500/10 border border-red-500/20 text-red-500' 
                          : scan.status === 'Elevated'
                          ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500'
                          : 'bg-green-500/10 border border-green-500/20 text-green-500'
                      }`}>
                        {scan.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-mono text-white font-semibold">{scan.confidence}</td>
                    <td className="py-3.5 text-right pr-2">
                      <button
                        onClick={() => onNavigateToTab('predictions')}
                        className="p-1 rounded bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:text-clinicalCyan transition-all text-gray-400"
                        title="View Predictions"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
