import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {

  adminCreds = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl:ToastController,private loadingCtrl:LoadingController,private httpService:HttpService) {
    if(localStorage.getItem('admin')){
      this.adminCreds = JSON.parse(localStorage.getItem('admin'));
    }
    this.adminCreds['email'] = 'laundro_admin1';
    this.adminCreds['password'] = 'laundro@admin';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminLogin');
  }

  adminSignIn(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration:10000
    });
    loader.present();
    this.httpService.postData('/main/laundromat/signin/',this.adminCreds)
      .then(response=>{
        loader.dismiss();
        if(response.status == 1){
          localStorage.setItem('admin',JSON.stringify(this.adminCreds));
          this.navCtrl.setRoot(AdminPage);
        }
        this.toastCtrl.create({
            message: response.message,
            duration: 3000,
          }).present();

  });
  }

}
