import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Results from './Results';
import CityDetail from './CityDetail';
import SavedTrips from './SavedTrips';
import Login from './Login';
import Register from './Register';
import ProfileMenu from '../../components/ProfileMenu';
import MobileMenu from '../../components/MobileMenu';

function AppContent() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="container header__inner">
          <h1 className="logo">Бюджетный компас</h1>
          <nav className="nav nav--desktop">
            <NavLink to="/" end>Главная</NavLink>
            <NavLink to="/results">Результаты</NavLink>
            <ProfileMenu />
          </nav>
          <div className="nav--mobile">
            <MobileMenu />
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="results" element={<Results />} />
          <Route path="city/:id" element={<CityDetail />} />
          <Route path="saved" element={<SavedTrips />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">
        </div>
      </footer>
    </div>
  );
}

export default function TravelApp() {
  return <AppContent />;
}

