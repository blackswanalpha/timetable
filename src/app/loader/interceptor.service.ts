
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize, map, retry } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from 'angular2-notifications';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

   

  constructor(public loaderService: LoaderService,private _snackBar: MatSnackBar,private _service: NotificationsService ) { }

 openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);

    let token = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('userName');

    console.log(`Token is`)
    console.log(token)

     if (username && token) {
       
      req = req.clone({
        setHeaders: {
         Authorization: token
        }
      })
    }


    return next.handle(req).pipe(
    //  delay(1500),ca
    retry(1),
    
    catchError((error: HttpErrorResponse) => {
      console.log(error);
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            this._service.error( "error",error.error.message, {
              position: ['bottom', 'right'],
              timeOut: 5000,
              animate: 'fade',
              pauseOnHover: true,
              clickToClose: false,
              clickIconToClose: true,
                showProgressBar: true});
            errorMsg = `Error: ${error.error.message}`;
          }else if(error.status == 400){
if (error.error.userName && error.error.userPassword){
             this._service.error( "error",error.error.userName, {
              position: ['bottom', 'right'],
              timeOut: 5000,
              animate: 'fade',
              pauseOnHover: true,
              clickToClose: false,
              clickIconToClose: true,
                showProgressBar: true});

                    this._service.error( "error",error.error.userPassword, {
              position: ['bottom', 'right'],
              timeOut: 5000,
              animate: 'fade',
              pauseOnHover: true,
              clickToClose: false,
              clickIconToClose: true,
                showProgressBar: true});
             }
             else if (error.error.userName){
              this._service.error( "error",error.error.userName, {
              position: ['bottom', 'right'],
              timeOut: 5000,
              animate: 'fade',
              pauseOnHover: true,
              clickToClose: false,
              clickIconToClose: true,
                showProgressBar: true});
             }
              else if (error.error.userPassword){
              this._service.error( "error",error.error.userPassword, {
              position: ['bottom', 'right'],
              timeOut: 5000,
              animate: 'fade',
              pauseOnHover: true,
              clickToClose: false,
              clickIconToClose: true,
                showProgressBar: true});
             }
             else if (error.error.loginName){
              this._service.error( "error",error.error.loginName, {
              position: ['bottom', 'right'],
              timeOut: 5000,
              animate: 'fade',
              pauseOnHover: true,
              clickToClose: false,
              clickIconToClose: true,
                showProgressBar: true});
             }
              


          }
          else {
            console.log('this is server side error');
              this._service.error( "error",error.error.message, {
                position: ['bottom', 'right'],
                timeOut: 5000,
                animate: 'fade',
                pauseOnHover: true,
                 maxLength: 10,
                 showProgressBar: true});
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        }),
      finalize(
        () => {
          
          this.loaderService.isLoading.next(false);
         
        }
      ),
       
    );
  }
}
