import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutWrap from './components/Layout';
import Character from './pages/character/character';
import LandingPage from './pages/landing-page';
import Test from './pages/test';
import './styles/layout.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrap />}>
          <Route path="/test" element={<Test></Test>}></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/character/:characterID" element={<Character />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
