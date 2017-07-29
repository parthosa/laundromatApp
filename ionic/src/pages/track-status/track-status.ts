import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';

@Component({
  selector: 'page-track-status',
  templateUrl: 'track-status.html',
})
export class TrackStatusPage {

  wash = {}
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService) {
  	this.httpService.postData('/main/user/wash/track/',{'session_key':localStorage.getItem('session_key')})
      .then(response=>{
        this.wash = response.present_wash;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackStatus');
  }

}
