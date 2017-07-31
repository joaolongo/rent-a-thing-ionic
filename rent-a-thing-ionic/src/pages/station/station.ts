import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../home/authservice'

@Component({
    templateUrl: './station.html',
    providers: [AuthService]
})
export class StationPage {
        nav: NavController;
        authservice: AuthService;

    static get parameters() {
        return [[AuthService], [NavController], [NavParams]];
    }

    constructor(authservice: AuthService, navcontroller: NavController, navParams: NavParams) {
        this.authservice = authservice;
        this.nav = navcontroller;
    }
}
