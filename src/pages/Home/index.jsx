import axios from "axios";
import { useEffect, useState } from "react";
// Remova Link e useFavorites daqui, eles serão usados dentro do PokemonCard
// import { Link } from "react-router-dom";
// import { useFavorites } from '../../context/FavoritesContext';

import PokemonCard from '../../components/PokemonCard'; // Importe o componente

// Função para cores dos tipos (remova daqui se mover para um arquivo separado como utils/colors.js)
function getTypeColor(type) { /* ... cores ... */ }

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const [allTypes, setAllTypes] = useState([]);

  const colors = { /* ... cores do layout ... */ };

  useEffect(() => {
    // ... (mesma lógica de busca de pokemons e tipos) ...
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=151`);
        const pokemonDetailsPromises = response.data.results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        });
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();

    const fetchTypes = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type`);
        setAllTypes(["all", ...response.data.results.map(type => type.name)]);
      } catch (error) {
        console.error("Erro ao buscar tipos:", error);
      }
    };

    fetchTypes();
  }, []);

  const filteredPokemons = selectedType === "all"
    ? pokemons
    : pokemons.filter(pokemon =>
      pokemon.types.some(typeInfo => typeInfo.type.name === selectedType)
    );

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div style={{ /* ... estilos do container ... */ }}>
      <h1 style={{ /* ... estilos do título ... */ }}>
        Pokedex fofa da Mariaw2e
      </h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="typeFilter" style={{ marginRight: '10px', color: colors.text }}>Filtrar por Tipo:</label>
        <select id="typeFilter" value={selectedType} onChange={handleTypeChange} style={{ padding: '8px', borderRadius: '5px', borderColor: colors.accent, color: colors.text, backgroundColor: colors.light }}>
          {allTypes.map(type => (
            <option key={type} value={type}>{type === "all" ? "Todos" : type}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ /* ... estilos do loading ... */ }}>{/* ... spinner ... */}</div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "40px",
          maxWidth: "1400px",
          width: "90%",
          margin: "0 auto",
          padding: "20px",
          alignItems: "stretch"
        }}>
          {filteredPokemons.map(pokemon => (
            // Use o componente PokemonCard aqui
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      <footer style={{ /* ... estilos do footer ... */ }}>{/* ... footer ... */}</footer>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}