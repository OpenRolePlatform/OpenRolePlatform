import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutWrap from './components/Layout';
import Character from './pages/character/character';
import Dashboard from './pages/Dashboard';
import MainPage from './pages/MainPage';
import Test from './pages/test';
import './styles/layout.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrap />}>
          <Route path="/test" element={<Test></Test>}></Route>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/dm" element={<Dashboard />}></Route>
          <Route path="/character/:characterID" element={<Character />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
