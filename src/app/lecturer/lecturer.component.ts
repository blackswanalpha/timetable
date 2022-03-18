import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css']
})
export class LecturerComponent implements OnInit {
toDisplayDepartment = false;
toDisplayCourse = false;
toDisplayUnit = false;
  constructor() { }

  count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


   clickCount(): void{

    if (this.count == 0){
        this.toDisplayCourse = false;
this.toDisplayDepartment = !this.toDisplayDepartment;
this.count = 1;
    }
     if (this.count == 2){
        this.toDisplayCourse = false;
this.toDisplayDepartment = !this.toDisplayDepartment;
this.count = 2;

    }

    if (this.count == 3){
        this.toDisplayUnit = false;
this.toDisplayDepartment = !this.toDisplayDepartment;
this.count = 3;
    }
    console.log(this.count);
        this.count++
        }

  toggleData(name:string) {
    if (name =='dept' && this.count == 0){
//     (<HTMLElement>document.getElementById("idOfButton")).addEventListener('(click)', (event) => {  
//   event.removeEventListener();  
// });
  this.toDisplayCourse = false;
  this.toDisplayUnit = false;
this.toDisplayDepartment = !this.toDisplayDepartment;

this.count++;
this.count2 = 0;
this.count3 = 0;




}
    else if (name =='crse' && this.count2 == 0  ){
     
       this.toDisplayDepartment = false;
       this.toDisplayUnit = false;
       this.toDisplayCourse = !this.toDisplayCourse;
      
       this.count = 0;
       this.count3 = 0;
       this.count2++
    }
     else if (name =='unit' && this.count3 == 0  ){
      
       this.toDisplayDepartment = false;
       this.toDisplayCourse = false;
        this.toDisplayUnit = !this.toDisplayUnit;
      
       this.count = 0;
       this.count2 = 0;
       this.count3++
    }
    
  }
  ngOnInit(): void {
  }

}
