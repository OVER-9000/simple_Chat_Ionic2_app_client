import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class Users {
  authToken:any;
  S_url :string   = 'http://localhost:3000';

  constructor(public http: Http) { console.log('Hello Users Provider'); }
  getAllUsers(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
  return new Promise(resolve => {
    this.http.get(this.S_url+'/users/getusers',{headers:headers}).map(res => res.json())
      .subscribe(data => {resolve(data); });
  }); }
  /*--------------------------load Token------------------------------------*/
  loadToken(){  const token = localStorage.getItem("id_token"); this.authToken=token; }
  /*----------------------------------------------------*/
  }
