import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HostelListPage } from '../hostel-list/hostel-list';
import { UpdateStatusPage } from '../update-status/update-status';
import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  hostels = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController,private httpService:HttpService) {
    this.menu.enable(false,'studentMenu');
    this.menu.enable(true,'adminMenu');

    this.httpService.getData('http://localhost:8000/main/laundromat/hostels/get/')
      .then(response=>{
        	this.hostels =  response.hostels;
        	// this.hostels = ['Ashok','Ram','Budh','Meera','Shankar'];
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Admins');
  }

  goToHostelPage(hostel){
  	this.navCtrl.push(HostelListPage,{
  		hostel: hostel
  	});
  }

  goToUpdateStatus(){
    this.navCtrl.push(UpdateStatusPage);
  }

}
