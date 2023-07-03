import axios from 'axios';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritePage from './pages/FavoritePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

axios.defaults.baseURL = "http://localhost:4001";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/favorites' element={<FavoritePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
