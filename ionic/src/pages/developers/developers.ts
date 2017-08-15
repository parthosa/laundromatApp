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
  			'facebook':'https://www.facebook.com/jainamritanshu',
        'linkedin':'https://www.linkedin.com/in/amritanshu-jain-b78371120/'
  		},
  		'partho':{
  			'github':'http://github.com/parthosa',
  			'facebook':'https://www.facebook.com/parthosarthi',
        'linkedin':'https://www.linkedin.com/in/partho-sarthi/'
  		},
  		'mayank':{
  			'github':'https://github.com/goelmayank',
  			'facebook':'https://www.facebook.com/mayank.goyal.52438',
        'linkedin':'https://www.linkedin.com/in/mayank-goel-636121b0/'
  		}
  	}
  	let url = profiles[user][type];

  	window.open(url, '_system', 'location=yes');
  }
}
