import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class StationService {
    headers: Headers;
    api_url: string;
    apikey: string;
    http: Http;

    static get parameters() {
        return [[Http]];
    }

    constructor(http: Http) {
        this.http = http;
        this.apikey = window.localStorage.getItem('api-key');

        //this.api_url = 'http://127.0.0.1:8087/'
        this.api_url = 'http://192.168.0.107:8087/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Token ' + this.apikey);
    }

    getStations() {
        return new Promise(resolve => {
            this.http.get(this.api_url + 'server/api/clients', { headers: this.headers })
                .subscribe(data => {
                    if (data.ok) {
                        resolve(data.json());
                    }
                }, err => {
                });
        });
    }

    getStation(id) {
        return new Promise(resolve => {
            this.http.get(this.api_url + 'serve/api/clients/' + id, { headers: this.headers })
                .subscribe(data => {
                    if (data.ok)
                        resolve(data.json());
                }, err => {
                });
        })
    }
}