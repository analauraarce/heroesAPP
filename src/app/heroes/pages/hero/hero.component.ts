import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [`
    .cls {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      gap:30px;      
    } 
  
    img{
      width:100%;
      border-radius:5px;
    }
   
    @media (max-width: 270px) {
      h2{
        font-size:40px; 
      }
      .on{
        height:160px;    
      }    
         
    }

  `]
})
export class HeroComponent implements OnInit {

  hero!: Hero;

  constructor(private activatedRoute: ActivatedRoute, private heroesService: HeroesService, private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe(hero => this.hero = hero);

  }
  back() {
    this.router.navigate(['/heroes/list']);
  }

}
