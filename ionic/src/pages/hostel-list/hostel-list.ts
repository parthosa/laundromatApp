import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';

import { HttpService } from '../../providers/http-service';


@Component({
  selector: 'page-hostel-list',
  templateUrl: 'hostel-list.html',
})
export class HostelListPage {

  hostel = '';
  students = [];
  searchQuery: string = '';
  searchType: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl:ToastController,private httpService:HttpService) {
  	this.hostel = this.navParams.get('hostel');
    this.initStudentList();
    this.searchType = "1";
  }

  initStudentList(){
    this.students = [{
      'name':'Partho',
      'id':'2015A7PS088P',
      'room_no':'150'
    },{
      'name':'Amritanshu',
      'id':'2015ABPS831P',
      'room_no':'151'
    }];

    // this.httpService.postData('http://localhost:8000//main/laundromat/hostel/students/',this.hostel).then(
    // (response)=>{
    //    if(response.status == 1)
    //      this.students = response.students;
    //     else{
    //       this.toastCtrl.create({
    //                   message: response.message,
    //                   duration: 3000,
    //                 }).present();
    //     }

    //  });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initStudentList();

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
            return (student.room_num.toLowerCase().indexOf(val.toLowerCase()) > -1);
          default:
            return (student.plan.toLowerCase().indexOf(val.toLowerCase()) > -1);
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

}
