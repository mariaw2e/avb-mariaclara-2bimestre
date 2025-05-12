// src/pages/Detalhes/index.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Detalhes() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="detalhes-container">
      <Link to="/" className="back-button">← Voltar</Link>
      
      {pokemon && (
        <div className="pokemon-card">
          <h2>#{pokemon.id} - {pokemon.name}</h2>
          
          <div className="pokemon-image">
            <img 
              src={pokemon.sprites.other['official-artwork'].front_default} 
              alt={pokemon.name}
            />
          </div>

          <div className="pokemon-info">
            <div className="types">
              {pokemon.types.map((type, index) => (
                <span key={index} className={`type ${type.type.name}`}>
                  {type.type.name}
                </span>
              ))}
            </div>

            <div className="stats">
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="stat-bar">
                  <span>{stat.stat.name}:</span>
                  <progress value={stat.base_stat} max="255"></progress>
                  <span>{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}