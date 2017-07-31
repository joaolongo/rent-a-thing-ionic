import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../home/authservice'

@Component({
    templateUrl: './stations.html',
    providers: [AuthService]
})
export class StationsPage {
        nav: NavController;
        authservice: AuthService;

    static get parameters() {
        return [[AuthService], [NavController]];
    }

    /*public navCtrl: NavController*/
    constructor(authservice, navcontroller) {
        this.authservice = authservice;
        this.nav = navcontroller;
    }
}
