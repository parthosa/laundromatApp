import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController }  from 'ionic-angular';
import { StudentPage } from '../student/student';

import { HttpService } from '../../providers/http-service';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  user = {};
  hostels = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public toastCtrl: ToastController,private httpService: HttpService) {
    this.updateHostels();
    if(this.navParams.get('edit')==true)
      this.user = JSON.parse(localStorage.getItem('user'));
    this.user['session_key'] = localStorage.getItem('session_key');
  }

  updateHostels(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.httpService.getData('/main/laundromat/hostels/get/').then(
    (response)=>{
      loader.dismiss();
      if(response.status == 1){
        this.hostels = response.hostels;
      }
      else{
        this.toastCtrl.create({
                      message: 'Try Again',
                      duration: 3000,
                    }).present();
      }
    });

  }

  submitDetails(){
    let url = '';
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    if(this.navParams.get('edit')==true)
      url = '/main/user/profile/edit/';
    else
      url = '/main/user/additional/profile/';
    loader.present();
    this.httpService.postData(url,this.user).then(
    (response)=>{
      loader.dismiss();
      this.toastCtrl.create({
        message: response.message,
        duration: 3000,
      }).present();
      if(response.status == 1){
        this.navCtrl.setRoot(StudentPage);
      }
    });
  }


}
