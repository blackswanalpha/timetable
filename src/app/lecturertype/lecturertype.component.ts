import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lecturertype } from './lecturertype';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { LecturertypeService } from './lecturertype.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';

@Component({
  selector: 'app-lecturertype',
  templateUrl: './lecturertype.component.html',
  styleUrls: ['./lecturertype.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class LecturertypeComponent implements OnInit {
  lecturertype: Lecturertype[] =[];
  // lecturertype:Lecturertype[]= [];
  closeResult: string = '';
 
  fb: any;
    editLecturertype: Lecturertype | undefined;
   editForm = {
   lecturertypeId: 0,
    lecturertypeName: '',
    lecturertypeDesc: '',
    lecturertypeMax: 0
  } ;

  





deleteId = 0;
  constructor(public  loaderService:LoaderService,private lecturertypeService: LecturertypeService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  

    
  
  ngOnInit():void {
this.loadingHandler.finish();
  
    // this.getlecturertype();
    this.getLecturertype();
    
    
     
     
   
  }

   buttonDisabled: boolean | undefined;

  

  public getLecturertype(): void {
    this.lecturertypeService.getlecturertype().subscribe(
      (response: Lecturertype[]) => {
      
this.lecturertype = response;
this.loadingHandler.finish();
        console.log(this.lecturertype);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getlecturertype(): void {
  //   this.lecturertypeService.getlecturertype().subscribe(
  //     (response: Lecturertype[]) => {
  //       this.lecturertype = response;
  //       console.log(this.lecturertype);
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


 this.lecturertypeService.addLecturertype(f.value).subscribe(
      (response: Lecturertype) => {
        console.log(response);
        this.getLecturertype();
        this.toastr.success('Hello world!', 'Toastr fun!');

        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }

   
   

//   const url = 'http://localhost:8888/lecturertypes/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, lecturertype: Lecturertype) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', lecturertype.lecturertypeName);
  
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', lecturertype.lecturertypeDesc);
   (<HTMLElement>document.getElementById('email2')).setAttribute('value', (lecturertype.lecturertypeMax).toString());

}



openEdit(targetModal: any, lecturertype: Lecturertype) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = lecturertype;

  // this.editForm.patchValue( {
  //   lecturertypeId: lecturertype.lecturertypeId, 
  //   lecturertypeName: lecturertype.lecturertypeName,
  //   lecturertypeEmail: lecturertype.lecturertypeEmail,
  //   lecturertypeDesc: lecturertype.lecturertypeDesc,
  //   lecturertypeLecturertypeId: lecturertype.lecturertypeLecturertypeId,
  //  lecturertypeMobile: lecturertype.lecturertypeMobile
  // });



 
     (<HTMLElement>document.getElementById('lecturertypeId')).setAttribute('value', (lecturertype.lecturertypeId).toString());
 (<HTMLElement>document.getElementById('lecturertypeId')).setAttribute('data-target',(lecturertype.lecturertypeId).toString());
   (<HTMLElement>document.getElementById('lecturertypeName')).setAttribute('value', lecturertype.lecturertypeName);

  
   (<HTMLElement>document.getElementById('lecturertypeDesc')).setAttribute('value', lecturertype.lecturertypeDesc);
   (<HTMLElement>document.getElementById('lecturertypeMax')).setAttribute('value', (lecturertype.lecturertypeMax).toString());


}



 public onEdit(f: NgForm) {
  
 this.lecturertypeService.updateLecturertype(this.editForm).subscribe(
      (response: Lecturertype) => {
        console.log(response);
        this.getLecturertype();
         this.toastr.success('lecturertype', 'succcessfully updated');
        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
         this.toastr.success('Hello world!', error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, lecturertype: Lecturertype) {
  this.editForm = lecturertype;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.lecturertypeService.deleteLecturertype(this.editForm).subscribe(
      (response: Lecturertype) => {
        console.log(response);
        this.getLecturertype();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchLecturertypes(key: string): void {
    console.log(key);
    const results: Lecturertype[] = [];
    for (const lecturertype of this.lecturertype) {
      if (lecturertype.lecturertypeName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || lecturertype.lecturertypeDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || lecturertype.lecturertypeMax.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(lecturertype);
      }
    }
    this.lecturertype = results;
    if (results.length === 0 || !key) {
      this.getLecturertype();
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
  
  this.lecturertypeService.undoLecturertype(f.value).subscribe(
      (response:  Lecturertype) => {
        console.log(response);
        this.getLecturertype();
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

