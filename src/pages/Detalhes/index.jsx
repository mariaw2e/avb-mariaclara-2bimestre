import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PokemonDetailCard from '../components/PokemonDetailCard/PokemonDetailCard'; // Importe o componente

// Funções de cor podem ser removidas se estiverem em um arquivo de utilidade centralizado
// function getTypeColor(type) { ... }

export default function Detalhes() {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const colors = { /* ... cores do layout ... */ };

  useEffect(() => {
    const fetchData = async () => {
      if (!name) {
        setLoading(false);
        setError(true);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

        const pokemonData = pokemonResponse.data;
        const speciesData = speciesResponse.data;

        const ptEntry = speciesData.flavor_text_entries
          .find(entry => entry.language.name === "pt");
        const enEntry = speciesData.flavor_text_entries
          .find(entry => entry.language.name === "en");
        const description = ptEntry?.flavor_text || enEntry?.flavor_text || "Descrição não disponível";

        const formattedPokemon = {
          id: pokemonData.id,
          name: pokemonData.name,
          description: description.replace(/[\n\f]/g, ' '),
          sprite: pokemonData.sprites?.other?.['official-artwork']?.front_default || pokemonData.sprites?.front_default,
          types: pokemonData.types.map(t => t.type.name),
          category: speciesData.genera.find(g => g.language.name === "pt")?.genus ||
                    speciesData.genera.find(g => g.language.name === "en")?.genus ||
                    "Categoria desconhecida",
          stats: pokemonData.stats.map(s => ({
            name: s.stat.name,
            value: s.base_stat
          }))
        };

        setPokemonDetails(formattedPokemon);
      } catch (error) {
        console.error("Erro ao buscar dados do Pokémon:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading) return (
    <div style={{ /* ... estilos do loading ... */ }}>{/* ... spinner ... */}</div>
  );

  if (error || !pokemonDetails) return (
    <div style={{ /* ... estilos do erro ... */ }}>
      <h1 style={{ color: colors.text, textAlign: 'center', marginBottom: '30px' }}>
        Erro ao carregar detalhes do Pokémon.
      </h1>
      <Link
        to="/"
        style={{ /* ... estilos do botão voltar ... */ }}
      >
        ← Voltar para Home
      </Link>
    </div>
  );

  return (
    <div style={{
      backgroundColor: colors.background,
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Link
        to="/"
        style={{
          display: 'inline-block', padding: '10px 15px', backgroundColor: colors.accent,
          color: colors.light, borderRadius: '5px', marginBottom: '20px', textDecoration: 'none'
        }}
      >
        ← Voltar para Home
      </Link>

      <h1 style={{
        color: colors.text, textAlign: 'center', marginBottom: '30px',
        fontSize: '2.8rem', fontWeight: 'bold'
      }}>
        Detalhes do Pokémon
      </h1>

      {/* Use o componente PokemonDetailCard aqui */}
      <PokemonDetailCard pokemon={pokemonDetails} />
    </div>
  );
}

// typeColors pode ser removido se a função getTypeColor for importada ou definida globalmente
// const typeColors = { ... };