export type pokeApiPokemonListType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type pokeApiPokemonListDetailItem = {
  id: number;
  moves: {
    move: {
      name: string;
    };
  }[];
  sprites: {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
      home: {
        front_default: string;
        front_shiny: string;
      };
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

export type PokemonListItem = {
  id: number;
  name: string;
  imageUrl: string;
};
