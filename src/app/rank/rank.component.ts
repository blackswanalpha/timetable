import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rank } from './rank';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { RankService } from './rank.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';
import { CourseComponent } from '../course/course.component';
import { Course } from '../course/course';
import { CourseService } from '../course/course.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class RankComponent implements OnInit {
  rank: Rank[] =[];
  // course:Course[]= [];
  closeResult: string = '';
 
  fb: any;
    editRank: Rank | undefined;
   editForm = {
   rankId: 0,
    rankStatus: '',  
  } ;

    course: Course[] =[];





deleteId = 0;
  constructor(private courseService: CourseService ,public  loaderService:LoaderService,private rankService: RankService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  
toDisplayRank = false;
toDisplayCourse = false;
 event = window.event;
  undo = {
    rankId:0
  };


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


   clickCount(): void{

    if (this.count == 0){
        this.toDisplayCourse = false;
this.toDisplayRank = !this.toDisplayRank;
this.count = 1;
    }
     if (this.count == 2){
        this.toDisplayCourse = false;
this.toDisplayRank = !this.toDisplayRank;
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
this.toDisplayRank = !this.toDisplayRank;
this.count++;
this.count2 = 0;




}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayRank = false;
       this.toDisplayCourse = !this.toDisplayCourse;
       this.count = 0;
       this.count2++
    }
    
  }
  ngOnInit():void {
this.loadingHandler.finish();
  
    // this.getcourse();
    this.getRank();
    this.toggleData('dept');
    this.getCourse();
    
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getRank(): void {
    this.rankService.getrank().subscribe(
      data => {
      
this.rank =data;
this.loadingHandler.finish();
        console.log(this.rank);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getcourse(): void {
  //   this.rankService.getcourse().subscribe(
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


 this.rankService.addRank(f.value).subscribe(
      (response: Rank) => {
        console.log(response);
        this.getRank();
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

//   const url = 'http://localhost:8888/ranks/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, rank: Rank) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
  // (<HTMLElement>document.getElementById('code')).setAttribute('value', rank.rankCode);
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', (rank.rankId).toString());
  //  (<HTMLElement>document.getElementById('dept')).setAttribute('value', rank.rankRequireLab);
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', rank.rankStatus);
  //  (<HTMLElement>document.getElementById('email2')).setAttribute('value', (rank.courseName).toString());
  //  (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( rank.rankName).toString());
}



openEdit(targetModal: any, rank: Rank) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = rank;

  // this.editForm.patchValue( {
  //   rankId: rank.rankId, 
  //   rankName: rank.rankName,
  //   rankEmail: rank.rankEmail,
  //   rankDesc: rank.rankDesc,
  //   rankFacultyId: rank.rankFacultyId,
  //  rankMobile: rank.rankMobile
  // });



 
     (<HTMLElement>document.getElementById('rankId')).setAttribute('value', (rank.rankId).toString());
 (<HTMLElement>document.getElementById('rankId')).setAttribute('data-target',(rank.rankId).toString());

   (<HTMLElement>document.getElementById('rankStatus')).setAttribute('value', rank.rankStatus);
  //  (<HTMLElement>document.getElementById('rankRequireLab')).setAttribute('value', rank.rankRequireLab);
  //      (<HTMLElement>document.getElementById('rankEmail')).setAttribute('data-target',(rank.rankRequireLab).toString());
  
   //(<HTMLElement>document.getElementById('rankDesc')).setAttribute('value', rank.rankDesc);
  //  (<HTMLElement>document.getElementById('rankCourseId')).setAttribute('value', (rank.rankCourseId).toString());
  //  (<HTMLElement>document.getElementById('rankRankId')).setAttribute('value',( rank.rankRankId).toString());

}



 public onEdit(f: NgForm) {
  
 this.rankService.updateRank(this.editForm).subscribe(
      (response: Rank) => {
        console.log(response);
        this.getRank();
         this.toastr.success('rank', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.error('unSuccessful', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, rank: Rank) {
  this.editForm = rank;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.rankService.deleteRank(this.editForm).subscribe(
      (response: Rank) => {
        console.log(response);
        this.getRank();
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
  
  this.rankService.undoRank(f.value).subscribe(
      (response: Rank) => {
        console.log(response);
        this.getRank();
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


  public searchRanks(key: string): void {
    console.log(key);
    const results: Rank[] = [];
    for (const rank of this.rank) {
      if (rank.rankStatus.toLowerCase().indexOf(key.toLowerCase()) !== -1
     
     ) {
        results.push(rank);
      }
    }
    this.rank = results;
    if (results.length === 0 || !key) {
      this.getRank();
    }
  }

}
