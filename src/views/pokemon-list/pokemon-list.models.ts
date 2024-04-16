import { PokemonGender, PokemonListItem } from '../../models';

export interface PokemonFilters {
  minPrice: number;
  maxPrice: number;
  search?: string;
  tags?: string[];
  gender?: PokemonGender[];
  isOnlyFavs?: boolean;
}

export interface PokemonListReducerState {
  limit: number;
  list: PokemonListItem[];
  filters: PokemonFilters;
}

// cambiar el limite
// filtrar
// fav pokemon
// borrar
// Recibir los pokemons

export enum PokemonListActionTypes {
  ChangeLimit = 'CHANGE_LIMIT',
  Filter = 'FILTER',
  Delete = 'DELETE',
  Receive = 'RECEIVE',
  Fav = 'FAV'
}

export interface PokemonListReceiveAction {
  type: PokemonListActionTypes.Receive;
  payload: PokemonListItem[];
}

export interface PokemonListChangeLimitAction {
  type: PokemonListActionTypes.ChangeLimit;
  payload: number;
}

export interface PokemonListFilterAction {
  type: PokemonListActionTypes.Filter;
  payload: PokemonFilters;
}

export type PokemonListAction = PokemonListReceiveAction | PokemonListChangeLimitAction | PokemonListFilterAction;
