import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { PokemonListItem } from '../../models';
import { orderBy } from 'lodash';
import { mapPokemonApiToPokemonView } from './pokemon.mapper';
import axios from 'axios';
import { INITIAL_STATE, pokemonListReducer } from './pokemonListReducer';
import { PokemonFilters, PokemonListActionTypes } from './pokemon-list.models';

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
  const [pokemonListState, pokemonListDispatch] = useReducer(pokemonListReducer, INITIAL_STATE);
  const { limit, list, filters } = pokemonListState;

  // Necesitamos saber si el usuario ha hecho click alguna vez en algún pokemon
  // Podríamos ver si hay algún pokemon marcado como fav
  const tagsAvailable = useMemo(() => {
    const arrayMapping: Record<string, boolean> = {};

    list.forEach((pokemon) => {
      pokemon.tags.forEach((tag) => {
        arrayMapping[tag] = true;
      });
    });

    return Object.keys(arrayMapping);
  }, [list]);

  const filteredPokemon = useMemo(() => {
    const {
      isOnlyFavs,
      search,
      tags: tagsFromFilters = [],
      gender: genderFromFilters = [],
      minPrice,
      maxPrice
    } = filters;
    const filtered = list.filter((pokemon) => {
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
  }, [filters, list]);

  const queryParams = useMemo(() => {
    return { limit, type: 'bicho' };
  }, [limit]);

  const fetchPokemons = useCallback(async () => {
    const apiURL = `https://pokeapi.co/api/v2/pokemon?limit=${queryParams.limit}`;
    const response = await axios.get(apiURL);
    pokemonListDispatch({
      type: PokemonListActionTypes.Receive,
      payload: mapPokemonApiToPokemonView(response.data.results)
    });
  }, [queryParams]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return {
    limit,
    setLimit: (newLimit: number) =>
      pokemonListDispatch({
        type: PokemonListActionTypes.ChangeLimit,
        payload: newLimit
      }),
    pokemons: list,
    setPokemons: (pokemon: PokemonListItem[]) =>
      pokemonListDispatch({
        type: PokemonListActionTypes.Receive,
        payload: pokemon
      }),
    filteredPokemon,
    filters,
    setFilters: (filters: PokemonFilters) =>
      pokemonListDispatch({
        type: PokemonListActionTypes.Filter,
        payload: filters
      }),
    tagsAvailable
  };
};
