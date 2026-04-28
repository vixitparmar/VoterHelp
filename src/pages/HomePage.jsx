import { ChevronRight, ClipboardList, Clock, HelpCircle, ShieldCheck, Sparkles, Zap, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React from 'react';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-16 sm:space-y-24 md:space-y-32">
      {/* Hero Section */}
      <section className="relative section-padding px-6 sm:px-12 rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface-800 to-surface-900 -z-10" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 -z-10" />

        {/* Animated Background Elements */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-primary/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -bottom-24 -left-24 w-[25rem] h-[25rem] bg-surface-700/30 blur-[100px] rounded-full"
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]"
          >
            <Sparkles size={14} /> {t('hero.badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl 2xl:text-9xl font-black leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
          >
            {t('hero.title_part1')} <br />
            <span className="gradient-text">{t('hero.title_part2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-xl md:text-2xl text-surface-100/60 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link to="/process" className="btn-primary w-full sm:w-auto flex items-center gap-3 text-lg group">
              {t('hero.start_journey')} <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/how-to-vote" className="btn-outline w-full sm:w-auto flex items-center gap-3 text-lg group">
              <Zap size={22} className="group-hover:text-primary transition-colors" /> {t('hero.view_guide')}
            </Link>
          </motion.div>

          {/* Stats/Features Minimal */}
          <div className="pt-8 sm:pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 opacity-70 text-[9px] sm:text-[11px] uppercase tracking-widest font-black">
            <div className="flex flex-col gap-1 sm:gap-2"><span className="text-xl sm:text-3xl text-white">100%</span> {t('stats.inclusive')}</div>
            <div className="flex flex-col gap-1 sm:gap-2"><span className="text-xl sm:text-3xl text-white">LIVE</span> {t('stats.live')}</div>
            <div className="flex flex-col gap-1 sm:gap-2"><span className="text-xl sm:text-3xl text-white">AI</span> {t('stats.ai')}</div>
            <div className="flex flex-col gap-1 sm:gap-2"><span className="text-xl sm:text-3xl text-white">EASY</span> {t('stats.easy')}</div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-responsive">
        <HomeCard
          icon={<Target />}
          color="bg-primary"
          title={t('features.process.title')}
          description={t('features.process.description')}
          link="/process"
        />
        <HomeCard
          icon={<Clock />}
          color="bg-surface-700"
          title={t('features.timeline.title')}
          description={t('features.timeline.description')}
          link="/timeline"
        />
        <HomeCard
          icon={<HelpCircle />}
          color="bg-primary-dark"
          title={t('features.support.title')}
          description={t('features.support.description')}
          link="/faqs"
        />
      </section>

      {/* Quick Action Banner */}
      <section className="relative p-1 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-surface-700 to-primary-dark animate-shimmer bg-[length:200%_auto]" />
        <div className="relative bg-surface-900 rounded-[1.9rem] sm:rounded-[2.4rem] section-padding px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 text-center lg:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">{t('banner.title')}</h2>
            <p className="text-surface-100/60 text-base sm:text-lg font-medium max-w-2xl">
              {t('banner.description')}
            </p>
          </div>
          <Link to="/how-to-vote" className="btn-primary whitespace-nowrap bg-white text-surface-900 hover:bg-white/90 shadow-2xl shadow-white/10 px-10 py-5 text-xl">
            {t('banner.button')}
          </Link>
        </div>
      </section>
    </div>
  );
};

const HomeCard = ({ icon, title, description, link, color }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      className="card-padding glass-card-hover flex flex-col gap-6 sm:gap-8 h-full group"
    >
      <div className={`${color} p-4 sm:p-5 rounded-2xl w-fit shadow-xl shadow-black/20 text-surface-900 transform group-hover:rotate-6 transition-transform duration-500`}>
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{title}</h3>
        <p className="text-surface-100/60 leading-relaxed font-medium text-sm sm:text-base">{description}</p>
      </div>
      <div className="mt-auto pt-4">
        <Link to={link} className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary hover:text-white transition-colors group/link">
          {t('common.dive_in')} <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default HomePage;
