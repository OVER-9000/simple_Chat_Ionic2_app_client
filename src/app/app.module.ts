import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { UsersPage } from '../pages/users/users';
import { HomeTabsPage } from '../pages/home-tabs/home-tabs';
import { ChatFormPage } from '../pages/chat-form/chat-form';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Auth} from '../providers/auth';
import { Validate } from '../providers/validate';
import { Users } from '../providers/users';
import { ChatAPI } from '../providers/chat-api';
import { SocketFun } from '../providers/socket-fun';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    UsersPage,
    HomeTabsPage,
    ChatFormPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    UsersPage,
    HomeTabsPage,
    ChatFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    Validate,
    Users,
    ChatAPI,
    SocketFun,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
