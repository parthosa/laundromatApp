import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { UpdateStatusPage } from '../update-status/update-status';


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController) {
    this.menu.enable(false,'studentMenu');
    this.menu.enable(true,'adminMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Admins');
  }

  goToUpdateStatus(){
  	this.navCtrl.push(UpdateStatusPage)
  }

}
