import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LaundromatApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { IdNumberPage } from '../pages/id-number/id-number';
import { StudentPage } from '../pages/student/student';
import { WashDetailsPage } from '../pages/wash-details/wash-details';
import { TrackStatusPage } from '../pages/track-status/track-status';
import { AdminPage } from '../pages/admin/admin';
import { AdminLoginPage } from '../pages/admin-login/admin-login';
import { HostelListPage } from '../pages/hostel-list/hostel-list';
import { UpdateStatusPage } from '../pages/update-status/update-status';
import { TabsPage } from '../pages/tabs/tabs';

import { HttpService } from '../providers/http-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
// import { GooglePlus } from '@ionic-native/google-plus';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e8104c91'
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
    AboutPage,
    ContactPage,
    HomePage,
    IdNumberPage,
    StudentPage,
    WashDetailsPage,
    TrackStatusPage,
    AdminPage,
    AdminLoginPage,
    HostelListPage,
    UpdateStatusPage,
    TabsPage
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
    AboutPage,
    ContactPage,
    HomePage,
    IdNumberPage,
    StudentPage,
    WashDetailsPage,
    TrackStatusPage,
    AdminPage,
    AdminLoginPage,
    HostelListPage,
    UpdateStatusPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService

  ]
})
export class AppModule {}
