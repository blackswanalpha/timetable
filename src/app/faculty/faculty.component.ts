import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Faculty } from './faculty';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { FacultyService } from './faculty.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';
import { Institution } from '../institution/institution';
import { InstitutionService } from '../institution/institution.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class FacultyComponent implements OnInit {
  faculty: Faculty[] =[];
   institution: Institution[] =[];
  // faculty:Faculty[]= [];
  closeResult: string = '';
 
  fb: any;
    editFaculty: Faculty | undefined;
   editForm = {
   facultyId: 0,
    facultyName: '',
    facultyEmail: '',
    facultyDesc: '',
    facultyInstitutionId: 0,
    facultyMobile: 0,
    institutionName:''
  } ;

  





deleteId = 0;
  constructor(public  loaderService:LoaderService,private institutionService: InstitutionService,private facultyService: FacultyService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  

    
  
  ngOnInit():void {
this.loadingHandler.finish();
  
    // this.getfaculty();
    this.getFaculty();
    this.getInstitution()
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getFaculty(): void {
    this.facultyService.getfaculty().subscribe(
      (response: Faculty[]) => {
      
this.faculty = response;
this.loadingHandler.finish();
        console.log(this.faculty);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
    public getInstitution(): void {
    this.institutionService.getinstitution().subscribe(
      (response: Institution[]) => {
      
this.institution = response;
this.loadingHandler.finish();
        console.log(this.institution);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getfaculty(): void {
  //   this.facultyService.getfaculty().subscribe(
  //     (response: Faculty[]) => {
  //       this.faculty = response;
  //       console.log(this.faculty);
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


 this.facultyService.addFaculty(f.value).subscribe(
      (response: Faculty) => {
        console.log(response);
        this.getFaculty();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/facultys/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, faculty: Faculty) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', faculty.facultyName);
   (<HTMLElement>document.getElementById('dept')).setAttribute('value', faculty.facultyEmail);
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', faculty.facultyDesc);
   (<HTMLElement>document.getElementById('email2')).setAttribute('value', (faculty.institutionName).toString());
   (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( faculty.facultyMobile).toString());
}



openEdit(targetModal: any, faculty: Faculty) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = faculty;

  // this.editForm.patchValue( {
  //   facultyId: faculty.facultyId, 
  //   facultyName: faculty.facultyName,
  //   facultyEmail: faculty.facultyEmail,
  //   facultyDesc: faculty.facultyDesc,
  //   facultyFacultyId: faculty.facultyFacultyId,
  //  facultyMobile: faculty.facultyMobile
  // });



 
     (<HTMLElement>document.getElementById('facultyId')).setAttribute('value', (faculty.facultyId).toString());
 (<HTMLElement>document.getElementById('facultyId')).setAttribute('data-target',(faculty.facultyId).toString());
   (<HTMLElement>document.getElementById('facultyName')).setAttribute('value', faculty.facultyName);
   (<HTMLElement>document.getElementById('facultyEmail')).setAttribute('value', faculty.facultyEmail);
       (<HTMLElement>document.getElementById('facultyEmail')).setAttribute('data-target',(faculty.facultyEmail).toString());
  
   (<HTMLElement>document.getElementById('facultyDesc')).setAttribute('value', faculty.facultyDesc);
   (<HTMLElement>document.getElementById('facultyInstitutionId')).setAttribute('value', (faculty.facultyInstitutionId).toString());
   (<HTMLElement>document.getElementById('facultyMobile')).setAttribute('value',( faculty.facultyMobile).toString());

}



 public onEdit(f: NgForm) {
  
 this.facultyService.updateFaculty(this.editForm).subscribe(
      (response: Faculty) => {
        console.log(response);
        this.getFaculty();
         this.toastr.success('faculty', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.success('Hello world!', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, faculty: Faculty) {
  this.editForm = faculty;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.facultyService.deleteFaculty(this.editForm).subscribe(
      (response: Faculty) => {
        console.log(response);
        this.getFaculty();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchFacultys(key: string): void {
    console.log(key);
    const results: Faculty[] = [];
    for (const faculty of this.faculty) {
      if (faculty.facultyName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || faculty.facultyEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || faculty.facultyDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || faculty.facultyMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(faculty);
      }
    }
    this.faculty = results;
    if (results.length === 0 || !key) {
      this.getFaculty();
    }
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
  
  this.facultyService.undoFaculty(f.value).subscribe(
      (response:  Faculty) => {
        console.log(response);
        this.getFaculty();
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

