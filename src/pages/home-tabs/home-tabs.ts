import { Component,NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UsersPage } from '../users/users';
import { ProfilePage } from '../profile/profile';
import { Auth } from '../../providers/auth';
import { SocketFun } from '../../providers/socket-fun';
import { ChatAPI } from '../../providers/chat-api';

@Component({
  selector: 'page-home-tabs',
  templateUrl: 'home-tabs.html'
})
export class HomeTabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = UsersPage;
  tab3Root: any = ProfilePage;
  newMsgCount:any;
  zone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:Auth,private socketFun:SocketFun,private chatAPI:ChatAPI) {
    this.socketFun.connect();    
    this.auth.getProfile().then((user)=>{});
  }

  ionViewDidLoad() { }

  ionViewCanEnter(): boolean{ if(this.auth.loggedIn()){ return true;  } else {  return false;  }; }

}
