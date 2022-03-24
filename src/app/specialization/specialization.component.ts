import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Specialization } from './specialization';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { SpecializationService } from './specialization.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';
import { CourseComponent } from '../course/course.component';
import { Course } from '../course/course';
import { CourseService } from '../course/course.service';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class SpecializationComponent implements OnInit {
  specialization: Specialization[] =[];
  // course:Course[]= [];
  closeResult: string = '';
 
  fb: any;
    editSpecialization: Specialization | undefined;
   editForm = {
   specializationId: 0,
    specializationName: '',

    specializationDesc: '',
  
  } ;

    course: Course[] =[];





deleteId = 0;
  constructor(private courseService: CourseService ,public  loaderService:LoaderService,private specializationService: SpecializationService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  
toDisplaySpecialization = false;
toDisplayCourse = false;
 event = window.event;
  undo = {
    specializationId:0
  };


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


   clickCount(): void{

    if (this.count == 0){
        this.toDisplayCourse = false;
this.toDisplaySpecialization = !this.toDisplaySpecialization;
this.count = 1;
    }
     if (this.count == 2){
        this.toDisplayCourse = false;
this.toDisplaySpecialization = !this.toDisplaySpecialization;
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
this.toDisplaySpecialization = !this.toDisplaySpecialization;
this.count++;
this.count2 = 0;




}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplaySpecialization = false;
       this.toDisplayCourse = !this.toDisplayCourse;
       this.count = 0;
       this.count2++
    }
    
  }
  ngOnInit():void {
this.loadingHandler.finish();
  
    // this.getcourse();
    this.getSpecialization();
    this.toggleData('dept');
    this.getCourse();
    
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getSpecialization(): void {
    this.specializationService.getspecialization().subscribe(
      data => {
      
this.specialization =data;
this.loadingHandler.finish();
        console.log(this.specialization);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getcourse(): void {
  //   this.specializationService.getcourse().subscribe(
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


 this.specializationService.addSpecialization(f.value).subscribe(
      (response: Specialization) => {
        console.log(response);
        this.getSpecialization();
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

//   const url = 'http://localhost:8888/specializations/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, specialization: Specialization) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
  // (<HTMLElement>document.getElementById('code')).setAttribute('value', specialization.specializationCode);
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', specialization.specializationName);
  //  (<HTMLElement>document.getElementById('dept')).setAttribute('value', specialization.specializationRequireLab);
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', specialization.specializationDesc);
  //  (<HTMLElement>document.getElementById('email2')).setAttribute('value', (specialization.courseName).toString());
  //  (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( specialization.specializationName).toString());
}



openEdit(targetModal: any, specialization: Specialization) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = specialization;

  // this.editForm.patchValue( {
  //   specializationId: specialization.specializationId, 
  //   specializationName: specialization.specializationName,
  //   specializationEmail: specialization.specializationEmail,
  //   specializationDesc: specialization.specializationDesc,
  //   specializationFacultyId: specialization.specializationFacultyId,
  //  specializationMobile: specialization.specializationMobile
  // });



 
     (<HTMLElement>document.getElementById('specializationId')).setAttribute('value', (specialization.specializationId).toString());
 (<HTMLElement>document.getElementById('specializationId')).setAttribute('data-target',(specialization.specializationId).toString());

   (<HTMLElement>document.getElementById('specializationName')).setAttribute('value', specialization.specializationName);
  //  (<HTMLElement>document.getElementById('specializationRequireLab')).setAttribute('value', specialization.specializationRequireLab);
  //      (<HTMLElement>document.getElementById('specializationEmail')).setAttribute('data-target',(specialization.specializationRequireLab).toString());
  
   (<HTMLElement>document.getElementById('specializationDesc')).setAttribute('value', specialization.specializationDesc);
  //  (<HTMLElement>document.getElementById('specializationCourseId')).setAttribute('value', (specialization.specializationCourseId).toString());
  //  (<HTMLElement>document.getElementById('specializationSpecializationId')).setAttribute('value',( specialization.specializationSpecializationId).toString());

}



 public onEdit(f: NgForm) {
  
 this.specializationService.updateSpecialization(this.editForm).subscribe(
      (response: Specialization) => {
        console.log(response);
        this.getSpecialization();
         this.toastr.success('specialization', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.error('unSuccessful', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, specialization: Specialization) {
  this.editForm = specialization;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.specializationService.deleteSpecialization(this.editForm).subscribe(
      (response: Specialization) => {
        console.log(response);
        this.getSpecialization();
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
  
  this.specializationService.undoSpecialization(f.value).subscribe(
      (response: Specialization) => {
        console.log(response);
        this.getSpecialization();
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


  public searchSpecializations(key: string): void {
    console.log(key);
    const results: Specialization[] = [];
    for (const specialization of this.specialization) {
      if (specialization.specializationName.toLowerCase().indexOf(key.toLowerCase()) !== -1
     
      || specialization.specializationDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
       ) {
        results.push(specialization);
      }
    }
    this.specialization = results;
    if (results.length === 0 || !key) {
      this.getSpecialization();
    }
  }

}
