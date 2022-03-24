import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lecturerspecialization } from './lecturerspecialization';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { LecturerspecializationService } from './lecturerspecialization.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';

@Component({
  selector: 'app-lecturerspecialization',
  templateUrl: './lecturerspecialization.component.html',
  styleUrls: ['./lecturerspecialization.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class LecturerspecializationComponent implements OnInit {
  lecturerspecialization: Lecturerspecialization[] =[];
  // lecturerspecialization:Lecturerspecialization[]= [];
  closeResult: string = '';
 
  fb: any;
    editLecturerspecialization: Lecturerspecialization | undefined;
   editForm = {
   lecturerspecializationId: 0,
    lecturerspecializationLecturerId: 0,
    lecturerspecializationSpecializationId: 0
  } ;

  





deleteId = 0;
  


// loadingHandler = new LoadingHandler();
  
toDisplayLecturerspecialization = false;
toDisplayFaculty = false;
toDisplayCourse = false;
toDisplayUnit = false;


event = window.event;
  


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


  constructor(public  loaderService:LoaderService,private lecturerspecializationService: LecturerspecializationService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}


  toggleData(name:string) {
    if (name =='dept' && this.count == 0){
//     (<HTMLElement>document.getElementById("idOfButton")).addEventListener('(click)', (event) => {  
//   event.removeEventListener();  
// });
  this.toDisplayCourse = false;
  this.toDisplayUnit = false;
  this.toDisplayFaculty = false;
this.toDisplayLecturerspecialization = !this.toDisplayLecturerspecialization;

this.count++;
this.count2 = 0;
this.count3 = 0;
 this.count4 = 0;

}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayLecturerspecialization = false;
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
       this.toDisplayLecturerspecialization = false;
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
       this.toDisplayLecturerspecialization = false;
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
  
    // this.getlecturerspecialization();
    this.getLecturerspecialization();
    this.toggleData('dept');
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getLecturerspecialization(): void {
    this.lecturerspecializationService.getlecturerspecialization().subscribe(
      (response: Lecturerspecialization[]) => {
      
this.lecturerspecialization = response;
// this.loadingHandler.finish();
        console.log(this.lecturerspecialization);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getlecturerspecialization(): void {
  //   this.lecturerspecializationService.getlecturerspecialization().subscribe(
  //     (response: Lecturerspecialization[]) => {
  //       this.lecturerspecialization = response;
  //       console.log(this.lecturerspecialization);
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


 this.lecturerspecializationService.addLecturerspecialization(f.value).subscribe(
      (response: Lecturerspecialization) => {
        console.log(response);
        this.getLecturerspecialization();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/lecturerspecializations/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, lecturerspecialization: Lecturerspecialization) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
  
      (<HTMLElement>document.getElementById('dept')).setAttribute('value',( lecturerspecialization.lecturerspecializationSpecializationId).toString());
   (<HTMLElement>document.getElementById('email2')).setAttribute('value', (lecturerspecialization.lecturerspecializationLecturerId).toString());
  //  (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( lecturerspecialization.lecturerspecializationMobile).toString());
}



openEdit(targetModal: any, lecturerspecialization: Lecturerspecialization) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = lecturerspecialization;

  // this.editForm.patchValue( {
  //   lecturerspecializationId: lecturerspecialization.lecturerspecializationId, 
  //   lecturerspecializationName: lecturerspecialization.lecturerspecializationName,
  //   lecturerspecializationEmail: lecturerspecialization.lecturerspecializationEmail,
  //   lecturerspecializationDesc: lecturerspecialization.lecturerspecializationDesc,
  //   lecturerspecializationFacultyId: lecturerspecialization.lecturerspecializationFacultyId,
  //  lecturerspecializationMobile: lecturerspecialization.lecturerspecializationMobile
  // });



 
     (<HTMLElement>document.getElementById('lecturerspecializationId')).setAttribute('value', (lecturerspecialization.lecturerspecializationId).toString());
 (<HTMLElement>document.getElementById('lecturerspecializationId')).setAttribute('data-target',(lecturerspecialization.lecturerspecializationId).toString());
  //  (<HTMLElement>document.getElementById('lecturerspecializationName')).setAttribute('value', lecturerspecialization.lecturerspecializationName);
  //  (<HTMLElement>document.getElementById('lecturerspecializationEmail')).setAttribute('value', lecturerspecialization.lecturerspecializationEmail);
  //      (<HTMLElement>document.getElementById('lecturerspecializationEmail')).setAttribute('data-target',(lecturerspecialization.lecturerspecializationEmail).toString());
  
  //  (<HTMLElement>document.getElementById('lecturerspecializationDesc')).setAttribute('value', lecturerspecialization.lecturerspecializationDesc);
   (<HTMLElement>document.getElementById('lecturerspecializationSpecializationId')).setAttribute('value', (lecturerspecialization.lecturerspecializationSpecializationId).toString());
   (<HTMLElement>document.getElementById('lecturerspecializationLecturerId')).setAttribute('value',( lecturerspecialization.lecturerspecializationLecturerId).toString());

}



 public onEdit(f: NgForm) {
  
 this.lecturerspecializationService.updateLecturerspecialization(this.editForm).subscribe(
      (response: Lecturerspecialization) => {
        console.log(response);
        this.getLecturerspecialization();
         this.toastr.success('lecturerspecialization', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.success('Hello world!', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, lecturerspecialization: Lecturerspecialization) {
  this.editForm = lecturerspecialization;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.lecturerspecializationService.deleteLecturerspecialization(this.editForm).subscribe(
      (response: Lecturerspecialization) => {
        console.log(response);
        this.getLecturerspecialization();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchLecturerspecializations(key: string): void {
    // console.log(key);
    // const results: Lecturerspecialization[] = [];
    // for (const lecturerspecialization of this.lecturerspecialization) {
    //   if (lecturerspecialization.lecturerspecializationName.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || lecturerspecialization.lecturerspecializationEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || lecturerspecialization.lecturerspecializationDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || lecturerspecialization.lecturerspecializationMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
    //     results.push(lecturerspecialization);
    //   }
    // }
    // this.lecturerspecialization = results;
    // if (results.length === 0 || !key) {
    //   this.getLecturerspecialization();
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
  
  this.lecturerspecializationService.undoLecturerspecialization(f.value).subscribe(
      (response:  Lecturerspecialization) => {
        console.log(response);
        this.getLecturerspecialization();
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
