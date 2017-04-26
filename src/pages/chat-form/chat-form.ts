import { Component,NgZone,ViewChild } from '@angular/core';
import { NavController, NavParams,Content, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { ChatAPI } from '../../providers/chat-api';
import { SocketFun } from '../../providers/socket-fun';

@Component({
  selector: 'page-chat-form',
  templateUrl: 'chat-form.html'
})
export class ChatFormPage {
  secondparty:any = {};
  conversationId:any = null;

messages:any=[];
zone:any;
user:any;
chatInput: string = '';
UserState:boolean;
data:any;
@ViewChild(Content) content:Content;

  constructor(public navCtrl: NavController,private auth:Auth, public navParams: NavParams,private chatAPI:ChatAPI,private socketFun:SocketFun,public alertController: AlertController) {
    this.secondparty = navParams.get('secondparty');
    this.conversationId = navParams.get('conversationId');
    this.user = this.auth.user.user;
    if(this.conversationId){this.chatAPI.getConversation(this.conversationId).then((data)=>{this.SetUpDate(data);});}
    else if(this.secondparty){this.chatAPI.getConversationByUsers([this.user._id,this.secondparty._id]).then((data)=>{this.SetUpDate(data);}); }
  }
SetUpDate(data){
//  console.log("data --> "+JSON.stringify(data));
  this.messages= data.messages;
  this.conversationId = data.conversation._id;
  this.MysocketOn();
  this.chatAPI.re_Notif(data.conversation);
  this.chatAPI.ConversationIdNow(this.conversationId);}

 ionViewDidLoad() { setTimeout(()=>{this.content.scrollToBottom(500);},100); }

 Sendmsg(msg){
if(this.conversationId){ let data={C_id:this.conversationId,  body:msg,  authorId:this.user._id,secondparty:this.secondparty};
this.socketFun.socket.emit("New Msg With conversationID",data);}
else{this.showAlert("error "," no recipient found");}
this.chatInput = ''; this.typingState();}

ionViewCanEnter(): boolean{  if(this.auth.loggedIn()){ return true; } else { return false; }; }

MysocketOn(){
  this.zone = new NgZone({enableLongStackTrace:false});
  this.socketFun.socket.on("New Msg id = "+this.conversationId,(data)=>{
    this.zone.run(()=>{
      this.socketFun.socket.emit("I Saw It",{C_id:this.conversationId,U_id:this.user._id});
      this.messages.push(data.msg);
      //this.chatAPI.UpdateMsgArr(data.conversation);
    setTimeout(()=>{console.log("sss"+this.content);this.content.scrollToBottom();},100);
   });
  });
  this.socketFun.socket.on("Ontype"+this.conversationId,(id)=>{
    this.zone.run(()=>{ if(id != this.user._id){this.UserState=true;}   });
  });
  this.socketFun.socket.on("OnStoptype"+this.conversationId,(id)=>{
    this.zone.run(()=>{  if(id != this.user._id){this.UserState=false;}  });
  });
}
 showAlert(title,subTitle){
    let myalert=this.alertController.create({
      title : title,
      subTitle :subTitle,
      buttons:['ok']
    });
    myalert.present();
  }
typingState(){console.log("typingState");
 if(this.chatInput.length > 0 && this.UserState != true){this.socketFun.socket.emit("usertype",{C_id:this.conversationId,U_id:this.user._id}); }
  if(this.chatInput.length == 0){ this.socketFun.socket.emit("userStoptype",{C_id:this.conversationId,U_id:this.user._id});} }

}
