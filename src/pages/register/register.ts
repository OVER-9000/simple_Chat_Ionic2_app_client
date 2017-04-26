import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Auth } from '../../providers/auth';
import { Validate } from '../../providers/validate';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  Fname:any;
  Lname:any;
  U_Email:any;
  U_Password:any;
  U_Password2:any;
  constructor(private navCtrl: NavController, public navParams: NavParams,
    public validate:Validate,public alertController: AlertController,private auth:Auth) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
Register(){
  const user={
  f_name:this.Fname,
  l_name:this.Lname,
  email:this.U_Email,
  Password:this.U_Password,
  Password2:this.U_Password2}
  //Register fileds
      if(!this.validate.validateRegister(user))
     {  this.showAlert('register','please fill in all fileds');
      return false;}
      //validation Email
      if(!this.validate.validateEmail(user.email))
     { this.showAlert('register','please use a valid Email');
      return false;}
      //Password Matching
      if(!this.validate.PasswordMatching(user))
     { this.showAlert('register','Passwords do not Match');
      return false;}
      //Register user
   this.auth.registerUser(user).subscribe(data => {
     if(data.success){
      // this.flashMessages.show('you are now registered and can login',{cssClass:'alert-success',timeout:3000});
  //   this.router.navigate(['/login']);
this.showAlert('register success ','you are now registered and can login now');
   }else{
      // this.flashMessages.show('something went wrong',{cssClass:'alert-danger',timeout:3000});
       //this.router.navigate(['/register']);
       this.showAlert('register ','registered failed');
     }
   });
   this.goLogin();
 }
 goLogin(){
   this.navCtrl.push(LoginPage)
    .catch(()=> console.log('should I stay or should I go now'));
 }

 showAlert(title,subTitle){
    let myalert=this.alertController.create({
      title : title,
      subTitle :subTitle,
      buttons:['ok']
    });
    myalert.present();
  }
}
