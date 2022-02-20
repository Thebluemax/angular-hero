import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { HeroService } from 'src/app/core/services/hero.service';
import { Hero } from 'src/app/core/models/hero';
/**
 * A Super Hero list Component
 */
@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss'],
  animations:[
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      
    ]),
  ]
})
export class HerosComponent implements OnInit, AfterViewInit {
  subscriptions: Subscription[] = [];
  heroList: Hero[] = [];
  dataSource: Hero[];

  herosTotal: number = 0;
  rows: number = 5;
  page: number = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['name', 'group', 'publisher', 'actions'];

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  constructor(private heroService: HeroService, private router: Router) {
    this.dataSource = [];
  }

  ngOnInit(): void {
    this.getHeros();
  }

  ngAfterViewInit(): void {}
  /**
   *
   */
  getHeros() {
    const subs = this.heroService.getHeros().subscribe(
      ({ heros, total }) => {
        this.heroList = heros;
        this.dataSource = this.paginateList(
          this.paginator.pageIndex,
          this.paginator.pageSize
        );
        this.herosTotal = total;
      },
      (err) => console.log(err)
    );
    this.subscriptions.push(subs);
  }
  /**
   *
   * @param term
   */
  search(term: string) {
    const subs = this.heroService.getHerosByTerm(term).subscribe(
      ({ heros, total }) => {
        this.dataSource = heros;
        this.herosTotal = total;
      },
      (err) => console.error
    );
    this.subscriptions.push(subs);
  }

  /**
   * 
   * @param hero 
   */
  editHero(hero: Hero) {
    this.router.navigate([`/superhero/heros/${hero.id}`]);
  }
  /**
   * 
   * @param hero 
   * @returns 
   */
  deleteHero(hero: Hero) {
    if (!hero) return;

    const subs = this.heroService.deleteHero(hero.id).subscribe(
      ({ msg }) => {
        if (msg == 'success') {
          this.deleteFromArray(hero.id);
        }
      },
      (err) => {
        console.error(err);
      }
    );

    this.subscriptions.push(subs);
  }
/**
 * 
 * @param idHero 
 */
  deleteFromArray(idHero: number) {
    this.heroList = this.heroList.filter((hero) => hero.id !== idHero);
    this.dataSource = this.paginateList(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    this.herosTotal = this.heroList.length;
  }
/**
 * 
 * @param page 
 * @param size 
 * @returns 
 */
  paginateList(page: number, size: number) {
    const start = page * size;
    const length = this.heroList.length;
    const end = start + size > length ? length : start + size;
    return this.heroList.slice(start, end);
  }
/**
 * 
 * @param page 
 * @param size 
 */
  changePage(page: number, size: number) {
    this.dataSource = this.paginateList(page, size);
  }
  /**
   *
   */
  onDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
