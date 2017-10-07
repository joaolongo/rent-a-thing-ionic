import { Component } from '@angular/core';
import { NavController, NavParams, DateTime } from 'ionic-angular';
import { StopWatchService } from "../../services/stopwatchservice";
import { AuthService } from "../../services/authservice";
import { StationService } from "../../services/stationservice";
import { Station } from "../../models/station";
import { StationMapper } from "../../mappers/stationmapper";
import { RentalTimeHelper } from "../../helpers/rentaltimehelper";
import { StationsPage } from "../stations/stations";
import { RentalService } from "../../services/rentalservice";
import { TransactionService } from "../../services/transactionservice";
import { UserPage } from "../userpage/userpage";

/*
  Generated class for the myrentalpage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'myrentalpage.html',
    providers: [[AuthService], [StationService], [RentalService], [TransactionService]]
})
export class MyRentalPage {
    transactionService: TransactionService;
    rentalService: RentalService;
    nav: NavController;
    station: Station;
    stationLoaded: boolean = false;
    stationService: StationService;
    returnStationId: any;
    hasFinishedLoading: boolean = false;
    authService: AuthService;
    watchService: StopWatchService;

    constructor(navCtrl: NavController, navParams: NavParams, authService: AuthService, stationService: StationService, rentalService: RentalService, transactionService: TransactionService) {
        this.authService = authService;
        this.stationService = stationService;
        this.rentalService = rentalService;
        this.transactionService = transactionService;
        this.nav = navCtrl;

        this.authService.hasActiveRental().then(data => {
            if (<boolean>data) {
                this.authService.getRentalData().then(data => {

                    let rentalDate = new Date((<any>data).rental_date);

                    let diff = RentalTimeHelper.getTimeDifference(rentalDate, new Date(Date.now()));

                    this.watchService = StopWatchService.createInstanceAndStart(diff[0], diff[1] - 3, diff[2], diff[3]);

                    this.hasFinishedLoading = true;
                });
            }
            else {
                this.nav.setRoot(StationsPage);
            }
        });
    }

    setReturnStationCode(data) {
        this.returnStationId = data;
    }

    searchStation() {

        this.stationLoaded = false;

        this.stationService.getStation(this.returnStationId).then(data => {
            this.station = StationMapper.map(data);

            this.stationLoaded = true;
        });
    }

    return() {
        this.authService.getRentalData().then(data => {
            this.transactionService.getRentalPrice().then(price => {
                this.rentalService.endRental((
                    <any>data).rented_object.id,
                    this.returnStationId,
                    ((this.watchService.days + 1) * <number>price))
                    .then(result => {
                        this.nav.setRoot(UserPage);
                });
            });
            
        });
    }
}
