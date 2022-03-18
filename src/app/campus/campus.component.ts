import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Campus } from './campus';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { CampusService } from './campus.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class CampusComponent implements OnInit {
  campus: Campus[] =[];
  // campus:Campus[]= [];
  closeResult: string = '';
 
  fb: any;
    editCampus: Campus | undefined;
   editForm = {
   campusId: 0,
    campusName: '',
    
    campusDesc: '',
    campusLocation: '',
   
  } ;

  





deleteId = 0;
  constructor(public  loaderService:LoaderService,private campusService: CampusService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  

  ngOnInit() {
// this.loadingHandler.start();

  
    // this.getcampus();
    this.getCampus();
    
    
     
     
   
  }

  public getCampus(): void {
    this.campusService.getcampus().subscribe(
      (response: Campus[]) => {
      
this.campus = response;

        console.log(this.campus);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getcampus(): void {
  //   this.campusService.getcampus().subscribe(
  //     (response: Campus[]) => {
  //       this.campus = response;
  //       console.log(this.campus);
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


 this.campusService.addCampus(f.value).subscribe(
      (response: Campus) => {
        console.log(response);
        this.getCampus();
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

   
   

//   const url = 'http://localhost:8888/campuss/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, campus: Campus) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', campus.campusName);
   (<HTMLElement>document.getElementById('dept')).setAttribute('value', campus.campusLocation);
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', campus.campusDesc);
  //  (<HTMLElement>document.getElementById('email2')).setAttribute('value', (campus.campusDepartmentId).toString());
  //  (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( campus.campusMobile).toString());
}



openEdit(targetModal: any, campus: Campus) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = campus;

  // this.editForm.patchValue( {
  //   campusId: campus.campusId, 
  //   campusName: campus.campusName,
  //   campusEmail: campus.campusEmail,
  //   campusDesc: campus.campusDesc,
  //   campusFacultyId: campus.campusFacultyId,
  //  campusMobile: campus.campusMobile
  // });



 
     (<HTMLElement>document.getElementById('campusId')).setAttribute('value', (campus.campusId).toString());
 (<HTMLElement>document.getElementById('campusId')).setAttribute('data-target',(campus.campusId).toString());
   (<HTMLElement>document.getElementById('campusName')).setAttribute('value', campus.campusName);
   (<HTMLElement>document.getElementById('campusLocation')).setAttribute('value', campus.campusLocation);
  //      (<HTMLElement>document.getElementById('campusEmail')).setAttribute('data-target',(campus.campusEmail).toString());
  
   (<HTMLElement>document.getElementById('campusDesc')).setAttribute('value', campus.campusDesc);
  //  (<HTMLElement>document.getElementById('campusFacultyId')).setAttribute('value', (campus.campusDepartmentId).toString());
  //  (<HTMLElement>document.getElementById('campusMobile')).setAttribute('value',( campus.campusMobile).toString());

}



 public onEdit(f: NgForm) {
  
 this.campusService.updateCampus(this.editForm).subscribe(
      (response: Campus) => {
        console.log(response);
        this.getCampus();
        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, campus: Campus) {
  this.editForm = campus;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.campusService.deleteCampus(this.editForm).subscribe(
      (response: Campus) => {
        console.log(response);
        this.getCampus();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
      this.toastr.error('Unsuccessful', error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchCampuss(key: string): void {
    console.log(key);
    const results: Campus[] = [];
    for (const campus of this.campus) {
      if (campus.campusName.toLowerCase().indexOf(key.toLowerCase()) !== -1
     
      || campus.campusDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
       ) {
        results.push(campus);
      }
    }
    this.campus = results;
    if (results.length === 0 || !key) {
      this.getCampus();
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
  
  this. campusService.undoCampus(f.value).subscribe(
      (response:  Campus) => {
        console.log(response);
        this.getCampus();
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

//  || campus.campusMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1)
//  || campus.campusEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
