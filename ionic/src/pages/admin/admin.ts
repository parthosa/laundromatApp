import { Component } from '@angular/core';
import { NavController, NavParams, MenuController,ToastController,LoadingController } from 'ionic-angular';
import { HostelListPage } from '../hostel-list/hostel-list';
import { UpdateStatusPage } from '../update-status/update-status';
import { HttpService } from '../../providers/http-service';
import { AdminUserDetails } from '../admin-user-details/admin-user-details';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  hostels = [];
  total_count = 0;
  hostel = {};
  count = 0;
  students = [];
  searchQuery: string = '';
  searchType: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl:LoadingController,private toastCtrl:ToastController,public menu: MenuController,private httpService:HttpService) {
    this.menu.enable(false,'studentMenu');
    this.menu.enable(true,'adminMenu');

    this.updateHostels();

    this.hostel = this.navParams.get('hostel');
    this.initStudentList();
    this.searchType = "1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Admins');
  }

  initStudentList(){
    // this.httpService.postData('/main/laundromat/all_hostels/students/',{}).then(
    // (response)=>{
    //    if(response.status == 1){
    //      this.students = response.students;
    //      this.count = response.count;
    //      localStorage.setItem('students',JSON.stringify(this.students));
    //    }
    //     else{
    //
    //       this.toastCtrl.create({
    //                   message: response.message,
    //                   duration: 3000,
    //                 }).present();
    //     }
    //
    //    });
    // }
  //   else{
  //     this.students = JSON.parse(localStorage.getItem('students'));
  //   }
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
            return (String(student.room_no).indexOf(val.toLowerCase()) > -1);
          default:
            return (student.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
  }

  onChange(){
    console.log(this.searchType);
  }

  goToPage(bits_id){
    this.navCtrl.push(AdminUserDetails,{
      'bits_id':bits_id
    });
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
        this.total_count = Number.parseInt(response.total_count);
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
  }zzz

}
