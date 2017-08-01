import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { HttpService } from '../../providers/http-service';

@Component({
  selector: 'page-update-status',
  templateUrl: 'update-status.html',
})
export class UpdateStatusPage {

  barcodeData = '';
  user = {};
  show_info = false;
  show_info_update = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private httpService:HttpService, private barcodeScanner: BarcodeScanner) {
  	this.barcodeData = '';
    this.user['status_number']="0";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateStatus');
  }



  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.barcodeData = barcodeData.text;
    }, (err) => {
      // An error occurred
      this.barcodeData = "Scan Failed!";      
    });  
    
  }

  checkStatus(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.httpService.postData('/main/laundromat/scan/',{'bag_num':this.barcodeData})
    .then(response=>{
      loader.dismiss();
      if(response.status==1){
        this.user = response.user_data;
        this.show_info = true;
        this.show_info_update = true;
        // if(response.user_data['has_applied'])
        //   this.show_info_update = true;
        // else
        //   this.show_info_update = false;
      }
      if(response.status==0){
         this.user = response.user_data;
         this.show_info = true;
         this.show_info_update = false;
         this.toastCtrl.create({
                      message: response.message,
                      duration: 4000,
                      cssClass:'error',
                    }).present();
      }
      });

  }

  updateStatus(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.httpService.postData('/main/laundromat/status/change/',{'bag_num':this.barcodeData,'status_number':this.user['status_number']})
    .then(response=>{
      loader.dismiss();
      if(response.status == 1){
        this.toastCtrl.create({
                      message: response.message,
                      duration: 3000,
                    }).present();
      }
    // send id and wash status to backend
  });
   }

}
