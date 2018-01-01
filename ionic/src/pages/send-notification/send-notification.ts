import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SendNotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-send-notification',
  templateUrl: 'send-notification.html',
})
export class SendNotificationPage {
  myrequests;
  myfriends;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendNotificationPage');
  }

  ionViewWillEnter() {

  }

  ionViewDidLeave() {

  }


  addbuddy() {

  }

  accept(item) {

  }

  ignore(item) {

  }

  buddychat(buddy) {
    
  }
}
