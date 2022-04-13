import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails !: FormGroup;
  userList={
    userId:0,
    userEmail:'',
    userMobile:0,
    userFullName:'',
    userDepartmentId:0,
    userLoginId:0,
    userimageUrl:''
  }
user:string | undefined
  users : Users[] =[]

  constructor(private usersService: UsersService,private _formBuilder: FormBuilder, private loginservice: LoginService,profile:ProfileService) { }

  ngOnInit(): void {

    this.userDetails = this._formBuilder.group({
  //  userLoginId: [{value:'',disabled: true}],
      userEmail: ['', Validators.email],
      userimageUrl: ['', Validators.required],
     // userDepartmentId: ['', Validators.required],
      userMobile: ['', Validators.pattern("^((\\+254?)|0)?[0-9]{10}$")],
      userFullName: ['', Validators.required]

    });


    this.getUsers();



  }
public getUsers(){
this.user = sessionStorage.getItem('userName')?.valueOf();
    console.log(this.user);
    this.userList.userFullName=String(this.user);
        console.log(this.userList);

  this.findUserName(this.userList);
}



    public findUserName(result:Users): void {
      
     
    this.usersService.findByUserName(result).subscribe(
      (response: Users) => {

        console.log('response');
        console.log(response);
        //this.num = response.userId;
        //(<HTMLElement>document.getElementById('fname')).setAttribute('placeholder', response.loginName);
        this.userDetails.controls['userFullName'].setValue(response.userFullName);
        //  

        this.userDetails.controls['userEmail'].setValue(response.userEmail);
        this.userDetails.controls['userMobile'].setValue(response.userMobile);
        // this.userDetails.controls['userDepartmentId'].setValue(response.userDepartmentId);
        // this.userDetails.controls['userLoginId'].setValue(response.userLoginId);
        //this.userDetails.controls['userimageUrl'].setValue(response.userimageUrl);
        //this.userDetails.controls['userFullName'].setValue(response.userFullName);
this.user = response.userimageUrl

      },
        (error: HttpErrorResponse) => {

          console.log(error.message);
          //this.toastr.error('unSuccessful!', error.message);
        }
      
    );
 

}

}


