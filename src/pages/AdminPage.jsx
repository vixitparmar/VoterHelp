import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, RefreshCw, AlertCircle, Database, Activity, Globe, ShieldCheck, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useStore from '../services/store';

const AdminPage = () => {
  const { t, i18n } = useTranslation();
  const { status, fetchStatus, updateSimulation, incrementProgress } = useStore();

  useEffect(() => {
    fetchStatus();
    incrementProgress(100);
  }, [fetchStatus, incrementProgress, i18n.language]);

  const toggleVoting = () => {
    updateSimulation({ isVotingOpen: !status.isVotingOpen });
  };

  const setPhase = (phase) => {
    updateSimulation({ currentPhase: phase });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 pb-20 px-4">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
        <div className="space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20"
          >
             <Cpu size={14} className="animate-pulse" /> {t('admin.experimental_mode', { defaultValue: 'Experimental Mode' })}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight"
          >
            <span className="gradient-text">{t('admin.title_part1', { defaultValue: 'Admin' })}</span> {t('admin.title_part2', { defaultValue: 'Control' })}
          </motion.h1>
          <p className="text-base sm:text-xl text-surface-100/60 font-medium max-w-2xl">
            {t('admin.description')}
          </p>
        </div>
        <div className="px-6 py-4 bg-surface-800/80 border border-white/10 text-primary rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center gap-4 shadow-premium backdrop-blur-md self-start lg:self-end">
           <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(91,192,190,0.8)]" />
           Live Proxy: ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
        {/* Status Control */}
        <section className="lg:col-span-2 glass-card card-padding space-y-8 sm:space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3">
              <Activity size={28} className="text-primary" /> {t('admin.global_sim')}
            </h3>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest border border-primary/20">Read/Write Auth</span>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-10 bg-white/[0.02] rounded-3xl border border-white/5 hover:bg-white/[0.04] transition-all gap-6">
               <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white">{t('admin.voting_avail')}</h4>
                  <p className="text-sm sm:text-base text-surface-100/40 font-medium leading-relaxed">Instantly toggle polling accessibility across all virtual booth segments.</p>
               </div>
               <button 
                 onClick={toggleVoting}
                 className={`relative w-20 h-10 rounded-full transition-all duration-500 shadow-2xl shrink-0 ${status.isVotingOpen ? 'bg-primary' : 'bg-surface-700'}`}
               >
                  <motion.div 
                    animate={{ x: status.isVotingOpen ? 44 : 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="absolute top-1.5 w-7 h-7 bg-white rounded-full shadow-2xl flex items-center justify-center border-none" 
                  >
                    <div className={`w-1 h-1 rounded-full ${status.isVotingOpen ? 'bg-primary' : 'bg-surface-700'}`} />
                  </motion.div>
               </button>
            </div>

            <div className="p-6 sm:p-10 bg-white/[0.02] rounded-3xl border border-white/5 space-y-8 sm:space-y-10">
               <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white">{t('admin.lifecycle')}</h4>
                  <p className="text-sm sm:text-base text-surface-100/40 font-medium leading-relaxed">Force the application state into a specific electoral lifecycle stage.</p>
               </div>
               <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
                  {[
                    { id: 'Announcement', key: 'Announcement' },
                    { id: 'Nominations', key: 'Nominations' },
                    { id: 'Campaigning', key: 'Campaigning' },
                    { id: 'Polling Day', key: 'Polling_Day' },
                    { id: 'Counting & Results', key: 'Counting' }
                  ].map((phase) => (
                    <button
                      key={phase.id}
                      onClick={() => setPhase(phase.id)}
                      className={`px-3 py-4 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                        status.currentPhase === phase.id
                          ? 'bg-primary text-surface-900 border-primary shadow-[0_0_20px_rgba(91,192,190,0.3)]' 
                          : 'bg-white/5 border-white/5 hover:border-white/20 text-surface-100/40 hover:text-white'
                      }`}
                    >
                      {t(`admin.phases.${phase.key}`)}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section className="glass-card card-padding bg-gradient-to-br from-primary/10 via-surface-800 to-surface-900 space-y-8 sm:space-y-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-5 text-primary rotate-12">
            <Globe size={240} />
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3 relative z-10">
            <Database size={28} className="text-primary-dark" /> {t('admin.monitor')}
          </h3>
          
          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
               {[
                 { label: 'Electoral Phase', value: status.displayPhase || status.currentPhase, active: true },
                 { label: 'Network I/O', value: status.isVotingOpen ? 'TRUE' : 'FALSE', success: status.isVotingOpen },
                 { label: 'Last Sync', value: status.lastUpdated ? new Date(status.lastUpdated).toLocaleTimeString() : 'PENDING...' }
               ].map((metric, idx) => (
                  <div key={idx} className="flex flex-col gap-2 bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                     <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">{metric.label}</span>
                     <span className={`font-mono text-xs sm:text-sm font-black uppercase ${metric.active ? 'text-primary' : metric.success ? 'text-primary' : metric.success === false ? 'text-primary-dark' : 'text-white/60'}`}>
                        {metric.value}
                     </span>
                  </div>
               ))}
            </div>

            <div className="p-6 bg-surface-900/50 rounded-2xl border border-white/5 flex gap-4 backdrop-blur-sm group hover:border-primary/20 transition-all">
               <ShieldCheck className="text-primary shrink-0 animate-float" size={24} />
               <p className="text-[11px] sm:text-xs text-surface-100/40 leading-relaxed font-bold uppercase tracking-widest">
                 State changes are immutable and encrypted before propagation.
               </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
