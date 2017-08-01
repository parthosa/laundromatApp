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
  plans = [];
  editing = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public toastCtrl: ToastController,private httpService: HttpService) {
    this.updateHostels();
    this.getPlans();
    if(this.navParams.get('edit'))
      this.editing = true;
    if(this.editing)
      this.user = JSON.parse(localStorage.getItem('user'));
    this.user['session_key'] = localStorage.getItem('session_key');
  }

  updateHostels(){

    this.httpService.getData('/main/laundromat/hostels/get/').then(
    (response)=>{
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

  getPlans(){


    this.httpService.postData('/main/plans/get/',{}).then(
    (response)=>{
      if(response.status == 1){
        this.plans = response.plans_list;
        console.log(this.plans);
      }
      else{
        this.toastCtrl.create({
                      message: 'Could not fetch ',
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
    if(this.editing)
      url = '/main/user/profile/edit/';
    else
      url = '/main/user/additional/profile/';
    loader.present();
    if(!this.user['bag_num'])
      this.user['bag_num'] = '';
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
