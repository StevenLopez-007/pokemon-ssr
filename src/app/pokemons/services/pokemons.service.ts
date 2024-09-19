import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { PokeAPIResponseI,PokemonI,ResultI,SimplePokemonI } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private httpClient = inject(HttpClient);

  public loadPage(page:number):Observable<SimplePokemonI[]>{

    if(page !== 0){
      --page;
    }

    page = Math.max(0,page);

    return this.httpClient.get<PokeAPIResponseI>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`).pipe(
      map(resp=>{
        const simplePokemons:SimplePokemonI[] = resp.results.map(
          (pokemon:ResultI)=>({
          id:pokemon.url.split('/').at(-2) ?? '',
          name:pokemon.name
        })
      );

       return simplePokemons
      }),
      // tap(console.log)
    )
  }

  public loadPokemon(id:string):Observable<PokemonI>{
    return this.httpClient.get<PokemonI>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }
}
