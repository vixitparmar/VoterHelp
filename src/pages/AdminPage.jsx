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

            {/* Google Identity Integration Simulation */}
            <div className="pt-4 border-t border-white/10">
               <h4 className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40 mb-4">Google Identity Service</h4>
               <button 
                 onClick={() => alert('Google Identity Service Mock: Authenticating...')}
                 className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-surface-900 rounded-2xl font-black text-sm hover:bg-white/90 transition-all shadow-2xl"
               >
                 <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                 </svg>
                 Sign in with Google
               </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
