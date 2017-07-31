﻿import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
    isLoggedin: boolean;
    http: Http;
    api_url: string;

    static get parameters() {
        return [[Http]];
    }

    constructor(http, navcontroller) {
        this.http = http;
        this.isLoggedin = false;

        this.api_url = 'http://127.0.0.1:8087/'
    }

    login(user) {
        var headers = new Headers();
        var creds = JSON.stringify(user);
        headers.append('Content-Type', 'application/json');

        return new Promise(resolve => {
            this.http.post(this.api_url + 'account/login', creds, { headers: headers }).subscribe(data => {
                if (data.ok) {
                    window.localStorage.setItem('api-key', data.json().token);
                    this.isLoggedin = true;
                } resolve(this.isLoggedin);
            }, err => {
                    
            });
        });
    }

    register(user) {
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