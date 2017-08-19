import { RentalObject } from "../models/rentalobject";
import { TenantMapper } from "./tenantmapper";

export class RentalObjectMapper {
    static mapMany(objects): Array<RentalObject> {

        let rentalObjects: Array<RentalObject> = new Array<RentalObject>();

        for (let rentalObject of objects)
            rentalObjects.push(this.map(rentalObject, true));

        return rentalObjects;
    }

    static map(rentalObject, mapTenant: boolean = false): RentalObject {

        if (rentalObject == null)
            return null;

        if (!mapTenant)
            return new RentalObject(rentalObject.id, null);

        return new RentalObject(rentalObject.id, TenantMapper.map(rentalObject.current_tenant));
    }

}