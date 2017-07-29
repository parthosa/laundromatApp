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

import { HttpService } from '../providers/http-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
// import { Storage } from '@ionic/storage';

// import { GooglePlus } from '@ionic-native/google-plus';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e8104c91'
  },
  'auth': {
    'google': {
      'webClientId': '942120250462-ablb9b1rtkjth7g8gq9p2tdr0jl7hv73.apps.googleusercontent.com',
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
