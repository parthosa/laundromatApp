import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController } from 'ionic-angular';

import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-admin-user-details',
  templateUrl: 'admin-user-details.html',
})
export class AdminUserDetails {

  // name = '';
  user = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService,private loadingCtrl: LoadingController) {
  	// this.name = this.navParams.get('name');
  	this.getStudentInfo();
  	 this.user['washItems'] = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserDetails');
  }

  getStudentInfo(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration:10000
    });
    loader.present();
     this.httpService.postData('/main/laundromat/get/student/',{'bits_id':this.navParams.get('bits_id')})
      .then(response=>{
        loader.dismiss();

        if(response.status == 1){
          this.user = response.info;
          // if(response.user_data['has_applied'] == false){
          //   this.toastCtrl.create({
          //             message: 'You have not subscribed for Laundromat',
          //             duration: 4000,
          //             cssClass:'error',
          //           }).present();
          // }
          // localStorage.setItem('user',JSON.stringify(response.user_data));
        }
      });
  }

}
