import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Station } from "../models/station";
import { EndpointHelper } from "../helpers/endpointhelper";
import { CreditCard } from "../models/creditcard";
import { GUID } from "../helpers/guidhelper";
import { Transaction } from "../models/transaction";

@Injectable()
export class TransactionService {
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

    getRentalPrice(region: string = null) {
        return new Promise(resolve => {
            this.http.get(this.api_url + 'server/api/prices/', { headers: this.headers }).subscribe(data => {
                if (data.ok)
                    resolve(data.json()[0].value)
            }, err => {
            });
        });
    }

    finishTransaction(creditCard: CreditCard, transaction: Transaction) {

        //TODO: Entrada para um gateway de pagamento
        this.gatewayReturnMock = { success: true, transactionCode: GUID.newGUID(), transactionDate: new Date().toLocaleDateString() }

        transaction.transaction_code = this.gatewayReturnMock.transactionCode;
        transaction.is_completed = true;
        
        return new Promise(resolve => {
            this.http.post(this.api_url + 'server/api/transactions/', JSON.stringify(transaction), { headers: this.headers }).subscribe(data => {
                resolve(data.ok);
            }, err => {
            });
        });
    }
}
