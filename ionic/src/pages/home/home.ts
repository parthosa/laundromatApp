import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { StudentPage } from '../student/student';
import { AdminLoginPage } from '../admin-login/admin-login';
import { User } from '@ionic/cloud-angular';

import { HttpService } from '../../providers/http-service';
// import { User } from '@ionic/cloud-angular';
import { GooglePlus } from 'ionic-native';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {


	constructor(public navCtrl: NavController, public user: User,public alertCtrl: AlertController,private httpService: HttpService) {
		
	}

	goToAdminPage(){
		// this.httpService.postData('https://jsonplaceholder.typicode.com/posts/',{user:'psarthi16@gmail.com'}).then(post=>
		// 	console.log(post),
		// 	error=>console.log(error));
		this.navCtrl.push(AdminLoginPage);
	}

	studentLogin(){
		GooglePlus.login({
          'webClientId': '931784175657-tnlaleval048phhgbrgbmeqi2hh64pmq.apps.googleusercontent.com'
        }).then((res) => {
        	this.user.details = res;
        	this.httpService.postData('/api/get_id/',this.user.details).then(
        		(response)=>{
        			this.user.details['id'] = response.id;
        			this.navCtrl.setRoot(StudentPage);
        		},
        		(err)=>{
        			this.showAlert('Cannot get ID Number');
        		});
        }, (err) => {
			// this.showAlert('Try Again or Contact Us','Authentication Failed');
			this.navCtrl.setRoot(StudentPage);
		});
		
					
	}


	showAlert(message,title=''){
		let alert = this.alertCtrl.create({
	      title: title,
	      subTitle: message,
	      buttons: ['OK']
	    });
	    alert.present();
	}
}

