import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from '../animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';
import { Rank } from './rank';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
   animations: [routeTransitionAnimations]
})
export class NavComponent  {
loadingHandler = new LoadingHandler();
//   constructor(private http: HttpClient ) { }
//   rank: Array<Rank> = [];
active = 'top';

//  loadGames () {
//  this.rank = [];
// this. loadingHandler.start();
//  this.http.get<Rank[]>( 'http://localhost:8089/fetchAllRanks')
//     .subscribe(rank => {
//       this.loadingHandler.finish();
//       this.rank=rank; 
//    });
// }
 prepareRoute(outlet: RouterOutlet): boolean {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
	}

}
