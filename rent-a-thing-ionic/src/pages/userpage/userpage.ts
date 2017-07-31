import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthService } from '../home/authservice';
import { HomePage } from '../home/home';

@Component({
    templateUrl: './userpage.html',
    providers: [AuthService]
})
export class UserPage {

    service: AuthService;
    nav: NavController;

    static get parameters() {
        return [[AuthService], [NavController]];
    }

    constructor(dataservice, navcontroller) {
        this.service = dataservice;
        this.nav = navcontroller;
    }

    logout() {
        this.service.logout();
        this.nav.setRoot(HomePage);
    }
}