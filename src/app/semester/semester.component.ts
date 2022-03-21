import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Semester } from './semester';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { SemesterService } from './semester.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';
import { CourseComponent } from '../course/course.component';
import { Course } from '../course/course';
import { CourseService } from '../course/course.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class SemesterComponent implements OnInit {
  semester: Semester[] =[];
  // course:Course[]= [];
  closeResult: string = '';
 
  fb: any;
    editSemester: Semester | undefined;
   editForm = {
   semesterId: 0,
    semesterName: '',
    

   
    semesterYear: 0
  } ;

    course: Course[] =[];





deleteId = 0;
  constructor(private courseService: CourseService ,public  loaderService:LoaderService,private semesterService: SemesterService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  
toDisplaySemester = false;
toDisplayCourse = false;
 event = window.event;
  undo = {
    semesterId:0
  };


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


   clickCount(): void{

    if (this.count == 0){
        this.toDisplayCourse = false;
this.toDisplaySemester = !this.toDisplaySemester;
this.count = 1;
    }
     if (this.count == 2){
        this.toDisplayCourse = false;
this.toDisplaySemester = !this.toDisplaySemester;
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
this.toDisplaySemester = !this.toDisplaySemester;
this.count++;
this.count2 = 0;




}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplaySemester = false;
       this.toDisplayCourse = !this.toDisplayCourse;
       this.count = 0;
       this.count2++
    }
    
  }
  ngOnInit():void {
this.loadingHandler.finish();
  
    // this.getcourse();
    this.getSemester();
    this.toggleData('dept');
    this.getCourse();
    
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getSemester(): void {
    this.semesterService.getsemester().subscribe(
      (response: Semester[]) => {
      
this.semester = response;
this.loadingHandler.finish();
        console.log(this.semester);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getcourse(): void {
  //   this.semesterService.getcourse().subscribe(
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


 this.semesterService.addSemester(f.value).subscribe(
      (response: Semester) => {
        console.log(response);
        this.getSemester();
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

//   const url = 'http://localhost:8888/semesters/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, semester: Semester) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', semester.semesterName);

  //  (<HTMLElement>document.getElementById('email2')).setAttribute('value', (semester.semesterId).toString());
   (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( semester.semesterYear).toString());
}



openEdit(targetModal: any, semester: Semester) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = semester;

  // this.editForm.patchValue( {
  //   semesterId: semester.semesterId, 
  //   semesterName: semester.semesterName,
  //   semesterEmail: semester.semesterEmail,
  //   semesterDesc: semester.semesterDesc,
  //   semesterFacultyId: semester.semesterFacultyId,
  //  semesterMobile: semester.semesterMobile
  // });



 
     (<HTMLElement>document.getElementById('semesterId')).setAttribute('value', (semester.semesterId).toString());
 (<HTMLElement>document.getElementById('semesterId')).setAttribute('data-target',(semester.semesterId).toString());
  (<HTMLElement>document.getElementById('semesterName')).setAttribute('value', semester.semesterName);
   (<HTMLElement>document.getElementById('semesterYear')).setAttribute('value', (semester.semesterYear).toString());

}



 public onEdit(f: NgForm) {
  
 this.semesterService.updateSemester(this.editForm).subscribe(
      (response: Semester) => {
        console.log(response);
        this.getSemester();
         this.toastr.success('semester', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.error('unSuccessful', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, semester: Semester) {
  this.editForm = semester;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.semesterService.deleteSemester(this.editForm).subscribe(
      (response: Semester) => {
        console.log(response);
        this.getSemester();
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
  
  this.semesterService.undoSemester(f.value).subscribe(
      (response: Semester) => {
        console.log(response);
        this.getSemester();
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


  public searchSemesters(key: string): void {
    console.log(key);
    const results: Semester[] = [];
    for (const semester of this.semester) {
      if (semester.semesterName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(semester);
      }
    }
    this.semester = results;
    if (results.length === 0 || !key) {
      this.getSemester();
    }
  }

}



// || semester.semesterRequireLab.toLowerCase().indexOf(key.toLowerCase()) !== -1
//       || semester.semesterDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
//       || semester.semesterSpecializationId.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1