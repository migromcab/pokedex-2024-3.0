import { orderBy } from 'lodash';
import { PokemonListItem } from '../../models';
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
  list: [],
  tagsAvailable: [],
  filteredList: []
};

const getAvailableTagsFromList = (list: PokemonListItem[]) => {
  const arrayMapping: Record<string, boolean> = {};

  list.forEach((pokemon) => {
    pokemon.tags.forEach((tag) => {
      arrayMapping[tag] = true;
    });
  });

  return Object.keys(arrayMapping);
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

const getPokemonFiltered = (filters: PokemonFilters, list: PokemonListItem[]) => {
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
        tagsAvailable: getAvailableTagsFromList(action.payload),
        list: action.payload,
        filteredList: getPokemonFiltered(state.filters, action.payload)
      };

    case PokemonListActionTypes.Filter:
      return {
        ...state,
        filters: action.payload,
        filteredList: getPokemonFiltered(action.payload, state.list)
      };

    default:
      return state;
  }
};
