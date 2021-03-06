import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lecturer } from './lecturer';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { LecturerService } from './lecturer.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class LecturerComponent implements OnInit {
  lecturer: Lecturer[] =[];
  // lecturer:Lecturer[]= [];
  closeResult: string = '';
 
  fb: any;
    editLecturer: Lecturer | undefined;
   editForm = {
   lecturerId:0,lecturerContact:0,lecturerLoginId:0, lecturerStaffNo:0,lecturerTypeId:0,
lecturerName:'',lecturerEmail:'',lecturerImage:'',lecturerGender:'',lecturerLocation:'',lecturerActive:'',

  } ;

  





deleteId = 0;
  


// loadingHandler = new LoadingHandler();
  
toDisplayLecturer = false;
toDisplayFaculty = false;
toDisplayCourse = false;
toDisplayUnit = false;


event = window.event;
  


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


  constructor(public  loaderService:LoaderService,private lecturerService: LecturerService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}


  toggleData(name:string) {
    if (name =='dept' && this.count == 0){
//     (<HTMLElement>document.getElementById("idOfButton")).addEventListener('(click)', (event) => {  
//   event.removeEventListener();  
// });
  this.toDisplayCourse = false;
  this.toDisplayUnit = false;
  this.toDisplayFaculty = false;
this.toDisplayLecturer = !this.toDisplayLecturer;

this.count++;
this.count2 = 0;
this.count3 = 0;
 this.count4 = 0;

}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayLecturer = false;
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
       this.toDisplayLecturer = false;
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
       this.toDisplayLecturer = false;
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
  
    // this.getlecturer();
    this.getLecturer();
    this.toggleData('dept');
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getLecturer(): void {
    this.lecturerService.getlecturer().subscribe(
      (response: Lecturer[]) => {
      
this.lecturer = response;
// this.loadingHandler.finish();
        console.log(this.lecturer);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getlecturer(): void {
  //   this.lecturerService.getlecturer().subscribe(
  //     (response: Lecturer[]) => {
  //       this.lecturer = response;
  //       console.log(this.lecturer);
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


 this.lecturerService.addLecturer(f.value).subscribe(
      (response: Lecturer) => {
        console.log(response);
        this.getLecturer();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/lecturers/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, lecturer: Lecturer) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
  
      (<HTMLElement>document.getElementById('dept')).setAttribute('value',( lecturer.lecturerStaffNo).toString());
   (<HTMLElement>document.getElementById('email2')).setAttribute('value', (lecturer.lecturerTypeId).toString());
  //  (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( lecturer.lecturerMobile).toString());
}



openEdit(targetModal: any, lecturer: Lecturer) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = lecturer;

  // this.editForm.patchValue( {
  //   lecturerId: lecturer.lecturerId, 
  //   lecturerName: lecturer.lecturerName,
  //   lecturerEmail: lecturer.lecturerEmail,
  //   lecturerDesc: lecturer.lecturerDesc,
  //   lecturerFacultyId: lecturer.lecturerFacultyId,
  //  lecturerMobile: lecturer.lecturerMobile
  // });



 
     (<HTMLElement>document.getElementById('lecturerId')).setAttribute('value', (lecturer.lecturerId).toString());
 (<HTMLElement>document.getElementById('lecturerId')).setAttribute('data-target',(lecturer.lecturerId).toString());
   (<HTMLElement>document.getElementById('lecturerName')).setAttribute('value', lecturer.lecturerName);
   (<HTMLElement>document.getElementById('lecturerEmail')).setAttribute('value', lecturer.lecturerEmail);
  //      (<HTMLElement>document.getElementById('lecturerEmail')).setAttribute('data-target',(lecturer.lecturerEmail).toString());
  
  //  (<HTMLElement>document.getElementById('lecturerDesc')).setAttribute('value', lecturer.lecturerDesc);
   (<HTMLElement>document.getElementById('lecturerlecturerTypeId')).setAttribute('value', (lecturer.lecturerTypeId).toString());
   (<HTMLElement>document.getElementById('lecturerStaffNo')).setAttribute('value',( lecturer.lecturerStaffNo).toString());

}



 public onEdit(f: NgForm) {
  
 this.lecturerService.updateLecturer(this.editForm).subscribe(
      (response: Lecturer) => {
        console.log(response);
        this.getLecturer();
         this.toastr.success('lecturer', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.success('Hello world!', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, lecturer: Lecturer) {
  this.editForm = lecturer;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.lecturerService.deleteLecturer(this.editForm).subscribe(
      (response: Lecturer) => {
        console.log(response);
        this.getLecturer();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchLecturers(key: string): void {
    // console.log(key);
    // const results: Lecturer[] = [];
    // for (const lecturer of this.lecturer) {
    //   if (lecturer.lecturerName.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || lecturer.lecturerEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || lecturer.lecturerDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || lecturer.lecturerMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
    //     results.push(lecturer);
    //   }
    // }
    // this.lecturer = results;
    // if (results.length === 0 || !key) {
    //   this.getLecturer();
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
  
  this.lecturerService.undoLecturer(f.value).subscribe(
      (response:  Lecturer) => {
        console.log(response);
        this.getLecturer();
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
