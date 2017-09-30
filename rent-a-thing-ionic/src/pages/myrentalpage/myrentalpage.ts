import { Component } from '@angular/core';
import { NavController, NavParams, DateTime } from 'ionic-angular';
import { StopWatchService } from "../../services/stopwatchservice";
import { AuthService } from "../../services/authservice";
import { StationService } from "../../services/stationservice";
import { Station } from "../../models/station";
import { StationMapper } from "../../mappers/stationmapper";
import { RentalTimeHelper } from "../../helpers/rentaltimehelper";

/*
  Generated class for the myrentalpage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'myrentalpage.html',
    providers: [[AuthService], [StationService]]
})
export class MyRentalPage {
    station: Station;
    stationLoaded: boolean = false;
    stationService: StationService;
    returnStationId: any;
    hasFinishedLoading: boolean = false;
    authService: AuthService;
    watchService: StopWatchService;

    constructor(navCtrl: NavController, navParams: NavParams, authService: AuthService, stationService: StationService) {
        this.authService = authService;
        this.stationService = stationService;
        
        this.authService.getRentalData().then(data => {

            let rentalDate = new Date((<any>data).rental_date);

            let diff = RentalTimeHelper.getTimeDifference(rentalDate, new Date(Date.now()));

            this.watchService = StopWatchService.createInstanceAndStart(diff[0], diff[1] - 3, diff[2], diff[3]);

            this.hasFinishedLoading = true;
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

    }
}
