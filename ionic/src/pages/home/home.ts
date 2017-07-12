import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IdNumberPage } from '../id-number/id-number';

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

}

