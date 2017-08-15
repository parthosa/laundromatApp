import { Component } from '@angular/core';
import { NavController,ToastController,LoadingController,AlertController } from 'ionic-angular';
import { StudentPage } from '../student/student';
import { UserDetailsPage } from '../user-details/user-details';
import { AdminLoginPage } from '../admin-login/admin-login';
// import { Storage } from '@ionic/storage';

import { HttpService } from '../../providers/http-service';
// import { User } from '@ionic/cloud-angular';
import { GooglePlus } from 'ionic-native';
import { AppVersion } from '@ionic-native/app-version';



@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	user = {};
	updateApp = false;

	constructor(public navCtrl: NavController,private loadingCtrl:LoadingController,private appVersion: AppVersion,public alertCtrl: AlertController,public toastCtrl: ToastController,private httpService: HttpService) {
      this.checkUpdate();

	}

	goToAdminPage(){
		if(this.updateApp){
			this.updateAlert();
		}
		else{
		// this.httpService.postData('https://jsonplaceholder.typicode.com/posts/',{user:'psarthi16@gmail.com'}).then(post=>
		// 	console.log(post),
		// 	error=>console.log(error));
		this.navCtrl.push(AdminLoginPage);
	}
	}

	studentLogin(){
		if(this.updateApp){
			this.updateAlert();
		}
		else{

		GooglePlus.logout().then(res=>{
        console.log(res);
		}).catch(err=>{
        console.log(err);
      }).then(()=>{

      
		GooglePlus.login({
          'webClientId': '931784175657-fkp2jg5hibji6nlc0ln8cnm9tbr5nef8.apps.googleusercontent.com',

        }).then((res) => {
        	this.user = res;
		    this.user['device_id'] = localStorage.getItem('device_id');
        	 let loader = this.loadingCtrl.create({
		      content: "Please wait...",
		    });
        	loader.present();
        	
        	this.httpService.postData('/main/user/register/',this.user).then(
        		(response)=>{
        			loader.dismiss();
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
    });
	}
					
	}

	  checkUpdate(){
    
    this.httpService.getData('/main/app_version/').then(
        (response) => {
          let latest_app_version = response.app_version;
          this.appVersion.getVersionNumber().then(version => {
				console.log(version,latest_app_version);
		    if(version<latest_app_version){
		      this.updateApp = true;
		      this.updateAlert();
		    }
	});

    });
  }

  updateAlert(){
       let prompt = this.alertCtrl.create ({
    title: 'Upgrade Required',
    message: "A newer version of the app is available. Please download from the Store",
    buttons: [
      {
        text: 'Ok',
        handler: data => {
          console.log('ok');
        }
      }
    ]
  });
     prompt.present();
 
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

