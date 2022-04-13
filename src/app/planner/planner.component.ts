import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Planner } from './planner';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { PlannerService } from './planner.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';
import { SemesterService } from '../semester/semester.service';
import { Semester } from '../semester/semester';
import { Unit } from '../units/units';
import { UnitService } from '../units/units.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class PlannerComponent implements OnInit {
  planner: Planner[] =[];
  semester: Semester[] =[];
  unit: Unit[] =[];
  // planner:Planner[]= [];
  closeResult: string = '';
 
  fb: any;
    editPlanner: Planner | undefined;
   editForm = {
   plannerId: 0,
    plannerSemesterId: 0,
    plannerUnitId: 0,
    unitName:'',
    semesterName:''
  } ;

  





deleteId = 0;
  


// loadingHandler = new LoadingHandler();
  
toDisplayPlanner = false;
toDisplayFaculty = false;
toDisplayCourse = false;
toDisplayUnit = false;


event = window.event;
  


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


  constructor(public  loaderService:LoaderService,private unitService: UnitService,private semesterService: SemesterService,private plannerService: PlannerService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}


  toggleData(name:string) {
    if (name =='dept' && this.count == 0){
//     (<HTMLElement>document.getElementById("idOfButton")).addEventListener('(click)', (event) => {  
//   event.removeEventListener();  
// });
  this.toDisplayCourse = false;
  this.toDisplayUnit = false;
  this.toDisplayFaculty = false;
this.toDisplayPlanner = !this.toDisplayPlanner;

this.count++;
this.count2 = 0;
this.count3 = 0;
 this.count4 = 0;

}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayPlanner = false;
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
       this.toDisplayPlanner = false;
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
       this.toDisplayPlanner = false;
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
  
    // this.getplanner();
    this.getPlanner();
    this.toggleData('dept');
    this.getSemester();
    this.getUnit();
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getPlanner(): void {
    this.plannerService.getplanner().subscribe(
      (response: Planner[]) => {
      
this.planner = response;
// this.loadingHandler.finish();
        console.log(this.planner);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public getSemester(): void {
    this.semesterService.getsemester().subscribe(
      (response: Semester[]) => {
      
this.semester = response;

        console.log(this.semester);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
   public getUnit(): void {
    this.unitService.getunit().subscribe(
      (response: Unit[]) => {
      
this.unit = response;

        console.log(this.unit);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  // public getplanner(): void {
  //   this.plannerService.getplanner().subscribe(
  //     (response: Planner[]) => {
  //       this.planner = response;
  //       console.log(this.planner);
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


 this.plannerService.addPlanner(f.value).subscribe(
      (response: Planner) => {
        console.log(response);
        this.getPlanner();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/planners/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, planner: Planner) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
  
      (<HTMLElement>document.getElementById('dept')).setAttribute('value',( planner.semesterName).toString());
   (<HTMLElement>document.getElementById('email2')).setAttribute('value', (planner.unitName).toString());
  //  (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( planner.plannerMobile).toString());
}



openEdit(targetModal: any, planner: Planner) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = planner;

  // this.editForm.patchValue( {
  //   plannerId: planner.plannerId, 
  //   plannerName: planner.plannerName,
  //   plannerEmail: planner.plannerEmail,
  //   plannerDesc: planner.plannerDesc,
  //   plannerFacultyId: planner.plannerFacultyId,
  //  plannerMobile: planner.plannerMobile
  // });



 
     (<HTMLElement>document.getElementById('plannerId')).setAttribute('value', (planner.plannerId).toString());
 (<HTMLElement>document.getElementById('plannerId')).setAttribute('data-target',(planner.plannerId).toString());
  //  (<HTMLElement>document.getElementById('plannerName')).setAttribute('value', planner.plannerName);
  //  (<HTMLElement>document.getElementById('plannerEmail')).setAttribute('value', planner.plannerEmail);
  //      (<HTMLElement>document.getElementById('plannerEmail')).setAttribute('data-target',(planner.plannerEmail).toString());
  
  //  (<HTMLElement>document.getElementById('plannerDesc')).setAttribute('value', planner.plannerDesc);
   (<HTMLElement>document.getElementById('plannerSemesterId')).setAttribute('value', (planner.plannerSemesterId).toString());
   (<HTMLElement>document.getElementById('plannerUnitId')).setAttribute('value',( planner.plannerUnitId).toString());

}



 public onEdit(f: NgForm) {
  
 this.plannerService.updatePlanner(this.editForm).subscribe(
      (response: Planner) => {
        console.log(response);
        this.getPlanner();
         this.toastr.success('planner', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.success('Hello world!', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, planner: Planner) {
  this.editForm = planner;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.plannerService.deletePlanner(this.editForm).subscribe(
      (response: Planner) => {
        console.log(response);
        this.getPlanner();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchPlanners(key: string): void {
    // console.log(key);
    // const results: Planner[] = [];
    // for (const planner of this.planner) {
    //   if (planner.plannerName.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || planner.plannerEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || planner.plannerDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || planner.plannerMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
    //     results.push(planner);
    //   }
    // }
    // this.planner = results;
    // if (results.length === 0 || !key) {
    //   this.getPlanner();
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
  
  this.plannerService.undoPlanner(f.value).subscribe(
      (response:  Planner) => {
        console.log(response);
        this.getPlanner();
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
