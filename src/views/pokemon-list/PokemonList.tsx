import { useState, ChangeEvent } from 'react';
import { NewFeatureAlert } from '../../NewFeatureAlert';
import { PokemonGender, PokemonListItem } from '../../models';
import { PokemonListItemDetails } from './PokemonListItemDetails';
import { usePokemonList } from './usePokemonList';
import './pokemon-list.css';

const TAGS = ['rojo', '4 patas', 'agresivo', 'pasivo', 'carnivoro', 'hervíboro', 'alemán', 'De los Urrutias'];

export const PokemonList = () => {
  const { filteredPokemon, isOnlyFavs, limit, pokemons, search, setIsOnlyFavs, setLimit, setPokemons, setSearch } =
    usePokemonList();
  const [hasDiscoveredFav, setHasDiscoveredFav] = useState(false);

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
          <input placeholder="min price" />
          <input placeholder="max price" />

          <input onChange={handleSearchInputChange} value={search} placeholder="Buscar por nombre" />
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
      <div className="mb-2">
        {TAGS.map((tag) => (
          <label key={tag}>
            <input type="checkbox" />
            {tag}
          </label>
        ))}
      </div>
      <div className="mb-2">
        {Object.values(PokemonGender).map((gender) => (
          <label key={gender}>
            <input type="checkbox" />
            {gender}
          </label>
        ))}
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
