import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AuthService } from "../../services/authservice";

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

    constructor(dataservice: AuthService, navcontroller: NavController) {
        this.service = dataservice;
        this.nav = navcontroller;
    }

    logout() {
        this.service.logout();
        this.nav.setRoot(HomePage);
    }
}