import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StationService } from '../../services/stationservice'
import { StationPage } from '../station/station'
import { Station } from "../../models/station";
import { StationMapper } from "../../mappers/stationmapper";
import { WalletService } from "../../services/walletservice";
import { TransactionPage } from "../transaction/transaction";

@Component({
    templateUrl: './stations.html',
    providers: [[StationService], [WalletService]]
})
export class StationsPage {
    walletService: WalletService;
    stations: Array<Station>;
    nav: NavController;
    stationservice: StationService;

    static get parameters() {
        return [[StationService], [NavController], [WalletService]];
    }

    constructor(stationservice: StationService, navcontroller: NavController, walletService: WalletService) {
        this.stationservice = stationservice;
        this.nav = navcontroller;
        this.walletService = walletService;

        this.walletService.getUserBalance().then(data => {
            if (data['balance'] == null || data['balance'] == undefined || data['balance'] == 0) {
                this.nav.setRoot(TransactionPage);
            } else {
                stationservice.getStations().then(data => {
                    this.stations = StationMapper.mapMany(data);
                });
            }
        });

    }

    select(id) {
        this.nav.push(StationPage, { stationId: id });
    }
}
