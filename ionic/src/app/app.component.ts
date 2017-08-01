import { Component,ViewChild } from '@angular/core';
import { Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController,ToastController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { TermsAndConditions } from '../pages/terms-and-conditions/terms-and-conditions';
import { Schedule } from '../pages/schedule/schedule';
import { ContactUs } from '../pages/contact-us/contact-us';
import { Developers } from '../pages/developers/developers';
import { HttpService } from '../providers/http-service';
import { GooglePlus } from 'ionic-native';


@Component({
  templateUrl: 'app.html'
})
export class LaundromatApp {
  @ViewChild('mainNav') navCtrl: NavController

  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private toastCtrl: ToastController,public httpService: HttpService, public menuCtrl: MenuController,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(1,platform.platforms());
      statusBar.styleDefault();
      setTimeout(()=>{
        splashScreen.hide();
      },2000);
      this.menuCtrl.enable(false);
    });
  }

  logout(admin){
    console.log(admin);
    if(admin){
      this.httpService.getData('/main/user/logout/').then(
        (response)=>{
          this.toastCtrl.create({
                        message: response.message,
                        duration: 3000,
                      }).present();
      this.navCtrl.setRoot(HomePage);
      });
    }
    else{
      GooglePlus.logout().then(res=>{
        console.log(res);
        this.httpService.getData('/main/user/logout/').then(
          (response)=>{
            this.toastCtrl.create({
                          message: response.message,
                          duration: 3000,
                        }).present();
        this.navCtrl.setRoot(HomePage);
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
     this.navCtrl.push(ContactUs);
  }
    developers(){
     this.navCtrl.push(Developers);
  }
    goToEditDetailsPage(){
     this.navCtrl.push(UserDetailsPage,{'edit':true});
  }
}
