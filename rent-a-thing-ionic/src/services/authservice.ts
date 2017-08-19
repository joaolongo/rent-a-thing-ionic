import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UserCreds } from "../models/usercreds";

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

        this.api_url = 'http://localhost:8087/';
    }

    login(user: UserCreds) {
        var headers = new Headers();
        var creds = JSON.stringify(user);
        headers.append('Content-Type', 'application/json');

        return new Promise(resolve => {
            this.http.post(this.api_url + 'account/login/', creds, { headers: headers }).subscribe(data => {
                if (data.ok) {
                    window.localStorage.setItem('api-key', data.json().token);
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
}