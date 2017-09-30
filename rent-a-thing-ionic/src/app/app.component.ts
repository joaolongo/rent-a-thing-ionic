import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/userpage/userpage';
import { StationsPage } from '../pages/stations/stations';
import { AuthService } from "../services/authservice";
import { TransactionPage } from "../pages/transaction/transaction";
import { MyRentalPage } from "../pages/myrentalpage/myrentalpage";


@Component({
    templateUrl: 'app.html',
    providers: [AuthService]
})
export class MyApp {
    hasActiveRental: boolean;

    public CONST_TITULO_PERFIL: string = "Perfil";
    public CONST_TITULO_ESTACOES: string = "Estações";
    public CONST_TITULO_MEU_ALUGUEL: string = "Meu Aluguel";
    public CONST_TITULO_COMPRAR_CREDITOS: string = "Comprar créditos";

    @ViewChild(Nav) nav: Nav;

    authservice: AuthService;
    rootPage: any;
    loginpage = HomePage;
    pages: Array<{ title: string, component: any }> = [];

    constructor(public platform: Platform, authservice: AuthService) {
        this.initializeApp();
        this.authservice = authservice;
        
        this.pages.push({ title: 'Perfil', component: UserPage });
        this.pages.push({ title: 'Estações', component: StationsPage });
        this.pages.push({ title: 'Comprar créditos', component: TransactionPage });
        this.pages.push({ title: 'Meu Aluguel', component: MyRentalPage });

        this.refreshMenu();
        
        if (this.isLoggedin())
            this.rootPage = UserPage;
        else
            this.rootPage = HomePage;
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    refreshMenu() {

        this.authservice.hasActiveRental().then(data => {
            this.hasActiveRental = <boolean>data;
        });
    }

    //private _canShow: string;

    //get canShow(): boolean {
    //    return this._validDate;
    //}

    canShow(title: string):boolean {
        switch (title)
        {
            case this.CONST_TITULO_ESTACOES:
                if (this.hasActiveRental)
                    return false;
                else
                    return true;
            case this.CONST_TITULO_MEU_ALUGUEL:
                if (this.hasActiveRental)
                    return true;
                else
                    return false;
            case this.CONST_TITULO_COMPRAR_CREDITOS:
                if (this.hasActiveRental)
                    return false;
                else
                    return true;
            default:
                return false;
        }
    }

    openPage(page) {
        this.nav.setRoot(page);
    }

    isLoggedin(): boolean {
        return window.localStorage.getItem('api-key') !== null && window.localStorage.getItem('user-id') !== null;
    }
    
    logout() {
        this.authservice.logout();
        this.openPage(HomePage);
    }
}
