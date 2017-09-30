import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home';
import { AuthService } from "../../services/authservice";
import { WalletService } from "../../services/walletservice";
import { StopWatchService } from "../../services/stopwatchservice";

@Component({
    templateUrl: './userpage.html',
    providers: [AuthService, WalletService]
})
export class UserPage implements OnInit {
    walletService: WalletService;    
    service: AuthService;
    nav: NavController;
    balance: number;
    
    ngOnInit(): void {
        this.walletService.getUserBalance().then(data => {
            this.balance = data['balance'] == null || data['balance'] == undefined ? 0 : data['balance'];
        });
    }

    static get parameters() {
        return [[AuthService], [WalletService], [NavController]];
    }

    constructor(service: AuthService, walletService: WalletService, navcontroller: NavController) {
        this.service = service;
        this.walletService = walletService;
        this.nav = navcontroller;
    }

    logout() {
        this.service.logout();
        this.nav.setRoot(HomePage);
    }
}
