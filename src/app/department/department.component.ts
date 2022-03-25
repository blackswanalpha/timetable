import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from './department';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { DepartmentService } from './department.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';
import { FacultyService } from '../faculty/faculty.service';
import { Faculty } from '../faculty/faculty';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class DepartmentComponent implements OnInit {
  department: Department[] =[];
  faculty: Faculty[] =[];
  // department:Department[]= [];
  closeResult: string = '';
 
  fb: any;
    editDepartment: Department | undefined;
   editForm = {
   departmentId: 0,
    departmentName: '',
    departmentEmail: '',
    departmentDesc: '',
    departmentFacultyId: 0,
    departmentMobile: 0,
    facultyName:''
  } ;

  





deleteId = 0;
  


// loadingHandler = new LoadingHandler();
  
toDisplayDepartment = false;
toDisplayFaculty = false;
toDisplayCourse = false;
toDisplayUnit = false;


event = window.event;
  


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


  constructor(public  loaderService:LoaderService,private facultyService: FacultyService,private departmentService: DepartmentService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}


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
// this.loadingHandler.finish();
  
    // this.getdepartment();
    this.getDepartment();
    this.toggleData('dept');
    this.getFaculty();
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getDepartment(): void {
    this.departmentService.getdepartment().subscribe(
      (response: Department[]) => {
      
this.department = response;
// this.loadingHandler.finish();
        console.log(this.department);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
public getFaculty(): void {
    this.facultyService.getfaculty().subscribe(
      (response: Faculty[]) => {
      
this.faculty = response;

        console.log(this.faculty);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // public getdepartment(): void {
  //   this.departmentService.getdepartment().subscribe(
  //     (response: Department[]) => {
  //       this.department = response;
  //       console.log(this.department);
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


 this.departmentService.addDepartment(f.value).subscribe(
      (response: Department) => {
        console.log(response);
        this.getDepartment();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/departments/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, department: Department) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', department.departmentName);
   (<HTMLElement>document.getElementById('dept')).setAttribute('value', department.departmentEmail);
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', department.departmentDesc);
   (<HTMLElement>document.getElementById('email2')).setAttribute('value', (department.facultyName).toString());
   (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( department.departmentMobile).toString());
}



openEdit(targetModal: any, department: Department) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = department;

  // this.editForm.patchValue( {
  //   departmentId: department.departmentId, 
  //   departmentName: department.departmentName,
  //   departmentEmail: department.departmentEmail,
  //   departmentDesc: department.departmentDesc,
  //   departmentFacultyId: department.departmentFacultyId,
  //  departmentMobile: department.departmentMobile
  // });



 
     (<HTMLElement>document.getElementById('departmentId')).setAttribute('value', (department.departmentId).toString());
 (<HTMLElement>document.getElementById('departmentId')).setAttribute('data-target',(department.departmentId).toString());
   (<HTMLElement>document.getElementById('departmentName')).setAttribute('value', department.departmentName);
   (<HTMLElement>document.getElementById('departmentEmail')).setAttribute('value', department.departmentEmail);
       (<HTMLElement>document.getElementById('departmentEmail')).setAttribute('data-target',(department.departmentEmail).toString());
  
   (<HTMLElement>document.getElementById('departmentDesc')).setAttribute('value', department.departmentDesc);
   (<HTMLElement>document.getElementById('departmentFacultyId')).setAttribute('value', (department.departmentFacultyId).toString());
   (<HTMLElement>document.getElementById('departmentMobile')).setAttribute('value',( department.departmentMobile).toString());

}



 public onEdit(f: NgForm) {
  
 this.departmentService.updateDepartment(this.editForm).subscribe(
      (response: Department) => {
        console.log(response);
        this.getDepartment();
         this.toastr.success('department', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.success('Hello world!', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, department: Department) {
  this.editForm = department;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.departmentService.deleteDepartment(this.editForm).subscribe(
      (response: Department) => {
        console.log(response);
        this.getDepartment();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchDepartments(key: string): void {
    console.log(key);
    const results: Department[] = [];
    for (const department of this.department) {
      if (department.departmentName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || department.departmentEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || department.departmentDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || department.departmentMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(department);
      }
    }
    this.department = results;
    if (results.length === 0 || !key) {
      this.getDepartment();
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
  
  this.departmentService.undoDepartment(f.value).subscribe(
      (response:  Department) => {
        console.log(response);
        this.getDepartment();
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
