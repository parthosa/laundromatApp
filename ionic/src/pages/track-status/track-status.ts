import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-track-status',
  templateUrl: 'track-status.html',
})
export class TrackStatusPage {

  submittedOn: Date;
  washes: number;
  washStatus = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService) {
  	this.httpService.getData('https://jsonplaceholder.typicode.com/users')
  		.then(response=>{
  			this.washes = Number.parseInt(response.washes); 
  			this.submittedOn = response.submittedOn; 
  			this.washStatus = response.washStatus; 

  		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackStatus');
  }

}
