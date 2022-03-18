import { Component, OnInit } from '@angular/core';
import { SlideInOutAnimation } from '../animations';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
   animations: [SlideInOutAnimation]
})
export class ErrorComponent implements OnInit {
animationState = 'in';
  constructor() { }

   toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }

  ngOnInit(): void {
    this.toggleShowDiv('divA');
  }

}
