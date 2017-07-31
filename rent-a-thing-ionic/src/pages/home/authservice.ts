import { NavController } from 'ionic-angular';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
    isLoggedin: boolean;
    nav: NavController;
    http: Http;
    static get parameters() {
        return [[Http], [NavController]];
    }

    constructor(http, navcontroller) {
        this.http = http;
        this.nav = navcontroller;
        this.isLoggedin = false;
    }

    login(user) {
        var headers = new Headers();
        var creds = JSON.stringify(user);
        headers.append('Content-Type', 'application/json');

        return new Promise(resolve => {
            this.http.post('http://192.168.0.107:8087/account/login', creds, { headers: headers }).subscribe(data => {
                if (data.ok) {
                    window.localStorage.setItem('raja', data.json().token);
                    this.isLoggedin = true;
                } resolve(this.isLoggedin);
            });
        });
    }

    register(user) {
        return new Promise(resolve => {
            var creds = JSON.stringify(user);

            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post('http://192.168.0.107:8087/core/api/users/', creds, { headers: headers })
                .subscribe(data => {
                    resolve(data.ok);
                });
        });
    }

    logout() {
        this.isLoggedin = false;
        window.localStorage.clear();
    }
}