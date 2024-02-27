import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonDetails as PokemonDetailsModel } from './models';

const MI_POKEMON: PokemonDetailsModel = {
  id: 3,
  abilities: ['Impactrueno', 'ataque rápido'],
  height: 34,
  name: 'Jose',
  images: {
    femaleImageUrl:
      'https://media.istockphoto.com/id/1345472306/es/foto/un-hermoso-gatito-de-jengibre-se-sienta-en-botes-humanos-al-atardecer-al-aire-libre-el.jpg?s=612x612&w=0&k=20&c=cFZudSbqRlHQkmbLhThMfrYau9e_s2YmRUfC2oz-3hs=',
    maleImageUrl:
      'https://img.freepik.com/foto-gratis/adorable-ilustracion-gatitos-jugando-bosque-generative-ai_260559-483.jpg',
    shinyFemaleImageUrl:
      'https://media.istockphoto.com/id/1345472306/es/foto/un-hermoso-gatito-de-jengibre-se-sienta-en-botes-humanos-al-atardecer-al-aire-libre-el.jpg?s=612x612&w=0&k=20&c=cFZudSbqRlHQkmbLhThMfrYau9e_s2YmRUfC2oz-3hs=',
    shinyMaleImageUrl:
      'https://img.freepik.com/foto-gratis/adorable-ilustracion-gatitos-jugando-bosque-generative-ai_260559-483.jpg'
  },
  weight: 6
};

export const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsModel>(MI_POKEMON);
  const { pokemonId } = useParams();

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
      <img src={pokemonDetails.images.maleImageUrl} />
      <img src={pokemonDetails.images.femaleImageUrl} />
    </div>
  );
};
