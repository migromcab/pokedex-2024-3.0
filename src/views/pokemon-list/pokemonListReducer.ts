import {
  PokemonFilters,
  PokemonListAction,
  PokemonListActionTypes,
  PokemonListReducerState
} from './pokemon-list.models';

export const DEFAULT_FILTERS: PokemonFilters = {
  minPrice: 0,
  maxPrice: 1000
};

export const INITIAL_STATE: PokemonListReducerState = {
  filters: DEFAULT_FILTERS,
  limit: 50,
  list: []
};

export const pokemonListReducer = (
  state: PokemonListReducerState,
  action: PokemonListAction
): PokemonListReducerState => {
  switch (action.type) {
    case PokemonListActionTypes.ChangeLimit:
      return {
        ...state,
        limit: action.payload
      };

    case PokemonListActionTypes.Receive:
      return {
        ...state,
        list: action.payload
      };

    case PokemonListActionTypes.Filter:
      return {
        ...state,
        filters: action.payload
      };

    default:
      return state;
  }
};
