import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutWrap from './components/Layout';
import CampaignDetailsPage from './pages/campaing/CampaignDetailsPage';
import Campaigns from './pages/campaing/Campaigns';
import Character from './pages/character/Character';
import Characters from './pages/characters/Characters';
import Dashboard from './pages/Dashboard';
import Items from './pages/items/Items';
import MainPage from './pages/MainPage';
import Notes from './pages/Notes';
import './styles/layout.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrap />}>
          <Route index element={<MainPage />} />
          <Route path="/dm" element={<Dashboard />} />
          {/* Campaigns routes */}
          <Route path="/campaigns">
            <Route index element={<Campaigns />} />
            <Route path=":campaignID" element={<CampaignDetailsPage />} />
          </Route>
          <Route path="/items" element={<Items />} />
          <Route path="/notes" element={<Notes />} />
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
