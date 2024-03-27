export interface PokemonListItem {
  name: string;
  imageUrl: string;
  id: number;
  isFav: boolean;
  isHidden: boolean;
}

export interface PokemonListItemFromApi {
  name: string;
  url: string;
}
