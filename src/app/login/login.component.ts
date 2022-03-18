import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


   myScriptElement!: HTMLScriptElement;

  constructor() {

    this.myScriptElement = document.createElement("script");
this.myScriptElement.src = "assets/js/main.js";
document.body.appendChild(this.myScriptElement);
                                 
   }

  ngOnInit(): void {
  }


  

}
