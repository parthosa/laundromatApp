import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {

  adminCreds = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService) {
    this.adminCreds['email'] = '';
    this.adminCreds['password'] = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminLogin');
  }

  adminSignIn(){
    this.httpService.postData('https://jsonplaceholder.typicode.com/users',this.adminCreds)
      .then(response=>{
        	this.navCtrl.setRoot(AdminPage);
        });
  }

}
