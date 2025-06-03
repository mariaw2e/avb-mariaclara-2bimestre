import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';

// Função para cores dos tipos (mantenha ou importe)
const getTypeColor = (type) => {
  const colors = {
    normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
    grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
    ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
    steel: "#B8B8D0", fairy: "#EE99AC"
  };
  return colors[type] || "#777";
};

// Cores do layout (mantenha ou importe)
const colors = {
  background: "#dcafa3",
  text: "#5c3a2e",
  accent: "#8d5a4a",
  light: "#f0e0d8"
};

const PokemonDetailCard = ({ pokemon }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <div
      style={{
        backgroundColor: colors.light,
        borderRadius: '20px',
        padding: '40px',
        boxShadow: `0 8px 16px ${colors.accent}40`,
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '25px',
        position: 'relative'
      }}
    >
      {/* Botão de Favoritar */}
      <button
        onClick={handleFavoriteClick}
        style={{
          position: 'absolute',
          top: '25px',
          right: '25px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '2.5rem', // Ajuste o tamanho do coração de texto
          color: favorite ? 'red' : colors.accent,
          zIndex: 10
        }}
        aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {favorite ? '❤️' : '♡'} {/* ÍCONE DE TEXTO AQUI */}
      </button>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}>
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          style={{
            width: '250px',
            height: '250px',
            objectFit: 'contain',
            filter: "drop-shadow(0 8px 15px rgba(0,0,0,0.3))"
          }}
        />
        <h2 style={{
          color: colors.accent,
          margin: 0,
          textTransform: 'capitalize',
          fontSize: '3rem',
          fontWeight: '700',
          textShadow: `1px 1px 3px rgba(0,0,0,0.15)`
        }}>
          #{pokemon.id?.toString().padStart(3, '0')} - {pokemon.name}
        </h2>
        <p style={{
          marginTop: '5px', fontStyle: 'italic', fontSize: '1.2rem',
          color: colors.text, fontWeight: '500'
        }}>
          {pokemon.category}
        </p>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px'
      }}>
        {pokemon.types?.map((type, i) => (
          <span
            key={i}
            style={{
              padding: '10px 25px', borderRadius: '30px',
              backgroundColor: getTypeColor(type), color: 'white',
              fontWeight: 'bold', fontSize: '1.1rem',
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
            }}
          >
            {type}
          </span>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{
          marginBottom: '10px', fontSize: '1.5rem', color: colors.text, fontWeight: '600'
        }}>
          Descrição:
        </h3>
        <p style={{
          margin: 0, lineHeight: '1.8', fontSize: '1.1rem', color: colors.text
        }}>
          "{pokemon.description}"
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h3 style={{
          marginBottom: '10px', fontSize: '1.5rem', color: colors.text, fontWeight: '600', textAlign: 'center'
        }}>
          Estatísticas Base:
        </h3>
        {pokemon.stats?.map((stat, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ textTransform: 'capitalize', color: colors.text, fontWeight: '500' }}>{stat.name.replace('-', ' ')}:</span>
            <span style={{ color: colors.accent, fontWeight: 'bold' }}>{stat.value}</span>
            <div style={{
              flexGrow: 1, height: '8px', backgroundColor: colors.background,
              borderRadius: '4px', marginLeft: '10px', position: 'relative'
            }}>
              <div style={{
                width: `${(stat.value / 255) * 100}%`,
                height: '100%', backgroundColor: getTypeColor(stat.name === 'hp' ? 'grass' : stat.name === 'attack' ? 'fire' : stat.name === 'defense' ? 'rock' : 'normal'),
                borderRadius: '4px',
                transition: 'width 0.5s ease-in-out'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetailCard;