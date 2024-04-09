export enum PokemonGender {
  Male = 'male',
  Female = 'female',
  Others = 'others'
}

export interface PokemonListItem {
  name: string;
  imageUrl: string;
  id: number;
  isFav: boolean;
  isHidden: boolean;
  tags: string[];
  price: number;
  level: number;
  gender: PokemonGender;
}

export interface PokemonListItemFromApi {
  name: string;
  url: string;
}
