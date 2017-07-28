import { Component } from '@angular/core';
import { NavController, NavParams }  from 'ionic-angular';
import { StudentPage } from '../student/student';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  user = {};
  hostels = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hostels = ['Ashok','Ram','Budh','Meera','Shankar'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdNumber');
  }

  submitDetails(){
    this.navCtrl.setRoot(StudentPage);
  }


}
