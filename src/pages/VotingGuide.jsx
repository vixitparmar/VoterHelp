import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Fingerprint, Search, MapPin, MousePointer2, FileText, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useStore from '../services/store';

const VotingGuide = () => {
  const { t } = useTranslation();
  const { incrementProgress } = useStore();

  useEffect(() => {
    incrementProgress(60);
  }, [incrementProgress]);

  const steps = [
    { number: "01", key: "01", icon: <Search className="text-primary" /> },
    { number: "02", key: "02", icon: <Fingerprint className="text-primary" /> },
    { number: "03", key: "03", icon: <MapPin className="text-primary" /> },
    { number: "04", key: "04", icon: <MousePointer2 className="text-primary" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 sm:space-y-20 pb-20 px-4">
      <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-black tracking-tight"
        >
          {t('guide.title_part1', { defaultValue: 'Booth' })} <span className="gradient-text">{t('guide.title_part2', { defaultValue: 'Walkthrough' })}</span>
        </motion.h1>
        <p className="text-base sm:text-xl text-surface-100/60 font-medium leading-relaxed">
          {t('guide.description')}
        </p>
      </div>

      {/* Step Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 relative z-10">
        {steps.map((step) => (
          <GuideStep
            key={step.key}
            number={step.number}
            title={t(`guide.steps.${step.key}.title`)}
            icon={step.icon}
            description={t(`guide.steps.${step.key}.desc`)}
          />
        ))}
      </section>

      {/* Do's and Don'ts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-10 bg-primary/5 border border-primary/20 rounded-3xl"
        >
          <h3 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
            <CheckCircle size={28} /> {t('guide.dos')}
          </h3>
          <ul className="space-y-4 text-surface-100/70 font-medium">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>{t(`guide.dos_list.${i}`, { defaultValue: t(`guide.dos_item_${i}`) })}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-10 bg-primary-dark/5 border border-primary-dark/20 rounded-3xl"
        >
          <h3 className="text-2xl font-black text-primary-dark mb-6 flex items-center gap-3">
            <XCircle size={28} /> {t('guide.donts')}
          </h3>
          <ul className="space-y-4 text-surface-100/70 font-medium">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary-dark mt-1">•</span>
                <span>{t(`guide.donts_list.${i}`, { defaultValue: t(`guide.donts_item_${i}`) })}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Required Documents */}
      <section className="section-padding glass-card bg-surface-800/80 border-white/10 rounded-3xl px-6 sm:px-12">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">{t('guide.required_docs')}</h3>
            <p className="text-surface-100/50 font-medium max-w-xl">{t('guide.docs_desc')}</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-2xl text-primary hidden lg:block">
            <FileText size={48} />
          </div>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Aadhaar Card', 'PAN Card', 'Passport', 'Driving License', 
            'Health Insurance', 'Bank Passbook', 'Pension Document', 'Service ID Card'
          ].map((doc, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-xl text-center font-bold text-sm border border-white/5 hover:border-primary/30 transition-all cursor-default text-white">
              {doc}
            </div>
          ))}
        </div>
        <div className="mt-12 p-4 bg-white/5 rounded-2xl flex items-center gap-4 text-xs sm:text-sm text-surface-100/40 font-medium">
          <Info size={20} className="text-primary flex-shrink-0" />
          <p>{t('guide.doc_note')}</p>
        </div>
      </section>
    </div>
  );
};

const GuideStep = ({ number, title, icon, description }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="relative p-8 sm:p-10 glass-card-hover border-white/5 shadow-premium pt-16 sm:pt-20 rounded-3xl"
  >
    <div className="absolute top-6 right-8 text-7xl sm:text-8xl font-black text-white/[0.03] select-none leading-none z-0">
      {number}
    </div>
    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-surface-900 border border-white/10 rounded-2xl shadow-xl flex items-center justify-center mb-6 sm:mb-8 text-2xl relative z-10">
      {icon}
    </div>
    <div className="relative z-10 space-y-3 sm:space-y-4">
      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{title}</h3>
      <p className="text-sm sm:text-base text-surface-100/60 leading-relaxed font-medium">{description}</p>
    </div>
  </motion.div>
);

export default VotingGuide;

