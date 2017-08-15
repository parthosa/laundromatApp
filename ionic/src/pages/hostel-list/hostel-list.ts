import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';

import { HttpService } from '../../providers/http-service';
import { AdminUserDetails } from '../admin-user-details/admin-user-details';


@Component({
  selector: 'page-hostel-list',
  templateUrl: 'hostel-list.html',
})
export class HostelListPage {

  hostel = {};
  students = [];
  searchQuery: string = '';
  searchType: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl: LoadingController,private toastCtrl:ToastController,private httpService:HttpService) {
  	this.hostel = this.navParams.get('hostel');
    this.initStudentList(true);
    this.searchType = "1";
  }

  initStudentList(loading){
    let loader;
    if(loading){
    loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.httpService.postData('/main/laundromat/hostel/students/',{'hostel':this.hostel['name']}).then(
    (response)=>{
      loader.dismiss();
       if(response.status == 1){
         this.students = response.students;
         localStorage.setItem('students',JSON.stringify(this.students));
       }
        else{
          this.toastCtrl.create({
                      message: response.message,
                      duration: 3000,
                    }).present();
        }

       });
    }
    else{
      this.students = JSON.parse(localStorage.getItem('students'));
    }
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initStudentList(false);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.students = this.students.filter((student) => {
        switch (this.searchType) {
          case "1":
            return (student.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          case "2":
            return (student.bits_id.toLowerCase().indexOf(val.toLowerCase()) > -1);
          case "3":
            return (student.room_n0.toLowerCase().indexOf(val.toLowerCase()) > -1);
          default:
            return (student.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostelList');
  }

  onChange(){
    console.log(this.searchType);
  }

  goToPage(bits_id){
    this.navCtrl.push(AdminUserDetails,{
      'bits_id':bits_id
    });
  }

}
