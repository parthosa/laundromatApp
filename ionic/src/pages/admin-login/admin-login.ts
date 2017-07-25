import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {

  adminCreds = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl:ToastController,private httpService:HttpService) {
    this.adminCreds['email'] = '';
    this.adminCreds['password'] = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminLogin');
  }

  adminSignIn(){
        	this.navCtrl.setRoot(AdminPage);
    // this.httpService.postData('https://jsonplaceholder.typicode.com/users',this.adminCreds)
    //   .then(response=>{
    //     if(response.status == 1)
    //       this.navCtrl.setRoot(AdminPage);
    //     else
    //       this.toastCtrl.create({
    //           message: response.message,
    //           duration: 3000,
    //         }).present();
    //     });
  }

}
