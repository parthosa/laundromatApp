import { Component } from '@angular/core';
import { NavController,ToastController,LoadingController } from 'ionic-angular';
import { StudentPage } from '../student/student';
import { UserDetailsPage } from '../user-details/user-details';
import { AdminLoginPage } from '../admin-login/admin-login';
// import { Storage } from '@ionic/storage';

import { HttpService } from '../../providers/http-service';
// import { User } from '@ionic/cloud-angular';
import { GooglePlus } from 'ionic-native';


import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	user = {};
	constructor(public navCtrl: NavController,private loadingCtrl:LoadingController,public push: Push,public toastCtrl: ToastController,private httpService: HttpService) {
	}

	goToAdminPage(){
		// this.httpService.postData('https://jsonplaceholder.typicode.com/posts/',{user:'psarthi16@gmail.com'}).then(post=>
		// 	console.log(post),
		// 	error=>console.log(error));
		this.navCtrl.push(AdminLoginPage);
	}

	studentLogin(){
		GooglePlus.logout().then(res=>{
        console.log(res);
      
		GooglePlus.login({
          'webClientId': '931784175657-tnlaleval048phhgbrgbmeqi2hh64pmq.apps.googleusercontent.com',
          'hosted_domain': 'pilani@bits-pilani.ac.in'
        }).then((res) => {
        	this.user = res;
      //   	 let loader = this.loadingCtrl.create({
		    //   content: "Please wait...",
		    //   duration: 3000
		    // });
      //   	loader.present();
        	
			  this.user['device_id'] = localStorage.getItem('device_id');
        	this.httpService.postData('/main/user/register/',this.user).then(
        		(response)=>{
        			// loader.dismiss();
        			if(response.status == 1){
	        			this.user['id'] = response.id;
	        			localStorage.setItem('user',JSON.stringify(this.user));
	        			localStorage.setItem('session_key',response.session_key);
	        			this.navCtrl.setRoot(StudentPage);
        			}
        			else if(response.status == 2){
	        			localStorage.setItem('user',JSON.stringify(this.user));
	        			localStorage.setItem('session_key',response.session_key);
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

		}).catch(err=>{
        console.log(err);
      })
					
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

