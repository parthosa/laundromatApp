import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,private httpService:HttpService, private barcodeScanner: BarcodeScanner) {
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
    this.httpService.postData('/main/laundromat/scan/',{'bits_id':this.barcodeData})
    .then(response=>{
      if(response.status==1){
        this.user = response.user_data;
        this.show_info = true;
      }
      });
  }

  updateStatus(){
    this.httpService.postData('/main/laundromat/status/change/',{'bits_id':this.barcodeData,'status':this.user['status_number']})
    .then(response=>{
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
