import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomeTabsPage } from '../home-tabs/home-tabs';
import { RegisterPage } from '../register/register';
import { Validate } from '../../providers/validate';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  })
export class LoginPage {
  U_Email : any;
  U_Password : any;
  constructor(public validate:Validate,public navCtrl: NavController, public navParams: NavParams,private auth:Auth,public alertController: AlertController,) {}

  ionViewDidLoad() {}
 Login(){
   const user = { email:this.U_Email,password:this.U_Password}
  /* if(!!this.U_Email || !!this.U_Password)
  {  this.showAlert('Login','please fill in all fileds');
   return true;}*/
this.auth.authenticateUser(user).subscribe(data => {
    if(data.success)
    {this.auth.storeUserDate(data.token,data.user);
      this.navCtrl.push(HomeTabsPage)
       .catch(()=> console.log('should I stay or should I go now')); }
    else{this.showAlert("Login failed",data.msg || 'Login failed');    }
  });
 }


 goRegister(){
   this.navCtrl.push(RegisterPage)
    .catch(()=> console.log('should I stay or should I go now')); }
showAlert(title,subTitle){
   let myalert=this.alertController.create({
     title : title,
     subTitle :subTitle,
     buttons:['ok']
   });
   myalert.present();
 }
}
