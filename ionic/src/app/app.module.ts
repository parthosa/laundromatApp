import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LaundromatApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { IdNumberPage } from '../pages/id-number/id-number';
import { StudentPage } from '../pages/student/student';
import { WashDetailsPage } from '../pages/wash-details/wash-details';
import { TrackStatusPage } from '../pages/track-status/track-status';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    LaundromatApp,
    AboutPage,
    ContactPage,
    HomePage,
    IdNumberPage,
    StudentPage,
    WashDetailsPage,
    TrackStatusPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(LaundromatApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LaundromatApp,
    AboutPage,
    ContactPage,
    HomePage,
    IdNumberPage,
    StudentPage,
    WashDetailsPage,
    TrackStatusPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
