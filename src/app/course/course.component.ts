import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from './course';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { CourseService } from './course.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';
import { DepartmentService } from '../department/department.service';
import { Department } from '../department/department';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class CourseComponent implements OnInit {
  course: Course[] =[];
    department: Department[] =[];
  // course:Course[]= [];
  closeResult: string = '';
 
  fb: any;
    editCourse: Course | undefined;
   editForm = {
   courseId: 0,
    courseName: '',
    departmentName:'',
    courseDesc: '',
    courseDepartmentId: 0,
   
  } ;

  





deleteId = 0;
  constructor(public  loaderService:LoaderService,private departmentService: DepartmentService,private courseService: CourseService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  

  ngOnInit() {
// this.loadingHandler.start();

  
    // this.getcourse();
    this.getCourse();
    this.getDepartment();
    
     
     
   
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
  // public getcourse(): void {
  //   this.courseService.getcourse().subscribe(
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


 this.courseService.addCourse(f.value).subscribe(
      (response: Course) => {
        console.log(response);
        this.getCourse();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.toastr.error('Unsuccessful', error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/courses/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, course: Course) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', course.courseName);
  //  (<HTMLElement>document.getElementById('dept')).setAttribute('value', course.courseEmail);
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', course.courseDesc);
   (<HTMLElement>document.getElementById('email2')).setAttribute('value', (course.courseDepartmentId).toString());
  //  (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( course.courseMobile).toString());
}



openEdit(targetModal: any, course: Course) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = course;

  // this.editForm.patchValue( {
  //   courseId: course.courseId, 
  //   courseName: course.courseName,
  //   courseEmail: course.courseEmail,
  //   courseDesc: course.courseDesc,
  //   courseFacultyId: course.courseFacultyId,
  //  courseMobile: course.courseMobile
  // });



 
     (<HTMLElement>document.getElementById('courseId')).setAttribute('value', (course.courseId).toString());
 (<HTMLElement>document.getElementById('courseId')).setAttribute('data-target',(course.courseId).toString());
   (<HTMLElement>document.getElementById('courseName')).setAttribute('value', course.courseName);
  //  (<HTMLElement>document.getElementById('courseEmail')).setAttribute('value', course.courseEmail);
  //      (<HTMLElement>document.getElementById('courseEmail')).setAttribute('data-target',(course.courseEmail).toString());
  
   (<HTMLElement>document.getElementById('courseDesc')).setAttribute('value', course.courseDesc);
   (<HTMLElement>document.getElementById('courseFacultyId')).setAttribute('value', (course.courseDepartmentId).toString());
  //  (<HTMLElement>document.getElementById('courseMobile')).setAttribute('value',( course.courseMobile).toString());

}



 public onEdit(f: NgForm) {
  
 this.courseService.updateCourse(this.editForm).subscribe(
      (response: Course) => {
        console.log(response);
        this.getCourse();
        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, course: Course) {
  this.editForm = course;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.courseService.deleteCourse(this.editForm).subscribe(
      (response: Course) => {
        console.log(response);
        this.getCourse();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
      this.toastr.error('Unsuccessful', error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchCourses(key: string): void {
    console.log(key);
    const results: Course[] = [];
    for (const course of this.course) {
      if (course.courseName.toLowerCase().indexOf(key.toLowerCase()) !== -1
     
      || course.courseDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
       ) {
        results.push(course);
      }
    }
    this.course = results;
    if (results.length === 0 || !key) {
      this.getCourse();
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
  
  this. courseService.undoCourse(f.value).subscribe(
      (response:  Course) => {
        console.log(response);
        this.getCourse();
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

//  || course.courseMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1)
//  || course.courseEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
