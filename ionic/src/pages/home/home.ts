import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IdNumberPage } from '../id-number/id-number';
import { AdminLoginPage } from '../admin-login/admin-login';

// import { User } from '@ionic/cloud-angular';
// import { GooglePlus } from '@ionic-native/google-plus';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {


	constructor(public navCtrl: NavController) {
		
	}

	goToIdNumberPage(){
		this.navCtrl.push(IdNumberPage);
	}

	goToAdminPage(){
		this.navCtrl.push(AdminLoginPage);
	}

	studentLogin(){
		// console.log(this.googlePlus);
		// this.googlePlus.login({
		//     'webClientId': '931784175657-fk7i6o3nfkh2nkpdpa4j2qgflald4442.apps.googleusercontent.com',
		//     'offline': true
		//   }).then( res => console.log(res));
	}
}

