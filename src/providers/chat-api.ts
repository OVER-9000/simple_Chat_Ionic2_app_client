import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from './auth';

@Injectable()
export class ChatAPI {
  S_url :string   = 'http://localhost:3000';
  authToken:any;
  AllConversations:any={conversations:[]};
  ConversationIsOpen:any=null;
  newMsgCount:number;
  constructor(public http: Http,private auth:Auth) { console.log('Hello ChatAPI Provider'); }
/*-------------------------get All Conversations----------------------------*/
  getAllConversations(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
  return new Promise(resolve => {
    this.http.get(this.S_url+'/chat/',{headers:headers}).map(res => res.json())
      .subscribe(data => { this.AllConversations = data; this.unReadMsg(); resolve(data); });
  }); }
  /*--------*/
  unReadMsg(){this.newMsgCount=0; this.AllConversations.conversations.forEach((v)=>{
    if(v.ISawIt && this.auth.user.user){if(v.ISawIt.indexOf(this.auth.user.user._id) < 0){this.newMsgCount++;}console.log(this.newMsgCount);} }); }
  /*------------------------------------*/
  UpdateMsgArr(con){console.log("con --->"+JSON.stringify(con));
    let num = this.AllConversations.conversations.map(x => x.conversationId).indexOf(con.conversationId);
    if(num > 0){this.AllConversations.conversations[num] = con;}
    else{this.AllConversations.conversations.push(con);}
    this.unReadMsg();  }
    /*--------------------------*/
    re_Notif(con){let num = this.AllConversations.conversations.map(x => x.conversationId).indexOf(con._id);
      console.log("num -->"+num+" con --->"+JSON.stringify(con));
    if(num >= 0){this.AllConversations.conversations[num].ISawIt = con.ISawIt;this.unReadMsg();}}
    /*--------------------------*/
ConversationIdNow(id){this.ConversationIsOpen=id;}
  /*-------------------------get target Conversation----------------------------*/
 getConversation(conversationId){
     let headers = new Headers();
     this.loadToken();
     headers.append('Authorization',this.authToken);
     headers.append('Content-Type','application/json');
 return new Promise(resolve => {
   this.http.get(this.S_url+'/chat/'+conversationId,{headers:headers}).map(res => res.json())
     .subscribe(data => {   resolve(data); });
 }); }
 /*----------------------------------------*/
 getConversationByUsers(users){
     let headers = new Headers();
     this.loadToken();
     headers.append('Authorization',this.authToken);
     headers.append('Content-Type','application/json');
 return new Promise(resolve => {
   this.http.get(this.S_url+'/chat/'+users[0]+'/'+users[1],{headers:headers}).map(res => res.json())
     .subscribe(data => { resolve(data); });
 }); }
/*----------------------------new Conversation-----------------------------*/
newConversation(recipient,composedMessage){
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
   headers.append('Content-Type', 'application/json');
  this.http.post(this.S_url+'/chat/new/'+recipient,{composedMessage:composedMessage}, {headers: headers}).subscribe(res => {
      console.log(res.json());
    }); }
/*--------------------------send Reply-------------------------------*/
sendReply(conversationId,composedMessage){
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization',this.authToken);
   headers.append('Content-Type', 'application/json');
  this.http.post(this.S_url+'/chat/'+conversationId,{composedMessage:composedMessage}, {headers: headers}).subscribe(res => {
      console.log(res.json());
    }); }
  /*--------------------------load Token------------------------------------*/
loadToken(){  const token = localStorage.getItem("id_token"); this.authToken=token; }
/*----------------------------------------------------*/
}
