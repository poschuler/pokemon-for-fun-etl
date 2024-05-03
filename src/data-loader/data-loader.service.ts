// import {
//   pokeApiPokemonListDetailItem,
//   pokeApiPokemonListType,
// } from '@app/data-loader/data-loader.types';
import {
  pokeApiPokemonListDetailItem,
  pokeApiPokemonListType,
} from '@app/data-loader/data-loader.types';
import { MongoDBService } from '@app/mongo-db/mongo-db.service';
import { PgService } from '@app/pg/pg.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly mongoDbService: MongoDBService,
    private readonly pgService: PgService,
  ) {}

  @Cron(new Date(Date.now() + 2 * 1000))
  async load() {
    let db = this.mongoDbService.client.db('pokemon-for-fun');

    try {
      let pokemons = await this.getPokeApiData();
      await db
        .collection('pokemons')
        .insertMany(pokemons, { maxTimeMS: 600000 });
      console.log('Data loaded');
    } catch (error) {
      console.log(error);
    }
  }

  async getPokeApiData() {
    let pokemons: pokeApiPokemonListDetailItem[] = [];
    let next: string | null = 'https://pokeapi.co/api/v2/pokemon/';

    do {
      let dataResults = await fetch(next);

      if (!dataResults.ok) {
        throw new Error('Failed to fetch data from pokeApi');
      }

      let pokeData: pokeApiPokemonListType = await dataResults.json();
      next = pokeData.next;

      let promises = pokeData.results.map((pokemon) => {
        return this.getPokeApiPokemonDetail({ url: pokemon.url });
      });

      let result = await Promise.all(promises);
      pokemons.push(...result);
    } while (next);

    return pokemons;
  }

  async getPokeApiPokemonDetail({ url }: { url: string }) {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data from pokeApi');
    }

    let pokemonDetails: pokeApiPokemonListDetailItem = await response.json();
    return pokemonDetails;
  }
}
