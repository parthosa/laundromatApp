import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LaundromatApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { StudentPage } from '../pages/student/student';
import { WashDetailsPage } from '../pages/wash-details/wash-details';
import { TrackStatusPage } from '../pages/track-status/track-status';
import { AdminPage } from '../pages/admin/admin';
import { AdminLoginPage } from '../pages/admin-login/admin-login';
import { HostelListPage } from '../pages/hostel-list/hostel-list';
import { UpdateStatusPage } from '../pages/update-status/update-status';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { DevelopersPage } from '../pages/developers/developers';
import { Schedule } from '../pages/schedule/schedule';
import { TermsAndConditions } from '../pages/terms-and-conditions/terms-and-conditions';

import { HttpService } from '../providers/http-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
// import { Storage } from '@ionic/storage';

// import { GooglePlus } from '@ionic-native/google-plus';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '2218f385'
  },
  'auth': {
    'google': {
      'webClientId': '931784175657-tnlaleval048phhgbrgbmeqi2hh64pmq.apps.googleusercontent.com',
      'scope': ['permission1', 'permission2']
    }
  }
};


@NgModule({
  declarations: [
    LaundromatApp,
    HomePage,
    UserDetailsPage,
    StudentPage,
    WashDetailsPage,
    TrackStatusPage,
    AdminPage,
    AdminLoginPage,
    HostelListPage,
    UpdateStatusPage,
    ContactUsPage,
    DevelopersPage,
    Schedule,
    TermsAndConditions
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(LaundromatApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LaundromatApp,
    HomePage,
    UserDetailsPage,
    StudentPage,
    WashDetailsPage,
    TrackStatusPage,
    AdminPage,
    AdminLoginPage,
    HostelListPage,
    UpdateStatusPage,
    ContactUsPage,
    DevelopersPage,
    Schedule,
    TermsAndConditions
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    BarcodeScanner,
  ]
})
export class AppModule {}
