import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { EndpointHelper } from "../helpers/endpointhelper";
import { RentalObject } from "../models/rentalobject";

@Injectable()
export class RentalService {
    headers: Headers;
    api_url: string;
    apikey: string;
    http: Http;
    gatewayReturnMock: { success: boolean, transactionCode: string, transactionDate: string };

    static get parameters() {
        return [[Http]];
    }

    constructor(http: Http) {
        this.http = http;
        this.apikey = window.localStorage.getItem('api-key');

        this.api_url = EndpointHelper.getEndpoint();

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Token ' + this.apikey);
    }

    createRental(rentalObject: RentalObject) {

    }
}
