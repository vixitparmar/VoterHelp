import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Circle, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useStore from '../services/store';

const TimelinePage = () => {
  const { i18n } = useTranslation();
  const { timeline, fetchTimeline, incrementProgress } = useStore();

  useEffect(() => {
    fetchTimeline();
    incrementProgress(40);
  }, [fetchTimeline, incrementProgress, i18n.language]);

  if (!timeline.length) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 sm:space-y-20 pb-20 px-4">
      <div className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight"
        >
          Election <span className="gradient-text">Timeline</span>
        </motion.h1>
        <p className="text-base sm:text-xl text-surface-100/60 font-medium leading-relaxed max-w-2xl mx-auto">
          The heartbeat of democracy. Stay synchronized with every critical milestone 
          of the upcoming national elections.
        </p>
      </div>

      <div className="relative pt-10 px-2 sm:px-6">
        {/* Modern Vertical Line */}
        <div className="absolute left-[2.25rem] md:left-1/2 top-0 bottom-10 w-1 sm:w-2 bg-white/[0.03] -translate-x-1/2 z-0 rounded-full overflow-hidden border border-white/5">
           <motion.div 
             initial={{ height: 0 }}
             whileInView={{ height: '100%' }}
             transition={{ duration: 2.5, ease: "easeInOut" }}
             viewport={{ once: true }}
             className="w-full bg-gradient-to-b from-primary via-primary-dark to-surface-700 shadow-[0_0_20px_rgba(91,192,190,0.3)]"
           />
        </div>

        <div className="space-y-12 md:space-y-32 relative z-10">
          {timeline.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-padding glass-card-hover border-white/5 text-center bg-surface-800/40 rounded-[2.5rem] mt-20"
      >
         <p className="text-surface-100/20 italic font-black uppercase tracking-[0.3em] text-[9px] sm:text-[11px]">
           Reference: Simulated data for experimental purposes only.
         </p>
      </motion.div>
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;
  
  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 className="text-surface-900" size={20} />;
    if (status === 'current') return <Clock className="text-surface-900 animate-pulse" size={20} />;
    return <Circle className="text-white/20" size={20} />;
  };

  const getMarkerColor = (status) => {
    if (status === 'completed') return 'bg-primary border-primary/50 shadow-[0_0_20px_rgba(91,192,190,0.5)]';
    if (status === 'current') return 'bg-primary-dark border-primary/50 shadow-[0_0_30px_rgba(58, 80, 107, 0.6)]';
    return 'bg-surface-800 border-white/10';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 lg:gap-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Content */}
      <div className={`flex-1 w-full relative pl-16 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div className={`p-6 sm:p-10 glass-card-hover transition-all duration-500 border-white/5 ${
          item.status === 'current' ? 'ring-2 ring-primary/20 bg-primary/5' : ''
        }`}>
          <div className={`flex items-center gap-3 mb-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] ${isEven ? 'md:justify-end' : 'md:justify-start'} ${
            item.status === 'current' ? 'text-primary' : 'text-primary-dark'
          }`}>
            <Calendar size={16} /> {item.date}
          </div>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 text-white">{item.phase}</h3>
          <p className="text-sm sm:text-lg text-surface-100/50 leading-relaxed font-semibold">{item.description}</p>
          
          <div className={`mt-6 sm:mt-8 flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-20 ${isEven ? 'md:justify-end' : ''}`}>
             <MapPin size={12} /> Institutional Access Only
          </div>
        </div>
      </div>

      {/* Marker - Sticky for mobile */}
      <div 
        className={`absolute sm:relative left-[1.125rem] md:left-0 w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border flex items-center justify-center z-20 flex-shrink-0 shadow-premium transition-all duration-700 ${getMarkerColor(item.status)}`}
      >
        {getStatusIcon(item.status)}
      </div>

      {/* Hidden Spacer for grid alignment on desktop */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

export default TimelinePage;
