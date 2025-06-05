import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../../components/PokemonCard/index.jsx'; // Mantenha o .jsx aqui
import { colors, typeColors } from '../../config/theme';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');

        const pokemonDetailsPromises = response.data.results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          // REMOVA O 'return' DAQUI (era a linha 24 que você apontou)
          return { // ESTE 'return' ESTÁ CORRETO AQUI PARA A FUNÇÃO ASYNC INTERNA
            id: pokemonResponse.data.id,
            name: pokemonResponse.data.name,
            sprites: pokemonResponse.data.sprites,
            types: pokemonResponse.data.types.map(t => t.type)
          };
        });

        const allPokemons = await Promise.all(pokemonDetailsPromises);
        setPokemons(allPokemons);
      } catch (err) {
        setError("Erro ao carregar os Pokémon.");
        console.error("Erro ao buscar Pokémon:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || pokemon.types.some(type => type.name === filterType);
    return matchesSearch && matchesType;
  });

  if (loading) return <p style={{ textAlign: 'center', fontSize: '1.5rem', color: colors.text }}>Carregando Pokémon...</p>;
  if (error) return <p style={{ textAlign: 'center', fontSize: '1.5rem', color: 'red' }}>{error}</p>;

  const allTypes = [...new Set(pokemons.flatMap(p => p.types.map(t => t.name)))].sort();

  return (
    <div style={{
      backgroundColor: colors.background,
      minHeight: '100vh',
      padding: '40px 20px',
      color: colors.text
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '3.5rem',
        color: colors.primary,
        marginBottom: '40px',
        textShadow: `2px 2px 4px rgba(0,0,0,0.15)`
      }}>
        Pokedex Fofa da Mariaw2e
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '12px 20px',
            borderRadius: '10px',
            border: `1px solid ${colors.primary}`,
            width: '100%',
            maxWidth: '400px',
            fontSize: '1.1rem',
            backgroundColor: colors.secondary,
            color: colors.text,
            boxShadow: `0 4px 8px ${colors.primary}20`,
            outline: 'none'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <label htmlFor="type-filter" style={{ fontSize: '1.2rem', color: colors.text, fontWeight: 'bold' }}>
            Filtrar por Tipo:
          </label>
          <select
            id="type-filter"
            value={filterType}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">Todos</option>
            {allTypes.map(type => (
              <option key={type} value={type} style={{ textTransform: 'capitalize' }}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingBottom: '50px'
      }}>
        {filteredPokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}