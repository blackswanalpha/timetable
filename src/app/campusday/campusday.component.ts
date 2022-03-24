import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Campusday } from './campusday';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { CampusdayService } from './campusday.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';
import { CourseComponent } from '../course/course.component';
import { Course } from '../course/course';
import { CourseService } from '../course/course.service';

@Component({
  selector: 'app-campusday',
  templateUrl: './campusday.component.html',
  styleUrls: ['./campusday.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class CampusdayComponent implements OnInit {
  campusday: Campusday[] =[];
  // course:Course[]= [];
  closeResult: string = '';
 
  fb: any;
    editCampusday: Campusday | undefined;
   editForm = {
   campusdayId: 0,
    campusdayTimeslotId: 0,
    campusdayCampusId:0,
    campusdayModeId:0,

   
   campusdayDayId:0
  } ;

    course: Course[] =[];





deleteId = 0;
  constructor(private courseService: CourseService ,public  loaderService:LoaderService,private campusdayService: CampusdayService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  
toDisplayCampusday = false;
toDisplayCourse = false;
 event = window.event;
  undo = {
    campusdayId:0
  };


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


   clickCount(): void{

    if (this.count == 0){
        this.toDisplayCourse = false;
this.toDisplayCampusday = !this.toDisplayCampusday;
this.count = 1;
    }
     if (this.count == 2){
        this.toDisplayCourse = false;
this.toDisplayCampusday = !this.toDisplayCampusday;
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
this.toDisplayCampusday = !this.toDisplayCampusday;
this.count++;
this.count2 = 0;




}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayCampusday = false;
       this.toDisplayCourse = !this.toDisplayCourse;
       this.count = 0;
       this.count2++
    }
    
  }
  ngOnInit():void {
this.loadingHandler.finish();
  
    // this.getcourse();
    this.getCampusday();
    this.toggleData('dept');
    this.getCourse();
    
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getCampusday(): void {
    this.campusdayService.getcampusday().subscribe(
      (response: Campusday[]) => {
      
this.campusday = response;
this.loadingHandler.finish();
        console.log(this.campusday);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getcourse(): void {
  //   this.campusdayService.getcourse().subscribe(
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


 this.campusdayService.addCampusday(f.value).subscribe(
      (response: Campusday) => {
        console.log(response);
        this.getCampusday();
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

//   const url = 'http://localhost:8888/campusdays/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, campusday: Campusday) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
    (<HTMLElement>document.getElementById('fname')).setAttribute('value',( campusday.campusdayDayId).toString());
   (<HTMLElement>document.getElementById('lname')).setAttribute('value',( campusday.campusdayTimeslotId).toString());
 
//    (<HTMLElement>document.getElementById('fname')).setAttribute('value', campusday.campusdayName);
// (<HTMLElement>document.getElementById('lname')).setAttribute('value', campusday.campusdayDesc);
  //  (<HTMLElement>document.getElementById('email2')).setAttribute('value', (campusday.campusdayId).toString());
   (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( campusday.campusdayCampusId).toString());
   (<HTMLElement>document.getElementById('dept')).setAttribute('value',( campusday.campusdayModeId).toString());
  // (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( campusday.campusdayYear).toString());
}



openEdit(targetModal: any, campusday: Campusday) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = campusday;

  // this.editForm.patchValue( {
  //   campusdayId: campusday.campusdayId, 
  //   campusdayName: campusday.campusdayName,
  //   campusdayEmail: campusday.campusdayEmail,
  //   campusdayDesc: campusday.campusdayDesc,
  //   campusdayFacultyId: campusday.campusdayFacultyId,
  //  campusdayMobile: campusday.campusdayMobile
  // });



 
     (<HTMLElement>document.getElementById('campusdayId')).setAttribute('value', (campusday.campusdayId).toString());
 (<HTMLElement>document.getElementById('campusdayId')).setAttribute('data-target',(campusday.campusdayId).toString());
  (<HTMLElement>document.getElementById('campusdayTimeslotId')).setAttribute('value', (campusday.campusdayTimeslotId).toString());
    (<HTMLElement>document.getElementById('campusdayDayId')).setAttribute('value', (campusday.campusdayDayId).toString());
   (<HTMLElement>document.getElementById('campusdayCampusId')).setAttribute('value', (campusday.campusdayCampusId).toString());
   (<HTMLElement>document.getElementById('campusdayModeId')).setAttribute('value', (campusday.campusdayModeId).toString());

}



 public onEdit(f: NgForm) {
  
 this.campusdayService.updateCampusday(this.editForm).subscribe(
      (response: Campusday) => {
        console.log(response);
        this.getCampusday();
         this.toastr.success('campusday', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.error('unSuccessful', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, campusday: Campusday) {
  this.editForm = campusday;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.campusdayService.deleteCampusday(this.editForm).subscribe(
      (response: Campusday) => {
        console.log(response);
        this.getCampusday();
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
  
  this.campusdayService.undoCampusday(f.value).subscribe(
      (response: Campusday) => {
        console.log(response);
        this.getCampusday();
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


  public searchCampusdays(key: string): void {
    console.log(key);
    const results: Campusday[] = [];
    for (const campusday of this.campusday) {
      if (campusday.campusdayDayId.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(campusday);
      }
    }
    this.campusday = results;
    if (results.length === 0 || !key) {
      this.getCampusday();
    }
  }

}



// || campusday.campusdayRequireLab.toLowerCase().indexOf(key.toLowerCase()) !== -1
//       || campusday.campusdayDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
//       || campusday.campusdaySpecializationId.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1