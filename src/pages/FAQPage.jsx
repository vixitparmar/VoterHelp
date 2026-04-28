import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useStore from '../services/store';

const FAQPage = () => {
  const { t, i18n } = useTranslation();
  const { faqs, fetchFaqs, incrementProgress } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFaqs();
    incrementProgress(80);
  }, [fetchFaqs, incrementProgress, i18n.language]);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-20 px-4">
      <div className="text-center space-y-4 sm:space-y-6">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight">{t('faq.title_part1')} <span className="gradient-text">{t('faq.title_part2')}</span></h1>
        <p className="text-base sm:text-xl text-surface-100/60 font-medium max-w-2xl mx-auto">
          {t('faq.description')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative group max-w-2xl mx-auto">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={22} />
        <input 
          type="text" 
          placeholder={t('faq.search_placeholder')}
          className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-surface-800/50 backdrop-blur-xl border border-white/10 focus:border-primary/50 outline-none transition-all shadow-premium text-white placeholder:text-white/20 font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))
        ) : (
          <div className="text-center py-20 glass-card-hover border-white/5 rounded-3xl">
            <HelpCircle size={64} className="mx-auto mb-6 text-white/10" />
            <p className="text-surface-100/40 font-bold uppercase tracking-widest">{t('faq.no_results', { query: searchTerm })}</p>
          </div>
        )}
      </div>

      {/* Quick Action Card */}
      <div className="section-padding px-6 sm:px-12 bg-gradient-to-br from-primary/10 to-primary-dark/10 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-12 sm:mt-20">
         <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{t('faq.still_questions')}</h3>
            <p className="text-surface-100/60 font-medium max-w-md">{t('faq.assistant_desc')}</p>
         </div>
         <button className="btn-primary px-10 py-4 text-lg shadow-2xl shadow-primary/20">
            <MessageCircle size={20} /> {t('faq.ask_assistant')}
         </button>
      </div>
    </div>
  );
};

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`glass-card-hover border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ${isOpen ? 'bg-white/[0.03]' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 sm:px-10 py-6 sm:py-8 flex items-center justify-between gap-6 text-left"
      >
        <span className={`text-base sm:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white'}`}>
          {faq.question}
        </span>
        <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-primary text-surface-900 rotate-180 scale-110' : 'bg-white/5 text-white/40'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-6 sm:px-10 pb-8 sm:pb-10">
              <div className="pt-6 border-t border-white/5 text-sm sm:text-lg text-surface-100/60 leading-relaxed font-medium">
                {faq.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQPage;
