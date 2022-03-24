import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Day } from './day';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { DayService } from './day.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class DayComponent implements OnInit {
  day: Day[] =[];
  // day:Day[]= [];
  closeResult: string = '';
 
  fb: any;
    editDay: Day | undefined;
   editForm = {
   dayId: 0,
    dayName: '',
    dayDesc: ''
  } ;

  





deleteId = 0;
  


// loadingHandler = new LoadingHandler();
  
toDisplayDay = false;
toDisplayFaculty = false;
toDisplayCourse = false;
toDisplayUnit = false;


event = window.event;
  


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


  constructor(public  loaderService:LoaderService,private dayService: DayService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}


  toggleData(name:string) {
    if (name =='dept' && this.count == 0){
//     (<HTMLElement>document.getElementById("idOfButton")).addEventListener('(click)', (event) => {  
//   event.removeEventListener();  
// });
  this.toDisplayCourse = false;
  this.toDisplayUnit = false;
  this.toDisplayFaculty = false;
this.toDisplayDay = !this.toDisplayDay;

this.count++;
this.count2 = 0;
this.count3 = 0;
 this.count4 = 0;

}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayDay = false;
       this.toDisplayUnit = false;
       this.toDisplayFaculty = false;
       this.toDisplayCourse = !this.toDisplayCourse;
      
       this.count = 0;
       this.count3 = 0;
        this.count4 = 0;
       this.count2++
    }
     else if (name =='unit' && this.count3 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayDay = false;
       this.toDisplayCourse= false;
       this.toDisplayFaculty = false;
        this.toDisplayUnit = !this.toDisplayUnit;
      
       this.count = 0;
       this.count2 = 0;
        this.count4 = 0;
       this.count3++
    }
     else if (name =='falc' && this.count4 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayDay = false;
        this.toDisplayFaculty = !this.toDisplayFaculty;
       this.toDisplayCourse= false;
        this.toDisplayUnit = false;

       
      
       this.count = 0;
       this.count2 = 0;
        this.count3 = 0;
       this.count4++
    }
    
  }
  ngOnInit():void {
// this.loadingHandler.finish();
  
    // this.getday();
    this.getDay();
    this.toggleData('dept');
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getDay(): void {
    this.dayService.getday().subscribe(
      (response: Day[]) => {
      
this.day = response;
// this.loadingHandler.finish();
        console.log(this.day);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getday(): void {
  //   this.dayService.getday().subscribe(
  //     (response: Day[]) => {
  //       this.day = response;
  //       console.log(this.day);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

onSubmit(f: NgForm) {


 this.dayService.addDay(f.value).subscribe(
      (response: Day) => {
        console.log(response);
        this.getDay();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/days/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, day: Day) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
     (<HTMLElement>document.getElementById('fname')).setAttribute('value', day.dayName);
  //  (<HTMLElement>document.getElementById('dept')).setAttribute('value', day.dayRequireLab);
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', day.dayDesc);
   //   (<HTMLElement>document.getElementById('dept')).setAttribute('value',( day.daySemesterId).toString());
  // (<HTMLElement>document.getElementById('email2')).setAttribute('value', (day.dayUnitId).toString());
  //  (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( day.dayMobile).toString());
}



openEdit(targetModal: any, day: Day) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = day;

  // this.editForm.patchValue( {
  //   dayId: day.dayId, 
  //   dayName: day.dayName,
  //   dayEmail: day.dayEmail,
  //   dayDesc: day.dayDesc,
  //   dayFacultyId: day.dayFacultyId,
  //  dayMobile: day.dayMobile
  // });



 
     (<HTMLElement>document.getElementById('dayId')).setAttribute('value', (day.dayId).toString());
 (<HTMLElement>document.getElementById('dayId')).setAttribute('data-target',(day.dayId).toString());
  (<HTMLElement>document.getElementById('dayName')).setAttribute('value', day.dayName);
  //  (<HTMLElement>document.getElementById('dayEmail')).setAttribute('value', day.dayEmail);
  //      (<HTMLElement>document.getElementById('dayEmail')).setAttribute('data-target',(day.dayEmail).toString());
  
   (<HTMLElement>document.getElementById('dayDesc')).setAttribute('value', day.dayDesc);
  //  (<HTMLElement>document.getElementById('daySemesterId')).setAttribute('value', (day.daySemesterId).toString());
  //  (<HTMLElement>document.getElementById('dayUnitId')).setAttribute('value',( day.dayUnitId).toString());

}



 public onEdit(f: NgForm) {
  
 this.dayService.updateDay(this.editForm).subscribe(
      (response: Day) => {
        console.log(response);
        this.getDay();
         this.toastr.success('day', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.success('Hello world!', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, day: Day) {
  this.editForm = day;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.dayService.deleteDay(this.editForm).subscribe(
      (response: Day) => {
        console.log(response);
        this.getDay();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchDays(key: string): void {
    // console.log(key);
    // const results: Day[] = [];
    // for (const day of this.day) {
    //   if (day.dayName.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || day.dayEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || day.dayDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || day.dayMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
    //     results.push(day);
    //   }
    // }
    // this.day = results;
    // if (results.length === 0 || !key) {
    //   this.getDay();
    // }
  }



  openUndo(targetModal: any) {
  this.modalService.open(targetModal, {ariaLabelledBy: 'modal-basic-title',backdrop: 'static',
    size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
 
}

onUndo(f: NgForm) {
  this.editForm = f.value;
console.log(f.value);
  
  this.dayService.undoDay(f.value).subscribe(
      (response:  Day) => {
        console.log(response);
        this.getDay();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
        this.toastr.error('unSuccessful!', error.message);
      }
    );
}

}

