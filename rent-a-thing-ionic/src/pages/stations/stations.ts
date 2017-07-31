import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StationService } from '../../services/stationservice'
import { StationPage } from '../station/station'

@Component({
    templateUrl: './stations.html',
    providers: [StationService]
})
export class StationsPage {
    stations: any;
    nav: NavController;
        stationservice: StationService;

    static get parameters() {
        return [[StationService], [NavController]];
    }

    constructor(stationservice: StationService, navcontroller: NavController) {
        this.stationservice = stationservice;
        this.nav = navcontroller;

        stationservice.getStations().then(data => {
            this.stations = data;
        });
    }

    select(id){
        this.nav.push(StationPage, {stationId: id});
    }
}
