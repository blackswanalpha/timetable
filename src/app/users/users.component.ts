import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Users } from './users';
import { UsersService } from './users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    public users: Users[] =[];
      closeResult = '';
  editUsers: Users | undefined;

    
 

  constructor(private usersService: UsersService,private modalService: NgbModal){}

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.usersService.getUsers().subscribe(
      (response: Users[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUsers(addForm: NgForm): void {
    var val = (<HTMLElement>document.getElementById('add-user-form')).click();
    val;
    this.usersService.addUsers(addForm.value).subscribe(
      (response: Users) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

 public onUpdateUsers(addForm: NgForm): void {
    var val = (<HTMLElement>document.getElementById('add-user-form')).click();
    val;
    this.usersService.addUsers(addForm.value).subscribe(
      (response: Users) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }



   public open(content: any) {
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
openDetails(targetModal: any, users: Users) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
   (<HTMLElement>document.getElementById('name')).setAttribute('value', users.userFullName);
   (<HTMLElement>document.getElementById('email')).setAttribute('value', users.userEmail);
//  (<HTMLElement>document.getElementById('dept')).setAttribute('value', users.userDepartmentId);
  //  (<HTMLElement>document.getElementById('email2')).setAttribute('value', users.email);
  //  (<HTMLElement>document.getElementById('cntry')).setAttribute('value', users.country);
}
}


  


// }