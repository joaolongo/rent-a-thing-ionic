import { StationService } from "../../services/stationservice";
import { NavController, NavParams } from "ionic-angular";
import { Station } from "../../models/station";
import { StationMapper } from "../../mappers/stationmapper";
import { Component, OnInit } from "@angular/core";
import { RentalObject } from "../../models/rentalobject";
import { RentalService } from "../../services/rentalservice";
import { MyRentalPage } from "../myrentalpage/myrentalpage";

@Component({
    templateUrl: './station.html',
    providers: [[StationService], [RentalService]]
})
export class StationPage implements OnInit {
    rentalService: RentalService;
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

    constructor(stationService: StationService, navcontroller: NavController, navParams: NavParams, rentalService: RentalService) {
        this.stationService = stationService;
        this.nav = navcontroller;
        this.navParams = navParams;
        this.rentalService = rentalService;
    }

    setObject(objectIndex: string) {
        this.selectedObject = this.station.rental_objects[objectIndex];
    }

    rent() {
        this.rentalService.createRental(this.selectedObject, this.station.id).then(data => {
            this.nav.setRoot(MyRentalPage);
        });
    }
}
