import { Component , NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Users } from '../../providers/users';
import { ChatFormPage } from '../chat-form/chat-form';
import { SocketFun } from '../../providers/socket-fun';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  UsersArr:any={};
  Currentusers:any=[];
zone:any;
user:any ={}
  constructor(public navCtrl: NavController, public navParams: NavParams,private users:Users,private socketFun:SocketFun,private auth:Auth) {
  this.getusers();
  this.user =this.auth.user;
  this.zone = new NgZone({enableLongStackTrace:false});
  this.socketFun.socket.on("NewUser",(user)=>{   this.zone.run(()=>{  this.Currentusers.push(user);  }); });
  this.socketFun.socket.on("user disconnect",(user)=>{ this.zone.run(()=>{ this.Currentusers.splice(this.Currentusers.indexOf(user),1);
 console.log("length = "+this.Currentusers.length);
  }); });
}
  ionViewDidLoad() {  console.log('ionViewDidLoad UsersPage'); }
  getusers(){    this.users.getAllUsers().then((data) => {
    this.UsersArr = data;  this.Currentusers = this.UsersArr.Currentusers}); }
StartCon(item){
  this.navCtrl.push(ChatFormPage, {secondparty: item})
   .catch(()=> console.log('should I stay or should I go now'));
 }

 isActive(id){let num= this.Currentusers.map(x => x.user.id).indexOf(id);
   if(num != -1){return true;}else{return false;} }
}
