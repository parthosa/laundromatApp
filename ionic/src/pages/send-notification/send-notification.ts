import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';

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
  message:any="";
  all_hostels:any=false;
  hostel:any="VK";
  bag_num:any="2014768";
  constructor(public navCtrl: NavController, private httpService:HttpService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendNotificationPage');
  }

  sendNotification(){
    this.httpService.postData('/main/laundromat/notification/',{
      'message':this.message,
      'all_hostels':this.all_hostels,
      'hostel':this.hostel,
      'bag_num':this.bag_num
    })
    .then(response=>{
      console.log(response);
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
