import { StationService } from "../../services/stationservice";
import { NavController, NavParams } from "ionic-angular";
import { Station } from "../../models/station";
import { StationMapper } from "../../mappers/stationmapper";
import { Component, OnInit } from "@angular/core";
import { RentalObject } from "../../models/rentalobject";

@Component({
    templateUrl: './station.html',
    providers: [StationService]
})
export class StationPage implements OnInit {
    selectedObject: RentalObject;
    navParams: NavParams;
    nav: NavController;
    stationService: StationService;
    station: Station;
    dataLoaded: Boolean = false;

    ngOnInit(): void {
        this.stationService.getStation(this.navParams.get('stationId')).then(data => {
            this.station = StationMapper.map(data, true);
            this.dataLoaded = true;
        })
    }

    constructor(stationService: StationService, navcontroller: NavController, navParams: NavParams) {
        this.stationService = stationService;
        this.nav = navcontroller;
        this.navParams = navParams;
    }

    setObject(objectIndex: string) {
        this.selectedObject = this.station.rental_objects[objectIndex];
    }

    rent() {
        let aaa = 1 + 1;
    }
}
