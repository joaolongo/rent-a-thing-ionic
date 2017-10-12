import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthService } from "../../services/authservice";
import { HomePage } from '../home/home';
import { UserCreds } from "../../models/usercreds";

@Component({
    templateUrl: './signuppage.html',
    providers: [AuthService]
})
export class SignupPage {
    newcreds: UserCreds;
    nav: NavController;
    authservice: AuthService;

    static get parameters() {
        return [[AuthService], [NavController]];
    }

    constructor(authservice: AuthService, navcontroller: NavController) {
        this.authservice = authservice;
        this.nav = navcontroller;

        this.newcreds = new UserCreds('', '', '', '');
    }

    register(newcreds) {
        this.authservice.register(newcreds).then(data => {
            if (data)
                this.nav.setRoot(HomePage);
        });
    }
}
