import React from "react";
import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";

const GameCard = ({ games }) => {

  // Recupera l'ID del gioco dalla URL
  const { id } = useParams();

  const game = games.find((g) => g.id === parseInt(id));

  // Stato per i preferiti
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  // Funzione toggle per i preferiti
  const toggleFavourite = () => {
    setFavourites((prev) =>
      prev.includes(game.id)
        ? prev.filter((gid) => gid !== game.id)
        : [...prev, game.id]
    );
  };

  const isFavourite = favourites.includes(game.id);
  console.log(favourites);
  

  // Aggiorna localStorage quando cambia favourites
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);


  // Se il gioco non esiste, mostra un messaggio
  if (!game) {
    return <div>Gioco non trovato.</div>;
  }

  return (
    <div className="game-card">
      <div>
        <figure>
        <img
          className="game-image"
          src={game.image}
          alt={game.title}
        />
      </figure>
      <button onClick={toggleFavourite} className="favourite-btn">
          {isFavourite ? "★ Rimuovi dai preferiti" : "☆ Aggiungi ai preferiti"}
        </button>
      </div>
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