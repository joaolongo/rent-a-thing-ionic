import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/userpage/userpage';
import { SignupPage } from '../pages/signuppage/signuppage';
import { StationsPage } from '../pages/stations/stations';
import { StationPage } from '../pages/station/station';
import { TransactionPage } from "../pages/transaction/transaction";
import { InputMaskModule } from "../directives/ng2-inputmask/input-mask.module";
import { Mask } from "../directives/mask/mask";
import { MyRentalPage } from "../pages/myrentalpage/myrentalpage";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        UserPage,
        SignupPage,
        StationsPage,
        StationPage,
        TransactionPage,
        MyRentalPage,
        Mask
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
        TransactionPage,
        MyRentalPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
