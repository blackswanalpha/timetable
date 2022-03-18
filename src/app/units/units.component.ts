import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Unit } from './units';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { UnitService } from './units.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';

@Component({
  selector: 'app-unit',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class UnitsComponent implements OnInit {
  unit: Unit[] =[];
  // course:Course[]= [];
  closeResult: string = '';
 
  fb: any;
    editUnit: Unit | undefined;
   editForm = {
   unitId: 0,
    unitName: '',
    unitRequireLab: '',
    unitDesc: '',
    unitCode: '',
    unitCourseId: 0,
    unitSpecializationId: 0
  } ;

  





deleteId = 0;
  constructor(public  loaderService:LoaderService,private unitService: UnitService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  
toDisplayUnit = false;
toDisplayCourse = false;
 event = window.event;
  undo = {
    unitId:0
  };


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


   clickCount(): void{

    if (this.count == 0){
        this.toDisplayCourse = false;
this.toDisplayUnit = !this.toDisplayUnit;
this.count = 1;
    }
     if (this.count == 2){
        this.toDisplayCourse = false;
this.toDisplayUnit = !this.toDisplayUnit;
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
this.toDisplayUnit = !this.toDisplayUnit;
this.count++;
this.count2 = 0;




}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayUnit = false;
       this.toDisplayCourse = !this.toDisplayCourse;
       this.count = 0;
       this.count2++
    }
    
  }
  ngOnInit():void {
this.loadingHandler.finish();
  
    // this.getcourse();
    this.getUnit();
    this.toggleData('dept');
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getUnit(): void {
    this.unitService.getunit().subscribe(
      (response: Unit[]) => {
      
this.unit = response;
this.loadingHandler.finish();
        console.log(this.unit);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getcourse(): void {
  //   this.unitService.getcourse().subscribe(
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


 this.unitService.addUnit(f.value).subscribe(
      (response: Unit) => {
        console.log(response);
        this.getUnit();
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

   
   

//   const url = 'http://localhost:8888/units/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, unit: Unit) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
  (<HTMLElement>document.getElementById('code')).setAttribute('value', unit.unitCode);
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', unit.unitName);
   (<HTMLElement>document.getElementById('dept')).setAttribute('value', unit.unitRequireLab);
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', unit.unitDesc);
   (<HTMLElement>document.getElementById('email2')).setAttribute('value', (unit.unitCourseId).toString());
   (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( unit.unitSpecializationId).toString());
}



openEdit(targetModal: any, unit: Unit) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = unit;

  // this.editForm.patchValue( {
  //   unitId: unit.unitId, 
  //   unitName: unit.unitName,
  //   unitEmail: unit.unitEmail,
  //   unitDesc: unit.unitDesc,
  //   unitFacultyId: unit.unitFacultyId,
  //  unitMobile: unit.unitMobile
  // });



 
     (<HTMLElement>document.getElementById('unitId')).setAttribute('value', (unit.unitId).toString());
 (<HTMLElement>document.getElementById('unitId')).setAttribute('data-target',(unit.unitId).toString());
 (<HTMLElement>document.getElementById('unitCode')).setAttribute('value', unit.unitCode);
   (<HTMLElement>document.getElementById('unitName')).setAttribute('value', unit.unitName);
   (<HTMLElement>document.getElementById('unitRequireLab')).setAttribute('value', unit.unitRequireLab);
       (<HTMLElement>document.getElementById('unitEmail')).setAttribute('data-target',(unit.unitRequireLab).toString());
  
   (<HTMLElement>document.getElementById('unitDesc')).setAttribute('value', unit.unitDesc);
   (<HTMLElement>document.getElementById('unitCourseId')).setAttribute('value', (unit.unitCourseId).toString());
   (<HTMLElement>document.getElementById('unitSpecializationId')).setAttribute('value',( unit.unitSpecializationId).toString());

}



 public onEdit(f: NgForm) {
  
 this.unitService.updateUnit(this.editForm).subscribe(
      (response: Unit) => {
        console.log(response);
        this.getUnit();
         this.toastr.success('unit', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.error('unSuccessful', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, unit: Unit) {
  this.editForm = unit;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.unitService.deleteUnit(this.editForm).subscribe(
      (response: Unit) => {
        console.log(response);
        this.getUnit();
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
  
  this.unitService.undoUnit(f.value).subscribe(
      (response: Unit) => {
        console.log(response);
        this.getUnit();
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


  public searchUnits(key: string): void {
    console.log(key);
    const results: Unit[] = [];
    for (const unit of this.unit) {
      if (unit.unitName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || unit.unitRequireLab.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || unit.unitDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || unit.unitSpecializationId.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(unit);
      }
    }
    this.unit = results;
    if (results.length === 0 || !key) {
      this.getUnit();
    }
  }

}
