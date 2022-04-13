import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../confirmed.validator';
import { Rank } from '../rank/rank';
import { RankService } from '../rank/rank.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { LoginService } from '../login/login.service';
import { SignupService } from './signup.service';
import { Login } from './login';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';
import { DepartmentService } from '../department/department.service';
import { Department } from '../department/department';
import { MatStepper } from '@angular/material/stepper';

// import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
   providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class SignupComponent implements OnInit {
 department: Department[] =[];
   isLinear = true;

   @Input()
completed: boolean=true

@Input()
editable: boolean=false

errr:boolean=false;

public users: Users[] =[];
    rank: Rank[] =[];
     
    login:Login[] =[] ;
     

     @Input()
  error!: string | null;
  firstFormGroup!:FormGroup;
                    
  secondFormGroup!: FormGroup;
  num: number | undefined;

  constructor(private usersService: UsersService,private departmentService: DepartmentService,private toastr: ToastrService,private signService: SignupService,private rankService: RankService,private _formBuilder: FormBuilder,private authentocationService: LoginService) {
  this.firstFormGroup = this._formBuilder.group({
    userLoginId: [{value:'',disabled: true}],
      userEmail: ['', Validators.email],
      userDepartmentId: ['', Validators.required],
      userMobile: ['', Validators.pattern("^((\\+254?)|0)?[0-9]{10}$")],
      userFullName: ['', Validators.required]

    });
    this.secondFormGroup = this._formBuilder.group({
     loginName: ['', [Validators.required, Validators.minLength(3)]],
      loginRankId: ['', Validators.required],
      loginPassword: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirm: ['', Validators.required],
      
    }, { 
      validator: ConfirmedValidator('loginPassword', 'confirm')
    });
  }

  ngOnInit() {
   this.getRank()
   this.getDepartment()
   this.authentocationService.logOut();
  }

    public getRank(): void {
    this.rankService.getrank().subscribe(
      data => {
      
this.rank =data;

        console.log(this.rank);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
     get f(){
    return this.secondFormGroup.controls;
  }
    submit(f: FormGroup) {
   this.signService.addLogin(f.value).subscribe(
      (response: Login) => {
        console.log(response);
        this.getRank();
        this.findByName(f.value);
        
      //this.login=response;

        f.reset();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.error= error.message;
         this.complete();
         //this.stepChanged();
        f.reset();
        console.log(error.message);
      }
    );
  }

  
  public onAddUsers(f:FormGroup): void {
  f.value.userLoginId=this.num;
    this.usersService.addUsers(f.value).subscribe(
      (response: Users) => {
        console.log(response);
      //  this.getUsers();
        //f.reset();
      },
      (error: HttpErrorResponse) => {
        // alert(error.message);
         this.complete();
        this.toastr.error('unSuccessful!', error.message);
        f.reset();
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
        this.toastr.error('unSuccessful!', error.message);
      }
    );
  }


  public findByName(result:Login): void {
    this.signService.findByName(result).subscribe(
      (response: Login) => {

        console.log('response');
        console.log(response);
        this.num = response.loginId;
        //(<HTMLElement>document.getElementById('fname')).setAttribute('placeholder', response.loginName);
        this.firstFormGroup.controls['userLoginId'].setValue(response.loginName);
        //  
      },
        (error: HttpErrorResponse) => {

          console.log(error.message);
          this.toastr.error('unSuccessful!', error.message);
        }
      
    );
 

}


// private validateUsername(): ValidatorFn {
//     return (control: AbstractControl): {[key: string]: any} => {
//       this.signService.findByName(control:Login)
//         .subscribe(
//           ({data}) => {
//             let res: string = data;
//             if (res === control.value) {
//               return {'alreadyExist': true};
//             } else {
//               return null
//             }
//           },
//           (error) => {
//             console.log(error);
//           }
//         )
//     }
// }

 



  @ViewChild(MatStepper)
  stepper!: {next: () => void; selected: { completed: boolean;editable:boolean }; };

  complete() {
     this.stepper.selected.completed = true;
      // this.stepper.selected.editable = false;
      //this.firstFormGroup.disable();
      this.stepper.next();
      this.errr=true;
  }
  stepChanged(){
   this.stepper.selected.completed = true;
      this.stepper.selected.editable = false;
      //this.firstFormGroup.enable();
        //this.stepper.next();
       
      
  }
}





