import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/userpage/userpage';
import { SignupPage } from '../pages/signuppage/signuppage';
import { StationsPage } from '../pages/stations/stations';
import { StationPage } from '../pages/station/station';
import { AddCreditsPage } from "../pages/addcredits/addcredits";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        UserPage,
        SignupPage,
        StationsPage,
        StationPage,
        AddCreditsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        UserPage,
        SignupPage,
        StationsPage,
        StationPage,
        AddCreditsPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
