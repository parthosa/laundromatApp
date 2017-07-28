import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class LaundromatApp {
  @ViewChild('mainNav') navCtrl: NavController

  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController, ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menuCtrl.enable(false);

      // Enable to debug issues.
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("6d075c03-ae67-48ea-9009-601a111fda94", "942120250462")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    });
  }

  logout() {
    console.log(this.navCtrl);
    this.navCtrl.setRoot(HomePage);
  }
}
