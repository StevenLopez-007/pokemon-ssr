import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonI } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit{

  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<PokemonI | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;

    this.pokemonsService.loadPokemon(id)
    .pipe(
      tap(({name,id})=>{
        const pageTitle = `#${id} - ${name}`;
        const pageDesc = `Página del Pokémon ${name}`;

        this.title.setTitle(pageTitle);

        this.meta.updateTag({name:'description',content:pageDesc});
        this.meta.updateTag({name:'og:title',content:pageTitle});
        this.meta.updateTag({name:'og:description',content:pageDesc});
        this.meta.updateTag({name:'og:image',content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`});
      })
    )
    .subscribe(this.pokemon.set)
  }
}
