import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http,Headers, RequestOptions, Response  } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpUtils provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
  	*/
@Injectable()
export class HttpService {
	// hello
	baseUrl = "http://quicksmartwash.in";
	// baseUrl = "http://192.168.43.56:8000";
	
	public loader;
	constructor(public http: Http,public loadingCtrl:LoadingController) {
		console.log('Hello HttpUtils Provider');
		this.loader = this.loadingCtrl.create({
	      content: "Please wait...",
	      duration: 3000
	    });
	}

	login_as_student(BITS_mail: string, Password: string) {
    	let body_obj: any = { BITS_mail, Password };
        const body = JSON.stringify(body_obj);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('nodejs-rest-api.herokuapp.com/api/login_as_student', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}
	
	login_as_admin(admin_mail: string, Password: string) {
    	let body_obj: any = { admin_mail, Password };
        const body = JSON.stringify(body_obj);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('nodejs-rest-api.herokuapp.com/api/login_as_admin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}

	list_of_hostels() {
        return this.http.get('nodejs-rest-api.herokuapp.com/api/list_of_hostels')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}

	list_of_hostel_students(hostel_name: string) {
        let body_obj: any = { hostel_name };
        const body = JSON.stringify(body_obj);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('nodejs-rest-api.herokuapp.com/api/list_of_hostel_students', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}

	student_details(bits_id: string) {
        let body_obj: any = { bits_id };
        const body = JSON.stringify(body_obj);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('nodejs-rest-api.herokuapp.com/api/student_details', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}

	last_wash_status(bits_id: string) {
        let body_obj: any = { bits_id };
        const body = JSON.stringify(body_obj);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('nodejs-rest-api.herokuapp.com/api/last_wash_status', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}

	list_of_urgency_requests() {
        return this.http.get('nodejs-rest-api.herokuapp.com/api/list_of_urgency_requests')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}

	student_profile(bits_id: string) {
        let body_obj: any = { bits_id };
        const body = JSON.stringify(body_obj);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('nodejs-rest-api.herokuapp.com/api/student_profile', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}

	download_excel() {
        return this.http.get('nodejs-rest-api.herokuapp.com/api/download_excel')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}

	analysis() {
        return this.http.get('nodejs-rest-api.herokuapp.com/api/analysis')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
	}
		

	getData(url){
		return this.http.get(this.baseUrl+url)
		.toPromise()
		.then(res => res.json())
		.catch(this.handleError);
	}

	postData(url,data){
		let headers = new Headers({ 'Content-Type': 'text/plain' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.baseUrl+url, data, options)
		.toPromise()
		.then(res => res.json())
		.catch(this.handleError);
	}

	private handleError (error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
