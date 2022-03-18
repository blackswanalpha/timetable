import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Institution } from './institution';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { InstitutionService } from './institution.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class InstitutionComponent implements OnInit {
  institution: Institution[] =[];
  // course:Course[]= [];
  closeResult: string = '';
 
  fb: any;
    editInstitution: Institution | undefined;
   editForm = {
   institutionId: 0,
    institutionName: '',
    institutionEmail: '',
    institutionDesc: '',
    institutionLogo: '',
    institutionMobile: 0
  } ;

  





deleteId = 0;
  constructor(public  loaderService:LoaderService,private institutionService: InstitutionService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  
toDisplayDepartment = false;
toDisplayCourse = false;
toDisplayUnit = false;
toDisplayFaculty = false;

 event = window.event;
  


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


   toggleData(name:string) {
    if (name =='dept' && this.count == 0){
//     (<HTMLElement>document.getElementById("idOfButton")).addEventListener('(click)', (event) => {  
//   event.removeEventListener();  
// });
  this.toDisplayCourse = false;
  this.toDisplayUnit = false;
  this.toDisplayFaculty = false;
this.toDisplayDepartment = !this.toDisplayDepartment;

this.count++;
this.count2 = 0;
this.count3 = 0;
 this.count4 = 0;

}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayDepartment = false;
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
       this.toDisplayDepartment = false;
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
       this.toDisplayDepartment = false;
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
this.loadingHandler.finish();
  
    // this.getcourse();
    this.getInstitution();
    this.toggleData('dept');
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

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

  // public getcourse(): void {
  //   this.institutionService.getcourse().subscribe(
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


 this.institutionService.addInstitution(f.value).subscribe(
      (response: Institution) => {
        console.log(response);
        this.getInstitution();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/institutions/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, institution: Institution) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', institution.institutionName);
   (<HTMLElement>document.getElementById('dept')).setAttribute('value', institution.institutionEmail);
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', institution.institutionDesc);
    (<HTMLElement>document.getElementById('email2')).setAttribute('value', institution.institutionLogo);
 
  // (<HTMLElement>document.getElementById('email2')).setAttribute('value', (institution.institutionFacultyId).toString());
   (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( institution.institutionMobile).toString());
}



openEdit(targetModal: any, institution: Institution) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = institution;

  // this.editForm.patchValue( {
  //   institutionId: institution.institutionId, 
  //   institutionName: institution.institutionName,
  //   institutionEmail: institution.institutionEmail,
  //   institutionDesc: institution.institutionDesc,
  //   institutionFacultyId: institution.institutionFacultyId,
  //  institutionMobile: institution.institutionMobile
  // });



 
     (<HTMLElement>document.getElementById('institutionId')).setAttribute('value', (institution.institutionId).toString());
 (<HTMLElement>document.getElementById('institutionId')).setAttribute('data-target',(institution.institutionId).toString());
   (<HTMLElement>document.getElementById('institutionName')).setAttribute('value', institution.institutionName);
   (<HTMLElement>document.getElementById('institutionEmail')).setAttribute('value', institution.institutionEmail);
       (<HTMLElement>document.getElementById('institutionEmail')).setAttribute('data-target',(institution.institutionEmail).toString());
  (<HTMLElement>document.getElementById('institutionLogo')).setAttribute('value', institution.institutionLogo);
   (<HTMLElement>document.getElementById('institutionDesc')).setAttribute('value', institution.institutionDesc);
  // (<HTMLElement>document.getElementById('institutionFacultyId')).setAttribute('value', (institution.institutionFacultyId).toString());
   (<HTMLElement>document.getElementById('institutionMobile')).setAttribute('value',( institution.institutionMobile).toString());

}



 public onEdit(f: NgForm) {
  
 this.institutionService.updateInstitution(this.editForm).subscribe(
      (response: Institution) => {
        console.log(response);
        this.getInstitution();
         this.toastr.success('institution', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.success('Hello world!', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, institution: Institution) {
  this.editForm = institution;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.institutionService.deleteInstitution(this.editForm).subscribe(
      (response: Institution) => {
        console.log(response);
        this.getInstitution();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchInstitutions(key: string): void {
    console.log(key);
    const results: Institution[] = [];
    for (const institution of this.institution) {
      if (institution.institutionName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || institution.institutionEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || institution.institutionDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || institution.institutionMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(institution);
      }
    }
    this.institution = results;
    if (results.length === 0 || !key) {
      this.getInstitution();
    }
  }

}
