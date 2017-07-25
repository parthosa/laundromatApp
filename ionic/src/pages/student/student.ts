import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { WashDetailsPage } from '../wash-details/wash-details';
import { TrackStatusPage } from '../track-status/track-status';
import { User } from '@ionic/cloud-angular';

import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {

  washPlan: string;
  lastApplyDate: Date;
  washesRemaining: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController,public user: User,private httpService:HttpService) {
    this.menu.enable(false,'adminMenu');
    this.menu.enable(true,'studentMenu');

    this.httpService.getData('https://jsonplaceholder.typicode.com/users')
      .then(response=>{
        this.washPlan = response.washPlan; 
        this.lastApplyDate = response.lastApplyDate; 
        this.washesRemaining = response.washesRemaining; 
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
