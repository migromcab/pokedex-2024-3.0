import { useCallback, useEffect, useMemo, useState } from 'react';
import { PokemonListItem } from '../../models';
import { orderBy } from 'lodash';
import { mapPokemonApiToPokemonView } from './pokemon.mapper';
import axios from 'axios';

export const usePokemonList = () => {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);
  const [isOnlyFavs, setIsOnlyFavs] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

  // Necesitamos saber si el usuario ha hecho click alguna vez en algún pokemon
  // Podríamos ver si hay algún pokemon marcado como fav

  const filteredPokemon = useMemo(() => {
    const filtered = pokemons.filter((pokemon) => {
      if (pokemon.isHidden) {
        return false;
      }

      if (isOnlyFavs && !pokemon.isFav) {
        return false;
      }

      if (!search) {
        return true;
      }

      const searchId = Number(search);

      if (Number.isNaN(searchId)) {
        return pokemon.name.includes(search);
      }

      return pokemon.id === searchId;
    });

    if (!search) {
      return filtered;
    }

    return orderBy(filtered, ['isFav', 'name'], ['desc', 'asc']);
  }, [search, pokemons, isOnlyFavs]);

  const queryParams = useMemo(() => {
    return { limit, type: 'bicho' };
  }, [limit]);

  const fetchPokemons = useCallback(async () => {
    const apiURL = `https://pokeapi.co/api/v2/pokemon?limit=${queryParams.limit}`;
    const response = await axios.get(apiURL);
    setPokemons(mapPokemonApiToPokemonView(response.data.results));
  }, [queryParams]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return {
    search,
    setSearch,
    limit,
    setLimit,
    isOnlyFavs,
    setIsOnlyFavs,
    pokemons,
    setPokemons,
    filteredPokemon
  };
};
