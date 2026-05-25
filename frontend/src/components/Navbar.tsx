import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ShieldAlert, Cpu } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'upload', label: 'Upload Scan' },
    { id: 'predictions', label: 'AI Predictions' },
    { id: 'reports', label: 'Reports' },
    { id: 'patients', label: 'Patients' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/75 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveTab('landing')}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-tr from-[#00d2ff] to-[#b500ff] p-[1.5px]"
            >
              <div className="flex h-full w-full items-center justify-center rounded-md bg-black">
                <Cpu className="h-4 w-4 text-[#00d2ff]" />
              </div>
            </motion.div>
            <span className="font-futuristic text-lg font-bold tracking-widest text-white hover:text-[#00d2ff] transition-colors duration-300">
              ONCOSIGHT <span className="text-[#00d2ff]">AI</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex space-x-6">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="relative px-3 py-2 text-xs font-futuristic uppercase tracking-wider text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none"
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Active Tab Background Pill / Underline */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d2ff] to-[#b500ff] shadow-[0_0_8px_rgba(0,210,255,0.6)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover Glow Accent */}
                    <span className="absolute inset-0 -z-10 rounded-md bg-white/0 opacity-0 hover:bg-white/5 hover:opacity-100 transition-all duration-300" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Open Panel */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-b border-white/5 bg-black/90 backdrop-blur-lg px-2 pt-2 pb-4 space-y-1 sm:px-3"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-futuristic uppercase tracking-wider ${
                  isActive 
                    ? 'text-[#00d2ff] bg-white/5 border-l-2 border-[#00d2ff]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                } transition-all duration-200`}
              >
                {item.label}
              </button>
            );
          })}
        </motion.div>
      )}
    </nav>
  );
}
