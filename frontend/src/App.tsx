import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutWrap from './components/Layout';
import CampaignDetails from './pages/campaing/CampaignDetails';
import Campaigns from './pages/campaing/Campaigns';
import NewCampaign from './pages/campaing/NewCampaign';
import Character from './pages/character/character';
import Characters from './pages/Characters';
import Dashboard from './pages/Dashboard';
import MainPage from './pages/MainPage';
import './styles/layout.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrap />}>
          <Route index element={<MainPage />} />
          <Route path="/dm" element={<Dashboard />} />
          {/* Campaings routes */}
          <Route path="/campaigns">
            <Route index element={<Campaigns />} />
            <Route path=":campaignID" element={<CampaignDetails />} />
            <Route path="new" element={<NewCampaign />} />
          </Route>
          {/* Characters routes */}
          <Route path="/characters">
            <Route index element={<Characters />} />
            <Route path=":characterID" element={<Character />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
