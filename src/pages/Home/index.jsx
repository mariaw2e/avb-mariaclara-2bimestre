import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Cores personalizadas
  const colors = {
    background: "#dcafa3",
    text: "#5c3a2e",     
    accent: "#8d5a4a",    
    light: "#f0e0d8"      
  };

  // Busca Pokémon por nome/ID ou aleatório
  const fetchPokemon = async (search = "") => {
    setLoading(true);
    try {
      let pokemonId;
      if (search) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
        pokemonId = response.data.id;
      } else {
        pokemonId = Math.floor(Math.random() * 151) + 1;
      }
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      setPokemon(response.data);
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
      alert("Pokémon não encontrado!");
    } finally {
      setLoading(false);
    }
  };

  // Busca inicial
  useEffect(() => {
    fetchPokemon();
  }, []);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchPokemon(searchTerm.trim());
    }
  };

  return (
    <div style={{ 
      backgroundColor: colors.background,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px"
    }}>
      {/* Barra de Pesquisa */}
      <form 
        onSubmit={handleSearch}
        style={{
          width: "90%",
          maxWidth: "900px",
          marginBottom: "20px"
        }}
      >
        <div style={{
          display: "flex",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <input
            type="text"
            placeholder="Pesquisar Pokémon por nome ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 20px",
              border: "none",
              backgroundColor: colors.light,
              color: colors.text,
              fontSize: "1rem"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 25px",
              border: "none",
              backgroundColor: colors.accent,
              color: colors.light,
              cursor: "pointer",
              transition: "background-color 0.3s",
              fontWeight: "bold"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#c49e93"}
            onMouseOut={(e) => e.target.style.backgroundColor = colors.accent}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </form>

      {/* Card do Pokémon */}
      <div 
        style={{ 
          width: "90%",
          maxWidth: "900px",
          backgroundColor: colors.light,
          padding: "30px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: `2px solid ${colors.accent}`,
          cursor: "pointer"
        }}
        onClick={() => !loading && fetchPokemon()}
      >
        {pokemon && (
          <>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <img 
                  src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default} 
                  alt={pokemon.name}
                  style={{ 
                    height: "250px", 
                    filter: "drop-shadow(0 0 8px rgba(0,0,0,0.2))" 
                  }}
                />
              </div>
              
              <div style={{ flex: 1, textAlign: "left", color: colors.text }}>
                <h3 style={{ 
                  fontSize: "2.5rem",
                  textTransform: "capitalize",
                  margin: "0 0 20px 0",
                  color: colors.accent
                }}>
                  #{pokemon.id.toString().padStart(3, '0')} - {pokemon.name}
                </h3>
                
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ marginBottom: "5px" }}>Tipo(s):</h4>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {pokemon.types.map((type, index) => (
                      <span 
                        key={index} 
                        style={{
                          padding: "5px 15px",
                          borderRadius: "20px",
                          backgroundColor: getTypeColor(type.type.name),
                          color: "white",
                          fontWeight: "bold"
                        }}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ marginBottom: "5px" }}>Habilidades:</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {pokemon.abilities.map((ability, index) => (
                      <span 
                        key={index} 
                        style={{
                          padding: "5px 15px",
                          borderRadius: "20px",
                          backgroundColor: colors.accent,
                          color: colors.light
                        }}
                      >
                        {ability.ability.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ 
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "15px",
              color: colors.text
            }}>
              {pokemon.stats.map((stat, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontSize: "0.9rem",
                    marginBottom: "5px",
                    fontWeight: "bold"
                  }}>
                    {stat.stat.name.toUpperCase().replace("-", " ")}
                  </div>
                  <div style={{ 
                    height: "10px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                    overflow: "hidden"
                  }}>
                    <div 
                      style={{ 
                        height: "100%",
                        width: `${(stat.base_stat / 255) * 100}%`,
                        backgroundColor: colors.accent,
                        borderRadius: "5px"
                      }}
                    />
                  </div>
                  <div style={{ 
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginTop: "5px"
                  }}>
                    {stat.base_stat}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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