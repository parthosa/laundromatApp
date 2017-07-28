import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-track-status',
  templateUrl: 'track-status.html',
})
export class TrackStatusPage {

  submittedOn: Date;
  washes: number;
  washStatus = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,private httpService:HttpService) {
  	this.httpService.postData('http://localhost:8000/main/user/wash/history/',this.storage.get('session_key'))
      .then(response=>{
        this.washes = response.washes_left;
        this.submittedOn = response.apply_date;
        this.washStatus = response.status.name;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackStatus');
  }

}
