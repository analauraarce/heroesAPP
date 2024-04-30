import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [`
    .parent
    {
      display: flex;
      flex-direction:column;
    }
    .one
    {
      display: flex;
      flex-direction:column;
    }
  `]
})
export class SearchComponent implements OnInit {

  term:string = '';
  heroes:Hero[] = [];
  heroSel!:Hero | undefined;

  constructor(private heroesService:HeroesService) {}

  ngOnInit(): void {
  }

  searching()
  {  
    this.heroesService.getSuggestions(this.term.trim()).subscribe(heroes=>this.heroes=heroes);
  }

  selecOpt(event:MatAutocompleteSelectedEvent)
  {
    if(!event.option.value){
      this.heroSel=undefined;
      return;
    }
    const hero: Hero=event.option.value;
    this.term=hero.superhero;
    this.heroesService.getHeroById(hero.id!).subscribe(hero=>this.heroSel=hero);
  }
}
