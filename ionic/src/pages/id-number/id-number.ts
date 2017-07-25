import { Component } from '@angular/core';
import { NavController, NavParams }  from 'ionic-angular';
import { StudentPage } from '../student/student';

@Component({
  selector: 'page-id-number',
  templateUrl: 'id-number.html',
})
export class IdNumberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdNumber');
  }

  goToUserPage(){
    this.navCtrl.setRoot(StudentPage);
  }


}
