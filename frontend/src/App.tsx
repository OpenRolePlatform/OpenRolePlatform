import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/* import './App.css'; */
import LayoutWrap from './components/Layout';
import Character from './pages/character';
import LandingPage from './pages/landing-page';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutWrap />}>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/character" element={<Character />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
