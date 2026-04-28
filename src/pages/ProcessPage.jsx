import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, ShieldCheck, Vote, Calculator, Trophy, ChevronRight, ChevronLeft, Info, Lightbulb, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useStore from '../services/store';

const iconMap = {
  UserPlus: <UserPlus className="w-8 h-8 sm:w-10 sm:h-10" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />,
  Vote: <Vote className="w-8 h-8 sm:w-10 sm:h-10" />,
  Calculator: <Calculator className="w-8 h-8 sm:w-10 sm:h-10" />,
  Trophy: <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
};

const ProcessPage = () => {
  const { i18n } = useTranslation();
  const { process, fetchProcess, incrementProgress } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchProcess();
  }, [fetchProcess, i18n.language]);

  const handleNext = () => {
    if (activeIndex < process.length - 1) {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      incrementProgress((nextIndex + 1) * 20);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  if (!process.length) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 sm:space-y-20 relative z-10 px-4">
      <div className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight"
        >
          The <span className="gradient-text">Election Journey</span>
        </motion.h1>
        <p className="text-base sm:text-xl text-surface-100/60 font-medium leading-relaxed max-w-2xl mx-auto">
          The path from a regular citizen to an empowered voter.
          Discover the five crucial phases of the democratic process.
        </p>
      </div>

      {/* Modern Stepper */}
      <div className="relative pt-4 sm:pt-8">
        <div className="absolute top-[32px] sm:top-[40px] left-0 w-full h-0.5 sm:h-1 bg-white/5 z-0" />
        <div
          className="absolute top-[32px] sm:top-[40px] left-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-primary-dark z-0 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(91,192,190,0.5)]"
          style={{ width: `${(activeIndex / (process.length - 1)) * 100}%` }}
        />

        <div className="flex justify-between items-center relative z-10 gap-2">
          {process.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-3 sm:gap-4 flex-1">
              <button
                onClick={() => {
                  setActiveIndex(idx);
                  incrementProgress((idx + 1) * 20);
                }}
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-black transition-all duration-500 transform ${idx <= activeIndex
                  ? 'bg-primary text-surface-900 shadow-2xl shadow-primary/30 scale-110 sm:scale-110'
                  : 'bg-surface-800 text-surface-100/30 border border-white/10 hover:border-white/20'
                  }`}
              >
                {idx + 1}
              </button>
              <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-center transition-colors duration-500 ${idx === activeIndex ? 'text-primary' : 'text-surface-100/20'
                }`}>
                {step.title.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="p-6 sm:p-12 glass-card-hover border-white/5 flex flex-col lg:flex-row gap-8 sm:gap-16 items-start shadow-premium"
        >
          <div className="w-full lg:w-48 h-48 flex-shrink-0 bg-gradient-to-br from-primary/10 to-primary/30 rounded-3xl flex items-center justify-center text-primary border border-white/10 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              {React.cloneElement(iconMap[process[activeIndex].icon])}
            </motion.div>
          </div>

          <div className="space-y-6 sm:space-y-10 flex-grow">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  Phase 0{activeIndex + 1}
                </span>
                <div className="h-px flex-grow bg-white/5" />
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">{process[activeIndex].title}</h2>
              <p className="text-lg sm:text-2xl text-surface-100/60 leading-relaxed font-medium">
                {process[activeIndex].description}
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-surface-100/5 rounded-2xl sm:rounded-3xl border border-white/5 flex gap-4 sm:gap-6 items-start group hover:bg-surface-100/10 transition-all duration-300">
              <div className="p-3 bg-primary/10 rounded-xl text-primary mt-1 shadow-inner">
                <Info size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-white/90 uppercase text-[10px] sm:text-xs tracking-widest">In-depth Insights</h4>
                <p className="text-sm sm:text-base text-surface-100/50 leading-relaxed font-medium italic">
                  "{process[activeIndex].details}"
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="btn-secondary flex items-center gap-3 disabled:opacity-20 flex-1 justify-center sm:flex-initial px-8 py-4"
              >
                <ChevronLeft size={22} /> Previous Step
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex === process.length - 1}
                className="btn-primary flex items-center gap-3 flex-1 justify-center sm:flex-initial group px-8 py-4"
              >
                Continue Process <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pb-10">
        <div className="card-padding glass-card-hover border-l-4 border-l-primary flex gap-6 sm:gap-8 items-start">
          <div className="p-4 bg-primary/10 rounded-2xl text-primary shadow-inner">
            <Lightbulb size={32} />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-lg sm:text-xl font-bold text-white">Pro Strategy</h4>
            <p className="text-sm sm:text-base text-surface-100/50 font-medium leading-relaxed">
              Always keep a digital copy of your Voter ID. You can download the e-EPIC from the official NVSP portal anytime.
            </p>
          </div>
        </div>
        <div className="card-padding glass-card-hover border-l-4 border-l-primary-dark flex gap-6 sm:gap-8 items-start">
          <div className="p-4 bg-primary-dark/10 rounded-2xl text-primary shadow-inner">
            <Target size={32} />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-lg sm:text-xl font-bold text-white">Quick Fact</h4>
            <p className="text-sm sm:text-base text-surface-100/50 font-medium leading-relaxed">
              You can check your name in the electoral roll using just your phone by sending an SMS to 1950.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;


