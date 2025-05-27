import React from "react";
import { useParams } from "react-router-dom";

const GameCard = ({ games }) => {

  // Recupera l'ID del gioco dalla URL
  const { id } = useParams();

  const game = games.find((g) => g.id === parseInt(id));

  if (!game) {
    return <div>Gioco non trovato.</div>;
  }

  return (
    <div className="game-card">
      <figure>
        <img
          className="game-image"
          src={game.image}
          alt={game.title}
          // style={{ width: "100%", borderRadius: "8px" }}
        />
      </figure>
      <div className="game-details">
        <h2>{game.title}</h2>
        <p>
          <strong>Categoria:</strong> {game.category}
        </p>
        <p>
          <strong>Descrizione:</strong> {game.description}
        </p>
        <p>
          <strong>Data di rilascio:</strong>{" "}
          {new Date(game.releaseDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Piattaforme:</strong> {game.platforms.join(", ")}
        </p>
        <p>
          <strong>Multigiocatore Online:</strong>{" "}
          {game.multiplayer_online ? "Sì" : "No"}
        </p>
        <p>
          <strong>Multigiocatore Locale:</strong>{" "}
          {game.multiplayer_local ? "Sì" : "No"}
        </p>
        <p>
          <strong>Coop:</strong> {game.coop ? "Sì" : "No"}
        </p>
      </div>
    </div>
  );
};

export default GameCard;