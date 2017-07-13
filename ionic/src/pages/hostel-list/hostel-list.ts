import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-hostel-list',
  templateUrl: 'hostel-list.html',
})
export class HostelListPage {

  hostel = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService) {
  	this.hostel = navParams.get('hostel');

  	this.httpService.postData('/api/get_id/',{
  		hostel : navParams.get('hostel')
  	}).then(
		(response)=>{
			console.log(response);
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostelList');
  }

}
