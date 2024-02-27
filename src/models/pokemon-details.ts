export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: string[];
  images: {
    imageUrl: string;
    femaleImageUrl?: string;
    shinyImageUrl: string;
    shinyFemaleImageUrl?: string;
  };
}

export interface NamedApiResource {
  url: string;
  name: string;
}

export interface PokemonDetailsAbilityFromApi {
  is_hidden: boolean;
  slot: number;
  ability: NamedApiResource;
}

export interface PokemonDetailsFromApi {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonDetailsAbilityFromApi[];
  sprites: {
    front_default: string;
    front_shiny: string;
    front_female?: string;
    front_shiny_female?: string;
  };
}
