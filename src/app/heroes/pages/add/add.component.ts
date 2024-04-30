import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    .cont {
      display: flex;
      flex-flow: row wrap;
      gap:40px;
           
    }
    .one
    {      
      flex-grow:1;
      display: flex;
      flex-direction:column;
    }
    .two
    {      
      flex-grow:3;
    }
    .u 
    {            
      gap:20px;       
      display: flex;   
      flex-flow: row wrap;         
    }
    .r
    {      
      flex-grow:1;
    }
    img{      
      width:100%;
      border-radius:5px;
    }
    .butn 
    {                        
      display: flex;   
      flex-flow: row wrap;         
    }
  `]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics'
    }
  ];
  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };
  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar:MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.router.url.includes('edit'))
    {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe(hero => this.hero = hero);
  }
  save() {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }
    if (this.hero.id) {//update
      this.heroesService.updateHero(this.hero)
        .subscribe(hero => this.showSnackBar('Updated'));
    }
    else {//create
      this.heroesService.addHero(this.hero)
        .subscribe(hero => {
          this.router.navigate(['/heroes/edit', hero.id]);
          this.showSnackBar('Created');
        })
    }

  }
  deleteH(){
    const dialog=this.dialog.open(ConfirmComponent,{
      width:'250px',
      data:this.hero
    });
    dialog.afterClosed().subscribe(
      (result)=>{
        if(result){
          this.heroesService.deleteHero(this.hero.id!)
            .subscribe(ans=>{
              this.router.navigate(['/heroes']);
            });
        }
      }
    )
   
  }

  showSnackBar(mess:string){
    this.snackBar.open(mess,'ok!',{
      duration:2500
    });
  }
}
