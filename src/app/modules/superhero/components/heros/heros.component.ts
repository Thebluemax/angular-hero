import {Component, OnInit, AfterViewInit, ViewChild} from "@angular/core";
import {Hero} from "src/app/core/models/hero";
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { HeroService } from 'src/app/core/services/hero.service';
import { Router } from '@angular/router';
/**
 * A Super Hero list Component
 */
@Component({
  selector: "app-heros",
 templateUrl: "./heros.component.html",
  styleUrls: ["./heros.component.scss"]
})

export class HerosComponent implements OnInit,
AfterViewInit {

  heros: Hero[] = [

  ];
  dataSource: MatTableDataSource<Hero>;

  herosTotal: number = 0;
  rows:number = 10;
  page:number = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ["name", "publisher", "actions"];

  @ViewChild('paginator',{static:true}) paginator: MatPaginator;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Hero>();
  }

  ngOnInit(): void {
   // this.dataSource.data = this.heros;
    this.getHeros();
  }

  ngAfterViewInit(): void {

  }
  /**
   *
   */
  getHeros() {
    this.heroService.getHeros().
    subscribe( ({heros, total}) => {
      this.dataSource.data = heros;
      this.herosTotal = total;
    }
      )
  }
  /**
   * 
   * @param term 
   */
  search(term: string){
    const subs = this.heroService.getHerosByTerm(term)
      .subscribe( ({heros, total}) => {
        this.dataSource.data = heros;
        this.herosTotal = total;
      });
    
  }
  /**
   *
   */
  updateTable() {
    this.dataSource.data = this.heros;
  }
  
  /**
   * edit a hero
   */
  editHero(hero : Hero) {
    this.router.navigate([`/superhero/heros/${hero.id}`])
  }
/**
 *
 */
  deleteHero(hero:Hero) {
    if(!hero)
      return;

    const subs = this.heroService.deleteHero(hero.id)
    .subscribe(({msg}) => {
      if(msg = 'success'){
        this.deleteFromArray(hero.id);
      }
    });
  }

  deleteFromArray(idHero:number){
    this.dataSource.data = this.dataSource.data.filter( hero => hero.id !== idHero)
  };
}

