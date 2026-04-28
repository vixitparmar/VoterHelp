import React from 'react';
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => Promise.resolve(),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
    footer: ({ children, ...props }) => <footer {...props}>{children}</footer>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { onChange: vi.fn() } }),
  useSpring: (val) => val,
  useTransform: (val, r1, r2) => r2[0],
}));

// Mock lucide-react icons manually
vi.mock('lucide-react', () => {
  const iconNames = [
    'Settings', 'RefreshCw', 'AlertCircle', 'Database', 'Activity', 'Globe', 
    'ShieldCheck', 'Cpu', 'Search', 'MessageCircle', 'Plus', 'Minus',
    'Sparkles', 'ChevronRight', 'Zap', 'Target', 'Clock', 'HelpCircle', 
    'ClipboardList', 'UserCheck', 'ClipboardCheck', 'Calendar', 'CheckCircle2',
    'Circle', 'MapPin', 'CheckCircle', 'XCircle', 'Fingerprint', 'MousePointer2',
    'FileText', 'Info', 'Menu', 'X', 'Facebook', 'Twitter', 'Instagram', 'Youtube',
    'ArrowRight', 'ChevronLeft', 'UserPlus', 'Vote', 'ChevronDown', 'ChevronUp',
    'Send', 'Sparkle', 'Check', 'MessageSquare', 'Calculator', 'Trophy', 'Home',
    'LayoutDashboard', 'Globe2', 'HelpCircle', 'Lightbulb'
  ];
  
  const mocks = {};
  iconNames.forEach(name => {
    mocks[name] = (props) => <div data-testid={`icon-${name.toLowerCase()}`} {...props} />;
  });
  
  return mocks;
});

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
