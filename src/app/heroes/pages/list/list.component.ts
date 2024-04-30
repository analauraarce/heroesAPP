import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [`
    .parent {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      gap:20px;      
    } 
    .card{
      flex-basis:15%;
    } 
    @media (max-width: 800px) {
      .card{
        flex-basis:30%;
      }
    }
    @media (max-width: 545px) {
      .card{
        flex-basis:100%;
      }
    }
    @media (width: 150px) {
      .parent{
        flex-direction: column;     
      }
    }   
    
  `]
})
export class ListComponent implements OnInit {

  heroes: Hero[] = [];
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(ans => this.heroes = ans);
  }

}
