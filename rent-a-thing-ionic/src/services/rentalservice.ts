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

    createRental(rentalObject: RentalObject, station_id: number) {
        let rental: { id: string, station_id: number, is_return: boolean, rental_cost: number };

        rental = { id: rentalObject.id, is_return: false, station_id: station_id, rental_cost: 0 };

        return new Promise(resolve => {
            this.http.put(this.api_url + 'server/api/rental_objects/' + rentalObject.id + '/', JSON.stringify(rental), { headers: this.headers })
                .subscribe(data => {
                    if (data.ok) {
                        resolve(true);
                    }
                }, err => {
                    resolve(false);
                });
        });
    }

    endRental(rentalObjectId: string, station_id: number, rental_cost: number) {
        let rental: { id: string, station_id: number, is_return: boolean, rental_cost: number };

        rental = { id: rentalObjectId, is_return: true, station_id: station_id, rental_cost: rental_cost };

        return new Promise(resolve => {
            this.http.put(this.api_url + 'server/api/rental_objects/' + rentalObjectId + '/', JSON.stringify(rental), { headers: this.headers })
                .subscribe(data => {
                    if (data.ok) {
                        resolve(true);
                    }
                }, err => {
                    resolve(false);
                });
        });
    }
}
