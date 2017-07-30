import { Component } from '@angular/core';
import { NavController, NavParams, MenuController,ToastController,LoadingController } from 'ionic-angular';
import { HostelListPage } from '../hostel-list/hostel-list';
import { UpdateStatusPage } from '../update-status/update-status';
import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  hostels = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl:LoadingController,private toastCtrl:ToastController,public menu: MenuController,private httpService:HttpService) {
    this.menu.enable(false,'studentMenu');
    this.menu.enable(true,'adminMenu');

    this.updateHostels();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Admins');
  }

  updateHostels(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.httpService.getData('/main/laundromat/hostels/get/').then(
    (response)=>{
      loader.dismiss();
      if(response.status == 1){
        this.hostels = response.hostels;
      }
      else{
        this.toastCtrl.create({
              message: 'Could not fetch hostel list',
              duration: 3000,
            }).present();
      }
    });

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
