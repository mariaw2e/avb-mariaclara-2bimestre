import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Inicializa o estado de favoritos a partir do localStorage, se houver
  const [favorites, setFavorites] = useState(() => {
    try {
      const localFavorites = localStorage.getItem('pokemonFavorites');
      return localFavorites ? JSON.parse(localFavorites) : [];
    } catch (error) {
      console.error("Erro ao carregar favoritos do localStorage:", error);
      return [];
    }
  });

  // Salva os favoritos no localStorage sempre que eles mudam
  useEffect(() => {
    try {
      localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Erro ao salvar favoritos no localStorage:", error);
    }
  }, [favorites]);

  const addFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      // Evita duplicatas
      if (!prevFavorites.some(fav => fav.id === pokemon.id)) {
        return [...prevFavorites, pokemon];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (pokemonId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== pokemonId)
    );
  };

  const isFavorite = (pokemonId) => {
    return favorites.some((fav) => fav.id === pokemonId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useFavorites = () => {
  return useContext(FavoritesContext);
};