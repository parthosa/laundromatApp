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
    });
    loader.present();
  	this.httpService.getData('https://jsonplaceholder.typicode.com/users')
  		.then(users=>{
  			loader.dismiss();
  			this.washItems = users; 
  		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WashDetails');
  }

}
