import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Validate provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Validate {

  constructor(public http: Http) {
    console.log('Hello Validate Provider');
  }
  validateRegister(user){
  if(!user.f_name || !user.l_name || !user.email || !user.Password) { return false;}  else{ return true;}
   }
   
   PasswordMatching(user){ if(user.Password === user.Password2 ){ return true;} else{ return false;} }

   validateEmail(email)
   {const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email); }

}
