import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CampaignProvider } from './components/CampaignContext.tsx';
import { PlayerProvider } from './components/PlayerContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlayerProvider>
      <CampaignProvider>
        <App />
      </CampaignProvider>
    </PlayerProvider>
  </StrictMode>,
);
