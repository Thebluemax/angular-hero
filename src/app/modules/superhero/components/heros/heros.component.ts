import {Component, OnInit, AfterViewInit, ViewChild} from "@angular/core";
import {Hero} from "src/app/core/models/hero";
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { HeroService } from 'src/app/core/services/hero.service';
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
    private heroService: HeroService
  ) {
    this.dataSource = new MatTableDataSource<Hero>();
  }

  ngOnInit(): void {
   // this.dataSource.data = this.heros;
    this.heroService.getHeros().
    subscribe( ({heros, total}) => {
      this.dataSource.data = heros;
      this.herosTotal = total;
    }
      )
  }

  ngAfterViewInit(): void {

  }
  /**
   *
   */
  getHeros() {}
  /**
   *
   */
  updateTable() {
    this.dataSource.data = this.heros;
  }
  /**
   * Add a hero to db
   */
  addHero() {}

  /**
   * edit a hero
   */
  editHero(hero : Hero) {

  }
/**
 *
 */
  deleteHero() {

  }
}
