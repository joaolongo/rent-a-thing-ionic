import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CurrencyPipe } from "@angular/common";
import { TransactionService } from "../../services/transactionservice";
import { AuthService } from "../../services/authservice";
import { TenantMapper } from "../../mappers/tenantmapper";
import { Tenant } from "../../models/tenant";
import { CardExpirationHelper } from "../../helpers/cardexpirationhelper";
import { CreditCard } from "../../models/creditcard";
import { Transaction } from "../../models/transaction";
import { StationsPage } from "../stations/stations";

@Component({
    templateUrl: 'transaction.html',
    providers: [AuthService, TransactionService, CurrencyPipe, { provide: LOCALE_ID, useValue: 'pt-BR' }]
})
export class TransactionPage implements OnInit {
    dataLoaded: boolean = false;
    userData: Tenant;
    authService: AuthService;
    currencyPipe: CurrencyPipe;
    transactionService: TransactionService;
    nav: NavController;
    state: number = 1;
    creditValue: number;
    totalCredits: number;
    varTeste: string;
    creditCard: CreditCard;

    ngOnInit(): void {
        this.creditCard = new CreditCard("", "", "");
    }

    constructor(navCtrl: NavController, currencyPipe: CurrencyPipe,
        transactionService: TransactionService, authService: AuthService) {
        this.nav = navCtrl;
        this.currencyPipe = currencyPipe;
        this.transactionService = transactionService;
        this.authService = authService;
        this.transactionService.getRentalPrice().then(data => {
            this.creditValue = <number>data;
        });

        this.authService.getUserData().then(data => {
            this.userData = TenantMapper.map(data);
            this.dataLoaded = true;
        });
    }

    getNextValue() {
        if (this.state == 3)
            return "Finalizar";
        return "Próximo";
    }

    back() {
        if (this.state > 1)
            this.state--;
    }

    next() {
        if (this.state < 3)
            this.state++;
        else
            this.finishTransaction()
    }
    
    finishTransaction() {

        let transaction = new Transaction(this.totalCredits * this.creditValue, this.totalCredits, this.creditValue, "", false);

        this.transactionService.finishTransaction(this.creditCard, transaction).then(data => {
            if (data)
                this.nav.setRoot(StationsPage);
        });
    }
}
