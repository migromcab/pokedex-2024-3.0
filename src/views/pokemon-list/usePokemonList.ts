import { useCallback, useEffect, useMemo, useState } from 'react';
import { PokemonGender, PokemonListItem, PokemonListItemFromApi } from '../../models';
import { orderBy } from 'lodash';
import { mapPokemonApiToPokemonView } from './pokemon.mapper';
import axios from 'axios';

export interface PokemonFilters {
  minPrice: number;
  maxPrice: number;
  search?: string;
  tags?: string[];
  gender?: PokemonGender[];
  isOnlyFavs?: boolean;
}

export const DEFAULT_FILTERS: PokemonFilters = {
  minPrice: 0,
  maxPrice: 1000
};

const matchesTagFilter = (pokemon: PokemonListItem, tags: string[] = []) => {
  if (!tags.length) {
    return true;
  }

  return pokemon.tags.some((tag) => {
    return tags.includes(tag);
  });
};

const matchesGenderFilter = (pokemon: PokemonListItem, genders: string[] = []) => {
  if (!genders.length) {
    return true;
  }

  return genders.includes(pokemon.gender);
};

export const usePokemonList = () => {
  const [limit, setLimit] = useState(50);
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [filters, setFilters] = useState<PokemonFilters>(DEFAULT_FILTERS);

  // Necesitamos saber si el usuario ha hecho click alguna vez en algún pokemon
  // Podríamos ver si hay algún pokemon marcado como fav
  const tagsAvailable = useMemo(() => {
    const arrayMapping: Record<string, boolean> = {};

    pokemons.forEach((pokemon) => {
      pokemon.tags.forEach((tag) => {
        arrayMapping[tag] = true;
      });
    });

    return Object.keys(arrayMapping);
  }, [pokemons]);

  const filteredPokemon = useMemo(() => {
    const {
      isOnlyFavs,
      search,
      tags: tagsFromFilters = [],
      gender: genderFromFilters = [],
      minPrice,
      maxPrice
    } = filters;
    const filtered = pokemons.filter((pokemon) => {
      if (pokemon.isHidden) {
        return false;
      }

      if (pokemon.price < minPrice || pokemon.price > maxPrice) {
        return false;
      }

      if (!matchesTagFilter(pokemon, tagsFromFilters)) {
        return false;
      }

      if (!matchesGenderFilter(pokemon, genderFromFilters)) {
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
  }, [filters, pokemons]);

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
    limit,
    setLimit,
    pokemons,
    setPokemons,
    filteredPokemon,
    filters,
    setFilters,
    tagsAvailable
  };
};
