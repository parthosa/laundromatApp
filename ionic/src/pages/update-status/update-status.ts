import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-update-status',
  templateUrl: 'update-status.html',
})
export class UpdateStatusPage {

  barcodeData = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
  	this.barcodeData = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateStatus');
  }

  checkStatus(){
  	this.barcodeScanner.scan().then((barcodeData) => {
  		this.barcodeData = barcodeData.text;
	});	
  }

  updateStatus(){

  }

}
