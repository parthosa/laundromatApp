import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { WashDetailsPage } from '../wash-details/wash-details';
import { TrackStatusPage } from '../track-status/track-status';
import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {

  washPlan: string;
  lastApplyDate: Date;
  washesRemaining: any;
  user = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController,private httpService:HttpService) {
    this.menu.enable(false,'adminMenu');
    this.menu.enable(true,'studentMenu');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getProfile();
  }

  getProfile(){
     this.httpService.postData('/main/user/profile/get/',{'session_key':localStorage.getItem('session_key')})
      .then(response=>{
        if(response.status == 1){
          this.user = response.user_data;
          localStorage.setItem('user',JSON.stringify(response.user_data));
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Student');
  }

  goToWashDetails(){
  	this.navCtrl.push(WashDetailsPage);
  }

  goToTrackStatus(){
  	this.navCtrl.push(TrackStatusPage);
  }


}
