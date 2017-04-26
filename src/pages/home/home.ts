import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import { ChatAPI } from '../../providers/chat-api';
import { ChatFormPage } from '../chat-form/chat-form';
import { SocketFun } from '../../providers/socket-fun';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
user:any={};
zone:any;
newmsgCount:any;

  constructor(public navCtrl: NavController, private auth:Auth,private chatAPI:ChatAPI,public socketFun:SocketFun) {
    this.user = this.auth.user;
    this.MysocketOn();
   this.chatAPI.getAllConversations(); }

 ionViewCanEnter(): boolean{  if(this.auth.loggedIn()){ return true; } else { return false; }; }
 StartCon(item){
  this.navCtrl.push(ChatFormPage, {conversationId: item.conversationId,secondparty:item.secondparty})
  .catch(()=> console.log('should I stay or should I go now')); }

MysocketOn(){console.log("------MysocketOn222------");
  this.zone = new NgZone({enableLongStackTrace:false});
  this.socketFun.socket.on("New Msg for user"+this.user.id,(conversation)=>{
    this.zone.run(()=>{
      console.log("conversation ----->"+JSON.stringify(conversation)+"---"+conversation.secondparty);
      this.chatAPI.UpdateMsgArr(conversation); });
  });
}

IsNewMsg(arr){
  if(arr){let num = arr.indexOf(this.user.id); return (num === -1)? true :false;}
}
  OnLogout(){ this.auth.logout();}

}
