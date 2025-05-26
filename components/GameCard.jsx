import React from "react";

const GameCard = ({ game }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '300px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    }}>
      {/* <img
        src={game.image}
        alt={game.title}
        style={{ width: '100%', borderRadius: '8px' }}
      /> */}
      <h2>{game.title}</h2>
      <p><strong>Categoria:</strong> {game.category}</p>
      {/* <p>{game.description}</p>
      <p>Data di rilascio: {new Date(game.releaseDate).toLocaleDateString()}</p>
      <p><strong>Piattaforme:</strong> {game.platforms.join(', ')}</p>
      <p><strong>Multigiocatore Online:</strong> {game.multiplayer_online ? "Sì" : "No"}</p>
      <p><strong>Multigiocatore Locale:</strong> {game.multiplayer_local ? "Sì" : "No"}</p>
      <p><strong>Coop:</strong> {game.coop ? "Sì" : "No"}</p> */}
    </div>
  );
};

export default GameCard;