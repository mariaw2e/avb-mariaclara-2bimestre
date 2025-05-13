import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Função para cores dos tipos
function getTypeColor(type) {
  const colors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
  };
  return colors[type] || "#777";
}

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cores personalizadas (da sua página antiga)
  const colors = {
    background: "#dcafa3",  // Rosa claro
    text: "#5c3a2e",        // Marrom escuro
    accent: "#8d5a4a",      // Marrom médio
    light: "#f0e0d8"        // Bege claro
  };

  // Busca a lista inicial de Pokémon
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=151`); // Pegando os primeiros 151
        const pokemonDetailsPromises = response.data.results.map(pokemon =>
          axios.get(pokemon.url) // Busca os detalhes de cada Pokémon usando a URL
        );
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemons(pokemonDetails.map(res => res.data));
      } catch (error) {
        console.error("Erro ao buscar lista de Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <div style={{
      backgroundColor: colors.background,
      minHeight: "100vh",
      padding: "40px 20px"   // Aumentei o padding geral
    }}>
      <h1 style={{
        color: colors.text,
        textAlign: "center",
        marginBottom: "40px",   // Aumentei o espaçamento
        fontSize: "2.8rem",
        textShadow: `2px 2px 4px rgba(0,0,0,0.1)`,
        fontWeight: "bold"
      }}>
        Pokedex fofa da Mariaw2e
      </h1>

      {loading ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px"
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: `5px solid ${colors.accent}`,
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",   // Cards maiores
          gap: "30px",   // Aumentei o espaçamento entre cards
          maxWidth: "1400px",   // Container mais largo
          margin: "0 auto",
          padding: "20px"
        }}>
          {pokemons.map(pokemon => (
            <Link
              to={`/detalhes/${pokemon.name}`}
              key={pokemon.id}
              style={{
                textDecoration: "none",
                color: colors.text,
                height: "100%" // Garante que o Link ocupe a altura total do card
              }}
            >
              <div style={{
                backgroundColor: colors.light,
                borderRadius: "20px",
                padding: "25px",   // Mais espaço interno
                boxShadow: `0 6px 12px ${colors.accent}40`,
                transition: "all 0.3s ease",
                cursor: "pointer",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ':hover': {
                  transform: "translateY(-8px)",
                  boxShadow: `0 10px 20px ${colors.accent}60`
                }
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "15px"   // Espaçamento entre elementos
                }}>
                  <img
                    src={pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default}
                    alt={pokemon.name}
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "contain",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                    }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <h3 style={{
                      fontSize: "1.8rem",
                      textTransform: "capitalize",
                      margin: "10px 0",
                      color: colors.accent,
                      fontWeight: "600"
                    }}>
                      #{pokemon.id?.toString().padStart(3, '0')} - {pokemon.name}
                    </h3>

                    <div style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "12px",   // Mais espaço entre tipos
                      marginBottom: "15px"
                    }}>
                      {pokemon.types?.map((type, index) => (
                        <span
                          key={index}
                          style={{
                            padding: "6px 15px",
                            borderRadius: "20px",
                            backgroundColor: getTypeColor(type.type.name),
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
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
          ))}
        </div>
      )}

      <footer style={{
        marginTop: "60px",   // Mais espaço acima do footer
        padding: "20px",
        textAlign: "center",
        color: colors.text,
        fontSize: "1rem"
      }}>
        <p>Dados providos pela PokeAPI | Projeto Pokémon</p>
      </footer>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}