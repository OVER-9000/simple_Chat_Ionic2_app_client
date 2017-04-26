import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
@Injectable()
export class Auth {
  authToken:any;
  user :any;
  constructor(public http: Http) {  }
    registerUser(user) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      let PostUrl = 'http://localhost:3000/users/register';
      return this.http.post(PostUrl,user,{headers:headers})
      .map(res => res.json());
    }
    authenticateUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      let PostUrl = 'http://localhost:3000/users/authenticate';
      return this.http.post(PostUrl,user,{headers:headers})
      .map(res => res.json());
    }
    getProfile(){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-Type','application/json');
      let PostUrl = 'http://localhost:3000/users/profile';
        return new Promise(resolve => { this.http.get(PostUrl,{headers:headers}).map(res => res.json())
          .subscribe(data => { this.user = data; console.log("this.user = "+this.user); resolve(data); }); });


    }
    storeUserDate(token,user){
      localStorage.setItem("id_token",token);
      localStorage.setItem("user",JSON.stringify(user));
       this.authToken = token;
       this.user = user;}
       loggedIn(){
         return tokenNotExpired();
       }
       logout(){
         this.authToken = null;
         this.user = null;
         localStorage.clear();
       }

       loadToken(){
         const token = localStorage.getItem("id_token");
         this.authToken=token;
       }
}
