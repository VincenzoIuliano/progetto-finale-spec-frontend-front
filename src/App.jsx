import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavLink } from 'react-router-dom'
import games from "../database/game.json"; // importa i giochi
// import GameCard from '../components/gameCard'
// import games from '../database/game.json'
import './App.css'
import HomePage from './pages/HomePage'
import GamesPages from './pages/GamesPages'
import GameCard from '../components/gameCard'
import ComparatorPage from './pages/ComparatorPage';
import FavouritesPage from './pages/FavouritesPage';


function App() {

  return (
    <BrowserRouter>
      {/* Navbar con link alle pagine principali */}
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/gamelist">Lista dei giochi</NavLink>
        <NavLink to="/comparator">Comparatore</NavLink>
        <NavLink to="/favourites">Preferiti</NavLink>
      </nav>

      <div className="App">
        <Routes>
          {/* Route default per mostrare Homepage con messaggio di benvenuto */}
          <Route path="/" element={<HomePage />} />

          {/* Route per mostrare la lista dei giochi*/}
          <Route
            path="/gamelist"
            element={<GamesPages />}
          />

          {/* Route per il comparatore*/}
          <Route path="/comparator" element={<ComparatorPage />}></Route>

          {/* Route per la pagina dettaglio del gioco */}
          <Route path="/gamelist/:id" element={<GameCard games={games} />} />

          {/* Route per la pagina dei preferiti */}
          {<Route path="/favourites" element={<FavouritesPage />} /> }

          {/* Route per gestire pagine non trovate */}
          <Route
            path="*"
            element={
              <div>
                <h1>Pagina non trovata</h1>
                <p>La pagina che stai cercando non esiste.</p>
              </div>
            } />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Italian Games Comparator. Made by Boolean.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App
