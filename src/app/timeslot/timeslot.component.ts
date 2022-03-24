import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Timeslot } from './timeslot';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { TimeslotService } from './timeslot.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';
import { CourseComponent } from '../course/course.component';
import { Course } from '../course/course';
import { CourseService } from '../course/course.service';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class TimeslotComponent implements OnInit {
  timeslot: Timeslot[] =[];
  // course:Course[]= [];
  closeResult: string = '';
 
  fb: any;
    editTimeslot: Timeslot | undefined;
   editForm = {
   timeslotId: 0,
    timeslotName: '',
    timeslotCampusId:0,
    timeslotModeId:0,

   
   timeslotDesc:''
  } ;

    course: Course[] =[];





deleteId = 0;
  constructor(private courseService: CourseService ,public  loaderService:LoaderService,private timeslotService: TimeslotService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  
toDisplayTimeslot = false;
toDisplayCourse = false;
 event = window.event;
  undo = {
    timeslotId:0
  };


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


   clickCount(): void{

    if (this.count == 0){
        this.toDisplayCourse = false;
this.toDisplayTimeslot = !this.toDisplayTimeslot;
this.count = 1;
    }
     if (this.count == 2){
        this.toDisplayCourse = false;
this.toDisplayTimeslot = !this.toDisplayTimeslot;
this.count = 2;
;

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
this.toDisplayTimeslot = !this.toDisplayTimeslot;
this.count++;
this.count2 = 0;




}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayTimeslot = false;
       this.toDisplayCourse = !this.toDisplayCourse;
       this.count = 0;
       this.count2++
    }
    
  }
  ngOnInit():void {
this.loadingHandler.finish();
  
    // this.getcourse();
    this.getTimeslot();
    this.toggleData('dept');
    this.getCourse();
    
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getTimeslot(): void {
    this.timeslotService.gettimeslot().subscribe(
      (response: Timeslot[]) => {
      
this.timeslot = response;
this.loadingHandler.finish();
        console.log(this.timeslot);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getcourse(): void {
  //   this.timeslotService.getcourse().subscribe(
  //     (response: Course[]) => {
  //       this.course = response;
  //       console.log(this.course);
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


 this.timeslotService.addTimeslot(f.value).subscribe(
      (response: Timeslot) => {
        console.log(response);
        this.getTimeslot();
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

   
    public getCourse(): void {
    this.courseService.getcourse().subscribe(
      (response: Course[]) => {
      
this.course = response;

        console.log(this.course);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

//   const url = 'http://localhost:8888/timeslots/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, timeslot: Timeslot) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', timeslot.timeslotName);
(<HTMLElement>document.getElementById('lname')).setAttribute('value', timeslot.timeslotDesc);
  //  (<HTMLElement>document.getElementById('email2')).setAttribute('value', (timeslot.timeslotId).toString());
   (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( timeslot.timeslotCampusId).toString());
   (<HTMLElement>document.getElementById('dept')).setAttribute('value',( timeslot.timeslotModeId).toString());
  // (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( timeslot.timeslotYear).toString());
}



openEdit(targetModal: any, timeslot: Timeslot) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = timeslot;

  // this.editForm.patchValue( {
  //   timeslotId: timeslot.timeslotId, 
  //   timeslotName: timeslot.timeslotName,
  //   timeslotEmail: timeslot.timeslotEmail,
  //   timeslotDesc: timeslot.timeslotDesc,
  //   timeslotFacultyId: timeslot.timeslotFacultyId,
  //  timeslotMobile: timeslot.timeslotMobile
  // });



 
     (<HTMLElement>document.getElementById('timeslotId')).setAttribute('value', (timeslot.timeslotId).toString());
 (<HTMLElement>document.getElementById('timeslotId')).setAttribute('data-target',(timeslot.timeslotId).toString());
  (<HTMLElement>document.getElementById('timeslotName')).setAttribute('value', timeslot.timeslotName);
    (<HTMLElement>document.getElementById('timeslotDesc')).setAttribute('value', timeslot.timeslotDesc);
   (<HTMLElement>document.getElementById('timeslotCampusId')).setAttribute('value', (timeslot.timeslotCampusId).toString());
   (<HTMLElement>document.getElementById('timeslotModeId')).setAttribute('value', (timeslot.timeslotModeId).toString());

}



 public onEdit(f: NgForm) {
  
 this.timeslotService.updateTimeslot(this.editForm).subscribe(
      (response: Timeslot) => {
        console.log(response);
        this.getTimeslot();
         this.toastr.success('timeslot', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.error('unSuccessful', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, timeslot: Timeslot) {
  this.editForm = timeslot;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.timeslotService.deleteTimeslot(this.editForm).subscribe(
      (response: Timeslot) => {
        console.log(response);
        this.getTimeslot();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
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
  
  this.timeslotService.undoTimeslot(f.value).subscribe(
      (response: Timeslot) => {
        console.log(response);
        this.getTimeslot();
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


  public searchTimeslots(key: string): void {
    console.log(key);
    const results: Timeslot[] = [];
    for (const timeslot of this.timeslot) {
      if (timeslot.timeslotName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(timeslot);
      }
    }
    this.timeslot = results;
    if (results.length === 0 || !key) {
      this.getTimeslot();
    }
  }

}



// || timeslot.timeslotRequireLab.toLowerCase().indexOf(key.toLowerCase()) !== -1
//       || timeslot.timeslotDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
//       || timeslot.timeslotSpecializationId.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1