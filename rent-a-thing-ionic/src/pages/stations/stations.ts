import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StationService } from '../../services/stationservice'
import { StationPage } from '../station/station'
import { Station } from "../../models/station";
import { StationMapper } from "../../mappers/stationmapper";

@Component({
    templateUrl: './stations.html',
    providers: [StationService]
})
export class StationsPage {
    stations: Array<Station>;
    nav: NavController;
    stationservice: StationService;

    static get parameters() {
        return [[StationService], [NavController]];
    }

    constructor(stationservice: StationService, navcontroller: NavController) {
        this.stationservice = stationservice;
        this.nav = navcontroller;

        stationservice.getStations().then(data => {
            this.stations = StationMapper.mapMany(data);
        });
    }

    select(id) {
        this.nav.push(StationPage, {stationId: id});
        //this.nav.setRoot(StationPage, { stationId: id });
    }
}
