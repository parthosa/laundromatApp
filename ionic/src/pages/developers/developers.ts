import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-developers',
  templateUrl: 'developers.html',
})
export class DevelopersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Developers');
  }

  openProfile(user,type){
  	let profiles = {
  		'amritanshu':{
  			'github':'http://github.com/jainamritanshu',
  			'facebook':'https://www.facebook.com/jainamritanshu'
  		},
  		'partho':{
  			'github':'http://github.com/parthosa',
  			'facebook':'https://www.facebook.com/parthosarthi'
  		},
  		'mayank':{
  			'github':'https://github.com/goelmayank',
  			'facebook':'https://www.facebook.com/mayank.goyal.52438'
  		}
  	}
  	let url = profiles[user][type];

  	window.open(url, '_system', 'location=yes');
  }
}
