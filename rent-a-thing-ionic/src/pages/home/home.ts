import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../services/authservice";
import { UserPage } from '../userpage/userpage'
import { SignupPage } from '../signuppage/signuppage'
import { UserCreds } from "../../models/usercreds";

@Component({
    templateUrl: './home.html',
    providers: [AuthService]
})
export class HomePage {
        usercreds: UserCreds;
        nav: NavController;
        authservice: AuthService;

    static get parameters() {
        return [[AuthService], [NavController]];
    }

    constructor(authservice: AuthService, navcontroller: NavController) {
        this.authservice = authservice;
        this.nav = navcontroller;

        this.usercreds = new UserCreds('','','', '');
    }

    login(usercreds) {
        this.authservice.login(usercreds).then(data => {
            if (data)
                this.nav.setRoot(UserPage);
        });
    }

    register() {
        this.nav.push(SignupPage);
    }
}
