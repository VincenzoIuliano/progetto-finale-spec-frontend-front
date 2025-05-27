import React, { useState } from "react";
import { Link } from "react-router-dom";
import games from "../../database/game.json";

export default function ComparatorPage() {
  const [selectedGames, setSelectedGames] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = (gameId) => {
    if (selectedGames.includes(gameId)) {
      setSelectedGames(selectedGames.filter((id) => id !== gameId));
    } else if (selectedGames.length < 2) {
      setSelectedGames([...selectedGames, gameId]);
    }
  };

  return (
    <div className="comparator-page">
      <p>
        Qui puoi confrontare i giochi in base a diverse caratteristiche. Seleziona i giochi che vuoi confrontare e visualizza le loro differenze.
      </p>
      <div>
        <table>
          <thead>
            <tr>
              <th>Puoi selezionare solo due giochi da confrontare!</th>
              <th>Nome gioco</th>
            </tr>
          </thead>
          <tbody>
            {games
              .slice()
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((game) => (
                <tr key={game.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedGames.includes(game.id)}
                      onChange={() => handleCheckboxChange(game.id)}
                      disabled={
                        !selectedGames.includes(game.id) &&
                        selectedGames.length >= 2
                      }
                    />
                  </td>
                  <td>
                    <Link to={`/gamelist/${game.id}`}>{game.title}</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className="compare-button" onClick={() => setShowModal(true)}>
          Compara ora i giochi selezionati!
        </button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{color: "greenyellow"}}>Confronto Giochi</h2>
            {selectedGames.length === 2 ? (
              <div className="comparison-details">
                {selectedGames.map((gameId) => {
                  const game = games.find((g) => g.id === gameId);
                  return (
                    <div key={game.id} className="game-comparison">
                      <h3>{game.title}</h3>
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
                        <strong>Piattaforme:</strong>{" "}
                        {game.platforms.join(", ")}
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
                  );
                })}
              </div>
            ) : (
              <p style={{color: "greenyellow"}}>Seleziona due giochi per confrontarli.</p>
            )}
            <button onClick={() => setShowModal(false)}>Chiudi</button>
          </div>
        </div>
      )}
    </div>
  );
}