import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController, ToastController,LoadingController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { StudentPage } from '../pages/student/student';
import { AdminPage } from '../pages/admin/admin';
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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private loadingCtrl:LoadingController, private toastCtrl: ToastController, public httpService: HttpService, public menuCtrl: MenuController, private push: Push, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(1, platform.platforms());
      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 2000);
      this.menuCtrl.enable(false);
      this.initPushNotification();
    });
  }

  initPushNotification() {
    if (!platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });
    const options: PushOptions = {
      android: {
        senderID: '931784175657'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      //TODO - send device token to server
      this.httpService.postData('/main/laundromat/notification/', data.registrationId).then(
        (response) => {
          console.log(response);
          // data=response;
        });

    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              this.navCtrl.push(StudentPage, { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.navCtrl.push(StudentPage, { message: data.message });
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }


  logout(admin) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration:10000
    });
    loader.present();
    if (admin) {
      this.httpService.getData('/main/user/logout/').then(
        (response) => {
          loader.dismiss();
          localStorage.removeItem('admin');
          this.toastCtrl.create({
            message: response.message,
            duration: 3000,
          }).present();
          this.navCtrl.setRoot(HomePage);
        });
    }
    else {
      GooglePlus.logout().then(res => {
        console.log(res);
        this.httpService.getData('/main/user/logout/').then(
          (response) => {
            loader.dismiss();
            this.toastCtrl.create({
              message: response.message,
              duration: 3000,
            }).present();
            this.navCtrl.setRoot(HomePage);
          });
      });
    }
  }

  goToHomePage(admin){
    if (admin) {
      this.navCtrl.setRoot(AdminPage);
    }
    else{
      this.navCtrl.setRoot(StudentPage);
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

  downloadExcel(){
    window.open('http://quicksmartwash.in/main/laundromat/sheet/', '_system');
  }

  goToEditDetailsPage(){
     this.navCtrl.push(UserDetailsPage,{'edit':true});

  }


}
