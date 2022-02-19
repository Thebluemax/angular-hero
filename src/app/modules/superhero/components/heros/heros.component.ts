import {Component, OnInit, AfterViewInit, ViewChild} from "@angular/core";
import {Hero} from "src/app/core/models/hero";
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
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
  subscriptions: Subscription[] = [];
  heroList: Hero[] = [];
  dataSource: MatTableDataSource<Hero>;

  herosTotal: number = 0;
  rows:number = 5;
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
   const subs = this.heroService.getHeros().
    subscribe( ({heros, total}) => {
      this.heroList = heros;
      this.dataSource.data = this.paginateList(this.paginator.pageIndex, this.paginator.pageSize);
      this.herosTotal = total;
    },
    err => console.log(err)
      );
      this.subscriptions.push(subs);
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
      },
      err => console.error
      );
      this.subscriptions.push(subs);
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
      if(msg == 'success'){
        this.deleteFromArray(hero.id);
      }
    },
    (err) =>{ console.error(err)}
    );

    this.subscriptions.push(subs);

  }

  deleteFromArray(idHero:number){
    this.heroList= this.heroList.filter( hero => hero.id !== idHero);
    this.dataSource.data = this.paginateList(this.paginator.pageIndex,this.paginator.pageSize)
    this.herosTotal = this.heroList.length;
  };

  paginateList(page:number, size:number){
    const start = page * size;
    const length = this.heroList.length;
    const end = (start + size) > length ? length : start + size;
    return this.heroList.slice(start,end);

  }

  changePage(page: number, size: number){
    this.dataSource.data =  this.paginateList(page,size);
  }
   /**
   * 
   */
    onDestroy(){
      this.subscriptions.forEach(subscription => subscription.unsubscribe())
    }
}

