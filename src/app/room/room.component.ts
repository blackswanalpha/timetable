import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from './room';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';



declare var jQuery:any;
declare var $:any;
import { RoomService } from './room.service';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { LoadingHandler } from '../loading';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
    animations: [trigger('deleteItem', [
      state('expanded', style({ height: '*', /*display: 'block',*/ color:'black' })),
      state('collapsed', style({ height: '0px', maxHeight: '0', display: 'none', color: 'white' })),
      transition('expanded <=> collapsed', [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
    ]),
  
 fadeInUpOnEnterAnimation({ anchor: 'enter'}),
  ]
})
export class RoomComponent implements OnInit {
  room: Room[] =[];
  // room:Room[]= [];
  closeResult: string = '';
 
  fb: any;
    editRoom: Room | undefined;
   editForm = {
   roomId: 0,
    roomName: '',
     roomCapacity: '',
      roomLab: '',
    roomDesc: '',
    roomDepartmentId: 0,
    roomBuildingId: 0
   
  } ;

  





deleteId = 0;
  constructor(public  loaderService:LoaderService,private roomService: RoomService,private modalService: NgbModal,private toastr: ToastrService,private _snackBar: MatSnackBar){}



loadingHandler = new LoadingHandler();
  
toDisplayRoom = false;
toDisplayDepartment = false;
  
  toggleData(name:string) {
    if (name =='dept'){
    
  this.toDisplayDepartment = false;
this.toDisplayRoom = !this.toDisplayRoom;}
    else if (name =='crse'  ){
      
       this.toDisplayRoom = false;
       this.toDisplayDepartment = !this.toDisplayDepartment;
    }
  }
  ngOnInit() {
// this.loadingHandler.start();

  
    // this.getroom();
    this.getRoom();
    this.toggleData('dept');
    
     
     
   
  }

  public getRoom(): void {
    this.roomService.getroom().subscribe(
      (response: Room[]) => {
      
this.room = response;

        console.log(this.room);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public getroom(): void {
  //   this.roomService.getroom().subscribe(
  //     (response: Room[]) => {
  //       this.room = response;
  //       console.log(this.room);
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


 this.roomService.addRoom(f.value).subscribe(
      (response: Room) => {
        console.log(response);
        this.getRoom();
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

   
   

//   const url = 'http://localhost:8888/rooms/addnew';
//   this.httpClient.post(url, f.value)
//     .subscribe((result) => {
//       this.ngOnInit(); //reload the table
//     });
//   this.modalService.dismissAll(); //dismiss the modal
// }



openDetails(targetModal: any, room: Room) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'md'
  });
   (<HTMLElement>document.getElementById('fname')).setAttribute('value', room.roomName);
   (<HTMLElement>document.getElementById('dept')).setAttribute('value', room.roomCapacity);
    (<HTMLElement>document.getElementById('lab')).setAttribute('value', room.roomLab);
   (<HTMLElement>document.getElementById('lname')).setAttribute('value', room.roomDesc);
   (<HTMLElement>document.getElementById('email2')).setAttribute('value', (room.roomDepartmentId).toString());
   (<HTMLElement>document.getElementById('cntry')).setAttribute('value',( room.roomBuildingId).toString());
}



openEdit(targetModal: any, room: Room) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'md'
  });
this.editForm = room;

  // this.editForm.patchValue( {
  //   roomId: room.roomId, 
  //   roomName: room.roomName,
  //   roomEmail: room.roomEmail,
  //   roomDesc: room.roomDesc,
  //   roomFacultyId: room.roomFacultyId,
  //  roomMobile: room.roomMobile
  // });



 
     (<HTMLElement>document.getElementById('roomId')).setAttribute('value', (room.roomId).toString());
 (<HTMLElement>document.getElementById('roomId')).setAttribute('data-target',(room.roomId).toString());
   (<HTMLElement>document.getElementById('roomName')).setAttribute('value', room.roomName);
  //  (<HTMLElement>document.getElementById('roomEmail')).setAttribute('value', room.roomEmail);
  //      (<HTMLElement>document.getElementById('roomEmail')).setAttribute('data-target',(room.roomEmail).toString());
  
   (<HTMLElement>document.getElementById('roomDesc')).setAttribute('value', room.roomDesc);
   (<HTMLElement>document.getElementById('roomFacultyId')).setAttribute('value', (room.roomDepartmentId).toString());
  //  (<HTMLElement>document.getElementById('roomMobile')).setAttribute('value',( room.roomMobile).toString());

}



 public onEdit(f: NgForm) {
  
 this.roomService.updateRoom(this.editForm).subscribe(
      (response: Room) => {
        console.log(response);
        this.getRoom();
        f.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        f.reset();
      }
    );
  }


openDelete(targetModal: any, room: Room) {
  this.editForm = room;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  
  this.roomService.deleteRoom(this.editForm).subscribe(
      (response: Room) => {
        console.log(response);
        this.getRoom();
       this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
      this.toastr.error('Unsuccessful', error.message);
        this.modalService.dismissAll();
      }
    );
}


  public searchRooms(key: string): void {
    console.log(key);
    const results: Room[] = [];
    for (const room of this.room) {
      if (room.roomName.toLowerCase().indexOf(key.toLowerCase()) !== -1
     
      || room.roomDesc.toLowerCase().indexOf(key.toLowerCase()) !== -1
       ) {
        results.push(room);
      }
    }
    this.room = results;
    if (results.length === 0 || !key) {
      this.getRoom();
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
  
  this. roomService.undoRoom(f.value).subscribe(
      (response:  Room) => {
        console.log(response);
        this.getRoom();
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

//  || room.roomMobile.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1)
//  || room.roomEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
