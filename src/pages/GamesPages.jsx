import React, { useCallback } from "react";
import { useState } from "react";
import debounce from "lodash.debounce";
// import GameCard from "../../components/GameCard";
import games from "../../database/game.json"; // Importa i dati dei giochi
import { Link } from "react-router-dom";

export default function GamesPages() {
  
    const [searchQuery, setSearchQuery] = useState("");
  const debouncedSetSearchQuery = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(-sortOrder); // Inverti l'ordine se il campo è già selezionato
    } else {
      setSortBy(field);
      setSortOrder(1); // Imposta l'ordine crescente per il nuovo campo
    }
  };

  // Filtra e ordina i giochi
  const filteredAndSortedGames = games
    .filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * sortOrder;
      if (a[sortBy] > b[sortBy]) return 1 * sortOrder;
      return 0;
    });

  // Stringa per capire se l'ordine è crescente o decrescente
  const sortAz = sortOrder === 1 ? "- Ordine: A - z" : "- Ordine: Z - a";

  return (
    <div className="games-pages">
      <h1>Lista dei giochi</h1>
      <p>
        Qui puoi trovare una lista completa dei giochi disponibili. Clicca su un
        gioco per vedere i dettagli.
      </p>

      <input
        type="text"
        placeholder="Cerca un gioco..."
        className="search-name-input"
        // value={searchQuery}
        onChange={(e) => debouncedSetSearchQuery(e.target.value)}
      />

      <div>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>
                Nome gioco {sortBy === "title" && sortAz}
              </th>
              <th onClick={() => handleSort("category")}>
                Categoria gioco {sortBy === "category" && sortAz}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedGames.map((game) => (
              <tr key={game.id}>
                <td>
                  <Link to={`/gamelist/${game.id}`}>{game.title}</Link>
                </td>
                <td>{game.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
