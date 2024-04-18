import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { PokemonListItem } from '../../models';
import { mapPokemonApiToPokemonView } from './pokemon.mapper';
import axios from 'axios';
import { INITIAL_STATE, pokemonListReducer } from './pokemonListReducer';
import { PokemonFilters, PokemonListActionTypes } from './pokemon-list.models';

export const usePokemonList = () => {
  const [pokemonListState, pokemonListDispatch] = useReducer(pokemonListReducer, INITIAL_STATE);
  const { tagsAvailable, limit, list, filteredList, filters } = pokemonListState;

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
    filteredPokemon: filteredList,
    filters,
    setFilters: (filters: PokemonFilters) =>
      pokemonListDispatch({
        type: PokemonListActionTypes.Filter,
        payload: filters
      }),
    tagsAvailable
  };
};
