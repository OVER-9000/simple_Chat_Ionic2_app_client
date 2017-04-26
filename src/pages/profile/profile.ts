import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
user : Object = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:Auth) {
       this.user=this.auth.user;
  }

  ionViewDidLoad() { }


     ionViewCanEnter(): boolean{ if(this.auth.loggedIn()){ return true; } else { return false; }
     }
}
