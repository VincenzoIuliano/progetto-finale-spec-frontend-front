import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavLink } from 'react-router-dom'
import GameCard from '../components/gameCard'
import games from '../database/game.json'
import './App.css'
import HomePage from './pages/HomePage'


function App() {

  return (
    <BrowserRouter>
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/gamelist">Lista dei giochi</NavLink>
        <NavLink to="/comparator">Comparatore</NavLink>
      </nav>

      <div className="App">
        <Routes>
          {/* Rotta default per mostrare Homepage con messaggio di benvenuto */}
          <Route path="/" element={<HomePage />} />

          {/* Route per mostrare la lista dei giochi*/}
          <Route
            path="/gamelist"
            element={
              <div className="game-list">
                {games.map((game, index) => (
                  <GameCard key={index} game={game} />
                ))}
              </div>
            }
          />

          {/* Route per il comparatore*/}
          <Route path="/comparator" element={<h1>Comparatore</h1>}></Route>
        </Routes>
      </div>
      <footer className="footer">
        <p>© 2025 Italian Games Comparator. Made by Boolean.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App
