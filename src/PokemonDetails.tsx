import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import pepito from 'axios';
import { PokemonDetailsFromApi, PokemonDetails as PokemonDetailsModel } from './models';

const mapPokemonDetailsFromApiToPokemonDetails = (dataFromApi: PokemonDetailsFromApi): PokemonDetailsModel => {
  const { abilities, height, id, name, sprites, weight } = dataFromApi;

  return {
    height,
    id,
    weight,
    name,
    abilities: abilities.map((abilityFromApi) => {
      return abilityFromApi.ability.name;
    }),
    images: {
      femaleImageUrl: sprites.front_female,
      imageUrl: sprites.front_default,
      shinyFemaleImageUrl: sprites.front_shiny_female,
      shinyImageUrl: sprites.front_shiny
    }
  };
};

export const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsModel>();
  const { pokemonId } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await pepito.get<PokemonDetailsFromApi>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
      const mappedDetails = mapPokemonDetailsFromApiToPokemonDetails(response.data);
      setPokemonDetails(mappedDetails);
    };

    fetchDetails();
  }, []);

  if (!pokemonDetails) {
    return <>Loading pokemon</>;
  }

  return (
    <div>
      <p>
        <strong>Nombre:</strong> {pokemonDetails.name}
      </p>
      <p>
        <strong>Altura:</strong>
        {pokemonDetails.height}
      </p>
      <p>
        <strong>Peso:</strong> {pokemonDetails.weight}
      </p>
      <p>
        <strong>Habilidades:</strong> {pokemonDetails.height}
      </p>
      <img src={pokemonDetails.images.imageUrl} />
      {pokemonDetails.images.femaleImageUrl && <img src={pokemonDetails.images.femaleImageUrl} />}
      {pokemonDetails.images.shinyFemaleImageUrl && <img src={pokemonDetails.images.shinyFemaleImageUrl} />}
      <img src={pokemonDetails.images.shinyImageUrl} />
    </div>
  );
};
