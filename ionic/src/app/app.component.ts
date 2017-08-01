import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController, ToastController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { TermsAndConditions } from '../pages/terms-and-conditions/terms-and-conditions';
import { Schedule } from '../pages/schedule/schedule';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { DevelopersPage } from '../pages/developers/developers';

import { HttpService } from '../providers/http-service';

import { GooglePlus } from 'ionic-native';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


@Component({
  templateUrl: 'app.html'
})
export class LaundromatApp {
  @ViewChild('mainNav') navCtrl: NavController

  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private toastCtrl: ToastController, public httpService: HttpService, public menuCtrl: MenuController, private push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(1, platform.platforms());
      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 2000);
      this.menuCtrl.enable(false);
    
      GooglePlus.logout().then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
      // to check if we have permission
      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }

        });

      // to initialize push notifications

      const options: PushOptions = {
        android: {
          senderID: '931784175657'
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        },
        windows: {}
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

      pushObject.on('registration').subscribe((registration: any) => {console.log('Device registered');localStorage.setItem('device_id',registration.registrationId);});

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    });
  }

  logout(admin) {
    console.log(admin);
    if (admin) {
      this.httpService.getData('/main/user/logout/').then(
        (response) => {
          this.toastCtrl.create({
            message: response.message,
            duration: 3000,
          }).present();
          this.navCtrl.setRoot(DevelopersPage);
        });
    }
    else {
      GooglePlus.logout().then(res => {
        console.log(res);
        this.httpService.getData('/main/user/logout/').then(
          (response) => {
            this.toastCtrl.create({
              message: response.message,
              duration: 3000,
            }).present();
            this.navCtrl.setRoot(DevelopersPage);
          });
      });
    }
  }

  schedule(){
     this.navCtrl.push(Schedule);
  }
    instructions(){
     this.navCtrl.push(TermsAndConditions);
  }
    contact(){
     this.navCtrl.push(ContactUsPage);
  }
    developers(){
     this.navCtrl.push(DevelopersPage);
  }

  goToEditDetailsPage(){
     this.navCtrl.push(UserDetailsPage,{'edit':true}); 
  }
}
