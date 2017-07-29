import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';

@Component({
  selector: 'page-track-status',
  templateUrl: 'track-status.html',
})
export class TrackStatusPage {

  wash = {}
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl:ToastController,public loadingCtrl: LoadingController,private httpService:HttpService) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  	this.httpService.postData('/main/user/wash/track/',{'session_key':localStorage.getItem('session_key')})
      .then(response=>{
        loader.dismiss();
        this.wash = response.present_wash;
        if(this.wash['status_number']==0){
          this.toastCtrl.create({
                      message: 'You have not submitted any wash',
                      duration: 4000,
                      cssClass:'error',
                    }).present();
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackStatus');
  }

}
