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

  const [selectedCategory, setSelectedCategory] = useState("Tutte");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filtra e ordina i giochi
  const filteredAndSortedGames = games
    .filter(
      (game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "Tutte" ||
          game.category
            .split(",")
            .map((cat) => cat.trim())
            .includes(selectedCategory))
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * sortOrder;
      if (a[sortBy] > b[sortBy]) return 1 * sortOrder;
      return 0;
    });

  // Stringa per capire se l'ordine è crescente o decrescente
  const sortAz = sortOrder === 1 ? "- Ordine: A - z" : "- Ordine: Z - a";

  const categories = [
    "Tutte",
    ...new Set(
      games
        .flatMap(game => game.category.split(",").map(cat => cat.trim()))
    ),
  ]; 

  // Flatmap mi serve per avere un array piatto di categorie, cosi splitto e poi faccio il map 
// uso new Set per ottenere le categorie uniche dai giochi.
  console.log("Categorie:", categories);
  

  return (
    <div className="games-pages">
      <p>
        Qui puoi trovare una lista completa dei giochi disponibili. Clicca su un
        gioco per vedere i dettagli.
      </p>

      <div className="search-and-filter">
        <input
        type="text"
        placeholder="Cerca un gioco..."
        className="search-name-input"
        // value={searchQuery}
        onChange={(e) => debouncedSetSearchQuery(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="search-category-select"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      </div>

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
