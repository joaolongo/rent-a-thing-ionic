import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class StationService{
    api_url: string;
    apikey: string;
    http: Http;

    static get parameters() {
        return [[Http]];
    }

    constructor(http: Http){
        this.http = http;
        this.apikey = window.localStorage.getItem('api-key');

        this.api_url = 'http://127.0.0.1:8087/'
    }

    getStations() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + this.apikey);

        return new Promise(resolve => {
            this.http.get(this.api_url + 'server/api/clients', { headers: headers})
            .subscribe(data => {
                if(data.ok){
                    resolve(data.json());
                }
            }, err => {
            });
        });
    }
}