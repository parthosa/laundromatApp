import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdminPage } from '../admin/admin';

@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminLogin');
  }

  adminSignIn(){
  	this.navCtrl.setRoot(AdminPage);
  }

}
