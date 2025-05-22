import React from 'react'
import GameCard from '../components/gameCard'
import games from '../database/game.json'
import './App.css'

function App() {

  return (
     <div style={{ padding: '20px' }}>
      <h1>Videogiochi</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        {games.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    </div>
  )
}

export default App
