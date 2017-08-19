import { Station } from "../models/station";
import { RentalObjectMapper } from "./rentalobjectmapper";

export class StationMapper {

    static mapMany(object, mapRentalObjects: Boolean = false): Array<Station> {
        let stations: Array<Station> = new Array<Station>();

        for (let station of object)
            stations.push(this.map(station, mapRentalObjects));

        return stations;
    }

    static map(station, mapRentalObjects: Boolean = false): Station {

        if (station == null)
            return null;

        if (!mapRentalObjects)
            return new Station(station.id, station.description, station.address, station.host_address, null);

        return new Station(station.id, station.description, station.address, station.host_address, RentalObjectMapper.mapMany(station.rental_objects));
    }


}