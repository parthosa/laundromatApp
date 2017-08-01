import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class Schedule {


  hostels = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.hostels = [
{'hostel': 'Vyas',
'day':'Monday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'TT room'
},{
'hostel': 'Vishwakarma',
'day':'Monday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'TT room'
},{
'hostel': 'Gandhi',
'day':'Tuesday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Common room'
},{
'hostel': 'Ashok',
'day':'Wednesday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Laundromat at CVR'
},{
'hostel': 'Budh',
'day':'Wednesday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Common room'
},{
'hostel': 'SR',
'day':'Thursday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Between BLOCK A & B common room'
},{
'hostel': 'CVR',
'day':'Thursday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Laundromat at CVR'
},{
'hostel': 'Bhagirath',
'day':'Friday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'BG common room'
},{
'hostel': 'Rana Pratap',
'day':'Friday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Common room'
},{
'hostel': 'Meera',
'day':'Saturday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Visitors room'
},{
'hostel': 'Shankar',
'day':'Saturday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'TT room'
},{
'hostel': 'Ram',
'day':'Sunday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Common room'
},{
'hostel': 'Mal A',
'day':'Sunday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Drop & Collect from MAL laundromat'
},{
 'hostel': 'Mal B',
'day':'Sunday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Drop & Collect from MAL laundromat'
},{
 'hostel': 'Mal C',
'day':'Sunday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Drop & Collect from MAL laundromat'
}
,{'hostel': 'MSA',
'day':'Sunday',
'time_picking':'5:30-7:00 pm',
'timie_drop':'6:30-8:30 pm',
'location':'Drop & Collect from MAL laundromat'
}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Schedule');
  }

}
