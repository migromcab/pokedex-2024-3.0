import { PokemonGender, PokemonListItem, PokemonListItemFromApi } from '../../models';
import { randomIntFromInterval } from '../../utils/random-number-generator';

export const getImage = (number: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
};

const getRandomTags = () => {
  const possibleTags = ['rojo', '4 patas', 'agresivo', 'pasivo', 'carnivoro', 'hervíboro', 'alemán', 'De los Urrutias'];
  const addedTags = [];
  const numTagsToAdd = randomIntFromInterval(1, possibleTags.length - 2);

  for (let i = 1; i <= numTagsToAdd; i++) {
    const indexToAdd = randomIntFromInterval(0, possibleTags.length - 1);
    addedTags.push(possibleTags[indexToAdd]);
    possibleTags.splice(indexToAdd, 1);
  }

  return addedTags;
};

export const getRandomGender = (): PokemonGender => {
  const genders: PokemonGender[] = Object.values(PokemonGender);
  const indexToAdd = randomIntFromInterval(0, genders.length - 1);
  return genders[indexToAdd];
};

export const mapPokemonApiToPokemonView = (pokemon: PokemonListItemFromApi[]): PokemonListItem[] => {
  return pokemon.map((pokemonItem: PokemonListItemFromApi, index: number) => {
    return {
      name: pokemonItem.name,
      imageUrl: getImage(index + 1),
      id: index + 1,
      isFav: false,
      isHidden: false,
      gender: getRandomGender(),
      price: randomIntFromInterval(1, 1000),
      tags: getRandomTags(),
      level: randomIntFromInterval(1, 100)
    };
  });
};
