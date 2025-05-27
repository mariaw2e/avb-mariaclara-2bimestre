import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext'; // Importe o hook
import { HeartFillIcon, HeartOutlineIcon } from 'components/Icons'; // Crie esses ícones no próximo passo

// Função para cores dos tipos (pode ser importada de um arquivo utils/colors.js se for usada em muitos lugares)
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

// Cores do layout (podem ser importadas de um arquivo de configuração de tema)
const colors = {
  background: "#dcafa3",
  text: "#5c3a2e",
  accent: "#8d5a4a",
  light: "#f0e0d8"
};

const PokemonCard = ({ pokemon }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Impede a navegação para a página de detalhes
    if (favorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <Link to={`/detalhes/${pokemon.name}`} style={{
      textDecoration: "none",
      color: colors.text,
      display: "flex",
      height: "100%"
    }}>
      <div style={{
        backgroundColor: colors.light,
        borderRadius: "25px",
        padding: "30px",
        boxShadow: `0 8px 16px ${colors.accent}40`,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        cursor: "pointer",
        height: "100%",
        width: "100%", // Garante que o card ocupe o espaço disponível no grid
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: 'relative', // Para posicionar o botão de favorito
        ':hover': {
          transform: "scale(1.05)",
          boxShadow: `0 12px 24px ${colors.accent}60`
        }
      }}>
        {/* Botão de Favoritar */}
        <button
          onClick={handleFavoriteClick}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '2rem',
            color: favorite ? 'red' : colors.accent, // Cor do coração
            zIndex: 10 // Garante que o botão esteja acima da imagem
          }}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {favorite ? <HeartFillIcon /> : <HeartOutlineIcon />}
        </button>

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px"
        }}>
          <img
            src={pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default}
            alt={pokemon.name}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
              filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.25))"
            }}
          />
          <div style={{ textAlign: "center" }}>
            <h3 style={{
              fontSize: "2rem",
              textTransform: "capitalize",
              margin: "15px 0",
              color: colors.accent,
              fontWeight: "700",
              textShadow: `1px 1px 2px rgba(0,0,0,0.1)`
            }}>
              #{pokemon.id?.toString().padStart(3, '0')} - {pokemon.name}
            </h3>

            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginBottom: "20px"
            }}>
              {pokemon.types?.map((type, index) => (
                <span
                  key={index}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "25px",
                    backgroundColor: getTypeColor(type.type.name),
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.2)"
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;