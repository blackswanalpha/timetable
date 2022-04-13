import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mode } from './mode';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { ModeService } from './mode.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class ModeComponent implements OnInit {
  mode: Mode[] =[];
  // mode:Mode[]= [];
  closeResult: string = '';
 
  fb: any;
    editMode: Mode | undefined;
   editForm = {
   modeId: 0,
    modeName: '',
    modeDesc: ''
  } ;

  





deleteId = 0;
  


// loadingHandler = new LoadingHandler();
  
toDisplayMode = false;
toDisplayFaculty = false;
toDisplayCourse = false;
toDisplayUnit = false;


event = window.event;
  


count: number = 0; 
count2: number = 0; 
count3: number = 0; 
count4: number = 0; 


  constructor(public  loaderService:LoaderService,private modeService: ModeService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}


  toggleData(name:string) {
    if (name =='dept' && this.count == 0){
//     (<HTMLElement>document.getElementById("idOfButton")).addEventListener('(click)', (event) => {  
//   event.removeEventListener();  
// });
  this.toDisplayCourse = false;
  this.toDisplayUnit = false;
  this.toDisplayFaculty = false;
this.toDisplayMode = !this.toDisplayMode;

this.count++;
this.count2 = 0;
this.count3 = 0;
 this.count4 = 0;

}
    else if (name =='crse' && this.count2 == 0  ){
      this.buttonDisabled = false;
       this.toDisplayMode = false;
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
       this.toDisplayMode = false;
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
       this.toDisplayMode = false;
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
  
    // this.getmode();
    this.getMode();
    this.toggleData('dept');
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getMode(): void {
    this.modeService.getmode().subscribe(
      (response: Mode[]) => {
      
this.mode = response;
// this.loadingHandler.finish();
        console.log(this.mode);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getmode(): void {
  //   this.modeService.getmode().subscribe(
  //     (response: Mode[]) => {
  //       this.mode = response;
  //       console.log(this.mode);
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


 this.modeService.addMode(f.value).subscribe(
      (response: Mode) => {
        console.log(response);
        this.getMode();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/modes/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, mode: Mode) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
     (<HTMLElement>document.getElementById('fname')).setAttribute('value', mode.modeName);
  //  (<HTMLElement>document.getElementById('dept')).setAttribute('value', mode.modeRequireLab);
   (<HTMLElement>document.getElementById('dept')).setAttribute('value', mode.modeDesc);
   //   (<HTMLElement>document.getElementById('dept')).setAttribute('value',( mode.modeSemesterId).toString());
  // (<HTMLElement>document.getElementById('email2')).setAttribute('value', (mode.modeUnitId).toString());
  //  (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( mode.modeMobile).toString());
}



openEdit(targetModal: any, mode: Mode) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = mode;

  // this.editForm.patchValue( {
  //   modeId: mode.modeId, 
  //   modeName: mode.modeName,
  //   modeEmail: mode.modeEmail,
  //   modeDesc: mode.modeDesc,
  //   modeFacultyId: mode.modeFacultyId,
  //  modeMobile: mode.modeMobile
  // });



 
     (<HTMLElement>document.getElementById('modeId')).setAttribute('value', (mode.modeId).toString());
 (<HTMLElement>document.getElementById('modeId')).setAttribute('data-target',(mode.modeId).toString());
  (<HTMLElement>document.getElementById('modeName')).setAttribute('value', mode.modeName);
  //  (<HTMLElement>document.getElementById('modeEmail')).setAttribute('value', mode.modeEmail);
  //      (<HTMLElement>document.getElementById('modeEmail')).setAttribute('data-target',(mode.modeEmail).toString());
  
   (<HTMLElement>document.getElementById('modeDesc')).setAttribute('value', mode.modeDesc);
  //  (<HTMLElement>document.getElementById('modeSemesterId')).setAttribute('value', (mode.modeSemesterId).toString());
  //  (<HTMLElement>document.getElementById('modeUnitId')).setAttribute('value',( mode.modeUnitId).toString());

}



 public onEdit(f: NgForm) {
  
 this.modeService.updateMode(this.editForm).subscribe(
      (response: Mode) => {
        console.log(response);
        this.getMode();
         this.toastr.success('mode', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.success('Hello world!', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, mode: Mode) {
  this.editForm = mode;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.modeService.deleteMode(this.editForm).subscribe(
      (response: Mode) => {
        console.log(response);
        this.getMode();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchModes(key: string): void {
    // console.log(key);
    // const results: Mode[] = [];
    // for (const mode of this.mode) {
    //   if (mode.modeName.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || mode.modeEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || mode.modeDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
    //   || mode.modeMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
    //     results.push(mode);
    //   }
    // }
    // this.mode = results;
    // if (results.length === 0 || !key) {
    //   this.getMode();
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
  
  this.modeService.undoMode(f.value).subscribe(
      (response:  Mode) => {
        console.log(response);
        this.getMode();
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
