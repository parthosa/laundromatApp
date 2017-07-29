import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-wash-details',
  templateUrl: 'wash-details.html',
})
export class WashDetailsPage {

  washItems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService,public loadingCtrl: LoadingController) {

  	let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  	this.httpService.postData('/main/user/wash/history/',{'session_key':localStorage.getItem('session_key')})
  		.then(response=>{
  			loader.dismiss();
        if(response.status == 1)
    			this.washItems = response.washes_list; 
  		});
    setTimeout(()=>{
      loader.dismiss();
    },5000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WashDetails');
  }

}
