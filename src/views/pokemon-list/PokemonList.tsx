import { useState, useEffect, useMemo, ChangeEvent, useCallback } from 'react';
import { NewFeatureAlert } from '../../NewFeatureAlert';
import axios from 'axios';
import { orderBy } from 'lodash';
import { PokemonListItem } from '../../models';
import { PokemonListItemDetails } from './PokemonListItemDetails';
import { mapPokemonApiToPokemonView } from './pokemon.mapper';
import './pokemon-list.css';

export const PokemonList = () => {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);
  const [isOnlyFavs, setIsOnlyFavs] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [hasDiscoveredFav, setHasDiscoveredFav] = useState(false);

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

  const handlePokemonClick = (pokemonId: number) => {
    setHasDiscoveredFav(true);

    const newPokemonsMap = pokemons.map((pokemonInfo: PokemonListItem) => {
      if (pokemonId === pokemonInfo.id) {
        const newPokemonInfo = { ...pokemonInfo };
        newPokemonInfo.isFav = !pokemonInfo.isFav;
        return newPokemonInfo;
      }

      return pokemonInfo;
    });

    setPokemons(newPokemonsMap);
  };

  const handleHidePokemonClick = (pokemonId: number) => {
    const newPokemonsMap = pokemons.map((pokemonInfo: PokemonListItem) => {
      if (pokemonId === pokemonInfo.id) {
        const newPokemonInfo = { ...pokemonInfo };
        newPokemonInfo.isHidden = true;
        return newPokemonInfo;
      }

      return pokemonInfo;
    });

    setPokemons(newPokemonsMap);
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClearClick = () => {
    setSearch('');
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
  };

  const handleIsOnlyFavClick = () => {
    setIsOnlyFavs(!isOnlyFavs);
  };

  return (
    <div>
      <div className="toolbox">
        <div>
          <input onChange={handleSearchInputChange} value={search} />
          <button onClick={handleClearClick}>limpiar</button>
          <button onClick={handleIsOnlyFavClick} style={{ color: isOnlyFavs ? 'red' : 'black', cursor: 'pointer' }}>
            Only favs
          </button>
        </div>
        <select onChange={handleLimitChange} value={limit}>
          <option>5</option>
          <option>50</option>
          <option>100</option>
          <option>250</option>
          <option>500</option>
          <option value="5000">Todos</option>
        </select>
      </div>
      <div className="pokemons">
        {!hasDiscoveredFav && <NewFeatureAlert />}
        {filteredPokemon.map((pokemon: PokemonListItem) => (
          <PokemonListItemDetails
            key={pokemon.id}
            pokemon={pokemon}
            onFavPokemonClick={handlePokemonClick}
            onHidePokemonClick={handleHidePokemonClick}
          />
        ))}
      </div>
    </div>
  );
};
