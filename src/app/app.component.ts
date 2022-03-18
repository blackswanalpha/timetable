import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { routeTransitionAnimations } from './animations';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, RouterOutlet } from '@angular/router';
import { LoadingHandler } from './loading';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent {
  title = 'timetableapp';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  // constructor(private observer: BreakpointObserver) {}
// loadingHandler = new LoadingHandler();

//  constructor(private router: Router) {

//         this.router.events.subscribe((event: Event) => {
//             if (event instanceof NavigationStart) {
//                 // Show loading indicator
//                 this.loadingHandler.start();
//             }

//             if (event instanceof NavigationEnd) {
//                 // Hide loading indicator
//             }

//             if (event instanceof NavigationError) {
//                 // Hide loading indicator

//                 // Present error to user
//                 console.log(event.error);
//             }
//         });

   
  // ngAfterViewInit() {
  //   this.observer
  //     .observe(['(max-width: 800px)'])
  //     .pipe(delay(1))
  //     .subscribe((res) => {
  //       if (res.matches) {
  //         this.sidenav.mode = 'over';
  //         this.sidenav.close();
  //       } else {
  //         this.sidenav.mode = 'side';
  //         this.sidenav.open();
  //       }
  //     });
  // }

 
}
