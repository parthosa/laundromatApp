import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { WashDetailsPage } from '../wash-details/wash-details';
import { TrackStatusPage } from '../track-status/track-status';

@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController) {
    this.menu.enable(false,'adminMenu');
    this.menu.enable(true,'studentMenu');
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
