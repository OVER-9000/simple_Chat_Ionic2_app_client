import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Auth } from './auth';

@Injectable()
export class SocketFun {
  socket:any;
  socketUrl:string = "http://localhost:3000";
  constructor(public http: Http,private auth :Auth) {
    console.log('Hello SocketFun Provider');
  }
connect(){
  this.socket = io.connect(this.socketUrl);
  this.socket.emit("NewUser",this.auth.user);console.log('send NewUser ');}
}
