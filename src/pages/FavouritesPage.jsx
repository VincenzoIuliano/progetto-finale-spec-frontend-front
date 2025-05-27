import React, { useState, useEffect } from "react";
import games from "../../database/game.json";
import GameCard from "../../components/gameCard";
import { Link } from "react-router-dom";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favourites");
    setFavourites(saved ? JSON.parse(saved) : []);
  }, []);

  // Filtra i giochi preferiti
  const favouriteGames = games.filter((game) => favourites.includes(game.id));

  return (
    <><div className="favourites-page">
      <h1>Giochi Preferiti</h1>
      <p>Qui puoi vedere i tuoi giochi preferiti.</p>
    </div><div>
        {favouriteGames.length === 0 ? (
          <p>Nessun gioco nei preferiti.</p>
        ) : (
          <div className="favourites-list">
            {favouriteGames.map((game) => (
              <div key={game.id} className="favourite-card">
                <img
                  src={game.image}
                  alt={game.title}
                  style={{ width: "100px" }} />
                <h3>{game.title}</h3>
                <Link to={`/gamelist/${game.id}`}>Vai alla scheda</Link>
              </div>
            ))}
          </div>
        )}
      </div></>
  );
};

export default FavouritesPage;
