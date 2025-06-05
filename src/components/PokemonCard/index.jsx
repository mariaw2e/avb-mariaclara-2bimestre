import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';


// Cores do layout (mantenha ou importe de um arquivo de configuração de tema)
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
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: 'relative',
        ':hover': { // Note: this ':hover' style won't work with inline styles directly, it's a CSS pseudo-class. You'd need a CSS-in-JS library or a separate CSS file for this.
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
            fontSize: '2rem', // Ajuste o tamanho do coração de texto
            color: favorite ? 'red' : colors.accent, // Cor do coração
            zIndex: 10
          }}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {favorite ? '❤️' : '♡'} {/* ÍCONE DE TEXTO AQUI */}
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
                    backgroundColor: typeColors[type.name] || "#777", // MUDANÇA AQUI: de 'type.type.name' para 'type.name'
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.2)"
                  }}
                >
                  {type.name} {/* MUDANÇA AQUI: de 'type.type.name' para 'type.name' */}
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