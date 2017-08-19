import { RentalObject } from "./rentalobject";

export class Station {
    id: number;
    description: string;
    address: string;
    host_address: string;
    rental_objects: Array<RentalObject>;

    constructor(id: number, description: string, address: string, host_address: string, rental_objects: Array<RentalObject>){
        this.id = id;
        this.description = description;
        this.address = address;
        this.host_address = host_address;
        this.rental_objects = rental_objects;
    }
}