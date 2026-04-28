import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Vote, Home, ClipboardList, Clock, HelpCircle, ShieldCheck, Search, MessageSquare, X, Send, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useStore from '../services/store';
import LanguageSelector from '../components/LanguageSelector';

const MainLayout = () => {
  const { t } = useTranslation();
  const { progress } = useStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatValue, setChatValue] = useState('');
  const [messages, setMessages] = useState([
    { text: t('layout.chat.initial_msg'), isBot: true }
  ]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleChatSend = () => {
    if (!chatValue.trim()) return;
    const newMsg = { text: chatValue, isBot: false };
    setMessages(prev => [...prev, newMsg]);
    setChatValue('');

    setTimeout(() => {
      let botText = t('layout.chat.default_response', { defaultValue: "I'm not sure about that. Try checking the FAQ section!" });
      const val = chatValue.toLowerCase();
      if (val.includes('hello') || val.includes('hi')) botText = t('layout.chat.hi_response', { defaultValue: "Hello! Ready to learn about voting?" });
      else if (val.includes('id') || val.includes('card')) botText = t('layout.chat.id_response', { defaultValue: "You can use Aadhaar, PAN, or Passport if you don't have a Voter ID." });
      else if (val.includes('booth')) botText = t('layout.chat.booth_response', { defaultValue: "You can find your booth on the EC website using your EPIC number." });
      else if (val.includes('age')) botText = t('layout.chat.age_response', { defaultValue: "You must be 18 years or older on Jan 1st of the election year." });

      setMessages(prev => [...prev, { text: botText, isBot: true }]);
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-900 border-x border-white/5 max-w-[2560px] mx-auto overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[70]"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-surface-900/90 backdrop-blur-2xl border-b border-white/10">
        <div className="container-wide py-4 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity text-white">
            <div className="bg-primary text-surface-900 p-2 rounded-xl shadow-lg shadow-primary/20">
              <Vote size={24} />
            </div>
            <span className="gradient-text hidden xs:block">VoterHelp</span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 font-semibold">
            <NavItems />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 group focus-within:border-primary/50 transition-all">
              <Search size={18} className="text-surface-100/40 group-focus-within:text-primary" />
              <input
                type="text"
                placeholder={t('layout.search_placeholder')}
                className="bg-transparent border-none outline-none text-sm w-24 xl:w-48 focus:w-64 transition-all text-white placeholder:text-surface-100/30"
              />
            </div>
            <NavLink to="/admin" className="p-2 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">
              <ShieldCheck size={20} className="text-surface-100/60 hover:text-primary" />
            </NavLink>
            
            <LanguageSelector />

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 bg-white/5 rounded-xl border border-white/10 text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-800 border-b border-white/10 overflow-hidden sticky top-[73px] z-40"
          >
            <div className="flex flex-col p-6 space-y-4">
              <NavItems onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="bg-surface-800/50 border-b border-white/5 px-4 sm:px-6 py-3 text-[10px] sm:text-xs uppercase tracking-widest font-black flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 sticky top-[73px] md:top-[73px] z-30">
        <span className="opacity-50 text-white/70">{t('layout.progress_label')}</span>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex-grow sm:w-48 md:w-64 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/80 to-primary shadow-[0_0_10px_rgba(91,192,190,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <span className="text-primary font-black min-w-[3rem] text-right">{progress}%</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container-wide section-padding relative z-10">
        <Outlet />
      </main>

      {/* Floating Chatbot Assistant */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100]">
        <AnimatePresence mode="wait">
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
              className="glass-card shadow-3xl w-[calc(100vw-3rem)] sm:w-[380px] mb-4 flex flex-col border-white/20"
            >
              <div className="bg-gradient-to-r from-primary-dark to-primary p-4 flex justify-between items-center">
                <span className="font-bold flex items-center gap-2 text-surface-900">
                  <MessageSquare size={18} /> {t('layout.chat.title')}
                </span>
                <button onClick={() => setIsChatOpen(false)} className="text-surface-900/70 hover:text-surface-900 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="h-[300px] sm:h-96 p-5 overflow-y-auto space-y-4 bg-surface-900/40 custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                      m.isBot 
                        ? 'bg-surface-800 border border-white/10 text-white' 
                        : 'bg-primary text-surface-900 font-medium shadow-lg shadow-primary/20'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-white/10 bg-surface-800/80 flex gap-2">
                <input
                  type="text"
                  value={chatValue}
                  onChange={(e) => setChatValue(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder={t('layout.chat.placeholder')}
                  className="bg-white/5 border border-white/10 outline-none p-3 rounded-xl text-sm flex-grow focus:border-primary/50 transition-all text-white placeholder:text-white/20"
                />
                <button onClick={handleChatSend} className="p-3 bg-primary text-surface-900 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-primary text-surface-900 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(91,192,190,0.3)] relative overflow-hidden group border border-white/20"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="bg-surface-800 border-t border-white/10 py-12 sm:py-20 relative z-10">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            <div className="col-span-1 sm:col-span-2 space-y-6">
              <div className="flex items-center gap-3 text-2xl font-black tracking-tighter text-white">
                <div className="bg-primary text-surface-900 p-2 rounded-xl">
                  <Vote size={24} />
                </div>
                <span className="gradient-text">VoterHelp</span>
              </div>
              <p className="text-surface-100/60 max-w-sm leading-relaxed text-sm sm:text-base">
                {t('footer.desc')}
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">{t('footer.nav_title')}</h4>
              <ul className="space-y-4 text-surface-100/50 text-sm">
                <li><NavLink to="/process" className="hover:text-primary transition-colors">{t('nav.process')}</NavLink></li>
                <li><NavLink to="/timeline" className="hover:text-primary transition-colors">{t('nav.timeline')}</NavLink></li>
                <li><NavLink to="/how-to-vote" className="hover:text-primary transition-colors">{t('nav.how_to_vote')}</NavLink></li>
                <li><NavLink to="/faqs" className="hover:text-primary transition-colors">{t('nav.faqs')}</NavLink></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">{t('footer.resources_title')}</h4>
              <ul className="space-y-4 text-surface-100/50 text-sm font-medium">
                <li className="flex items-center gap-2 hover:text-white cursor-pointer"><ShieldCheck size={16} /> ECI Portal</li>
                <li className="flex items-center gap-2 hover:text-white cursor-pointer"><Search size={16} /> NVSP Service</li>
                <li className="flex items-center gap-2 hover:text-white cursor-pointer"><Home size={16} /> Find My Booth</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 sm:mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-surface-100/30 text-[10px] font-bold uppercase tracking-widest">
            <span className="text-center md:text-left">{t('footer.copyright')}</span>
            <div className="flex gap-6 sm:gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">{t('footer.privacy')}</span>
              <span className="hover:text-white cursor-pointer transition-colors">{t('footer.terms')}</span>
              <span className="hover:text-white cursor-pointer transition-colors">{t('footer.security')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavItems = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <>
      <NavLink onClick={onClick} to="/" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
        <Home size={18} /> {t('nav.home')}
      </NavLink>
      <NavLink onClick={onClick} to="/process" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
        <ClipboardList size={18} /> {t('nav.process')}
      </NavLink>
      <NavLink onClick={onClick} to="/timeline" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
        <Clock size={18} /> {t('nav.timeline')}
      </NavLink>
      <NavLink onClick={onClick} to="/how-to-vote" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
        <Vote size={18} /> {t('nav.how_to_vote')}
      </NavLink>
      <NavLink onClick={onClick} to="/faqs" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
        <HelpCircle size={18} /> {t('nav.faqs')}
      </NavLink>
    </>
  );
};

export default MainLayout;
