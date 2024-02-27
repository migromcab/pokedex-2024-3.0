import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NewFeatureAlert } from './NewFeatureAlert';
import axios from 'axios';
import { PokemonListItem, PokemonListItemFromApi } from './models';
import './pokemon-list.css';

export const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export const getImage = (number: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
};

export const mapPokemonApiToPokemonView = (pokemon: PokemonListItemFromApi[]): PokemonListItem[] => {
  return pokemon.map((pokemonItem: PokemonListItemFromApi, index: number) => {
    return {
      name: pokemonItem.name,
      imageUrl: getImage(index + 1),
      id: index + 1,
      isFav: false
    };
  });
};

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [hasDiscoveredFav, setHasDiscoveredFav] = useState(false);

  // Necesitamos saber si el usuario ha hecho click alguna vez en algún pokemon
  // Podríamos ver si hay algún pokemon marcado como fav

  useEffect(() => {
    const fetchPokemons = async () => {
      const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';
      console.log('llamando a la api');
      const response = await axios.get(apiURL);
      setPokemons(mapPokemonApiToPokemonView(response.data.results));
    };

    fetchPokemons();
  }, []);

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

  return (
    <div className="pokemons">
      {!hasDiscoveredFav && <NewFeatureAlert />}
      {pokemons.map((pokemon: PokemonListItem) => (
        <Link key={pokemon.id} to={`/pokemon/${pokemon.name}`}>
          <div className="pokemon">
            <img src={pokemon.imageUrl} />
            <p>{pokemon.name}</p>
            <i
              className="fa fa-heart"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                handlePokemonClick(pokemon.id);
              }}
              style={{ color: pokemon.isFav ? 'red' : 'black', cursor: 'pointer' }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
