import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthService } from '../home/authservice';
import { HomePage } from '../home/home';

@Component({
    templateUrl: './signuppage.html',
    providers: [AuthService]
})
export class SignupPage {
    newcreds: { username: string; password: string; email: string; };
    nav: NavController;
    authservice: AuthService;

    static get parameters() {
        return [[AuthService], [NavController]];
    }

    constructor(authservice: AuthService, navcontroller: NavController) {
        this.authservice = authservice;
        this.nav = navcontroller;

        this.newcreds = {username: '', password: '', email: ''};
    }

    register(newcreds) {
        this.authservice.register(newcreds).then(data => {
            if (data)
                this.nav.setRoot(HomePage);
        });
    }
}