import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { StudentPage } from '../student/student';
import { UserDetailsPage } from '../user-details/user-details';
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


	constructor(public navCtrl: NavController, public user: User,public toastCtrl: ToastController,private httpService: HttpService) {
		
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
        	// hi
        	console.log(this.user.details);
        	this.httpService.postData('/main/users/register/',this.user.details).then(
        		(response)=>{
        			if(response.status == 1){
	        			this.user.details['id'] = response.id;
	        			this.navCtrl.setRoot(StudentPage);
        			}
        			else if(response.status == 2){
	        			this.navCtrl.push(UserDetailsPage);
        			}else {
        				this.toastCtrl.create({
				              message: response.message,
				              duration: 3000,
				            }).present();
        			}
        		},
        		(err)=>{
        			this.toastCtrl.create({
				              message: 'Try Again',
				              duration: 3000,
				            }).present();
        		});
        }, (err) => {
			this.toastCtrl.create({
				              message: 'Try Again',
				              duration: 3000,
				            }).present();
			// this.navCtrl.setRoot(StudentPage);
		});
					
	}


	// showAlert(message,title=''){
	// 	let alert = this.alertCtrl.create({
	//       title: title,
	//       subTitle: message,
	//       buttons: ['OK']
	//     });
	//     alert.present();
	// }
}

