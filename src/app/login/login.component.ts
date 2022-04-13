import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


   myScriptElement!: HTMLScriptElement;
username = ''
  password = ''
  invalidLogin = false
  
  @Input()
  error!: string | null;
  showSpinner = false;




    titles = ['title1', 'title2', 'title3'];
  titleSelected: string = '';







constructor(private router: Router,private authentocationService: LoginService,
    private loginservice: LoginService,private _service: NotificationsService) { 
          this.myScriptElement = document.createElement("script");
this.myScriptElement.src = "assets/js/main.js";
document.body.appendChild(this.myScriptElement);
    }

  ngOnInit() {
this.authentocationService.logOut();

  }


  

  

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['/department'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        this.error = error.message;
        
          this.titleSelected = this.titles[1];
        console.log('this is client side error');
        console.log('this is client side error');
        console.log(this.error);
       

      }
    )
    
    );

     this.titleSelected =''

  }


  

}
