import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UserCreds } from "../models/usercreds";
import { EndpointHelper } from "../helpers/endpointhelper";

@Injectable()
export class AuthService {
    isLoggedin: boolean;
    http: Http;
    api_url: string;

    static get parameters() {
        return [[Http]];
    }

    constructor(http: Http) {
        this.http = http;
        this.isLoggedin = false;


        this.api_url = EndpointHelper.getEndpoint();
    }

    login(user: UserCreds) {
        var headers = new Headers();
        var creds = JSON.stringify(user);
        headers.append('Content-Type', 'application/json');

        return new Promise(resolve => {
            this.http.post(this.api_url + 'account/login/', creds, { headers: headers }).subscribe(data => {
                if (data.ok) {

                    let userData = data.json();

                    window.localStorage.setItem('api-key', userData.token);
                    window.localStorage.setItem('user-id', userData.id);
                    this.isLoggedin = true;
                } resolve(this.isLoggedin);
            }, err => {
                    
            });
        });
    }

    register(user: UserCreds) {
        return new Promise(resolve => {
            var creds = JSON.stringify(user);

            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(this.api_url + 'core/api/users/', creds, { headers: headers })
                .subscribe(data => {
                    resolve(data.ok);
                }, err => {

                });
        });
    }

    logout() {
        this.isLoggedin = false;
        window.localStorage.clear();
    }

    getUserData() {
        return new Promise(resolve => {

            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Token ' + window.localStorage.getItem('api-key'));

            this.http.get(this.api_url + 'core/api/users/' + window.localStorage.getItem('user-id') + '/', { headers: headers })
                .subscribe(data => {
                    if (data.ok)
                        resolve(data.json());
                }, err => {
                });
        });
    }
}
