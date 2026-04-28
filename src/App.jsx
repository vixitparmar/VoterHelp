import React, { useEffect } from 'react';
import AppRouter from './routes';
import useStore from './services/store';
import './App.css';

function App() {
  const initAuth = useStore(state => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return <AppRouter />;
}

export default App;
