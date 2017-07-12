import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-update-status',
  templateUrl: 'update-status.html',
})
export class UpdateStatusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateStatus');
  }

  checkStatus(){

  }

  updateStatus(){
  	
  }

}
