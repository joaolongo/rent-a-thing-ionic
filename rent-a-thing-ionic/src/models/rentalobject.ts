import { Tenant } from "./tenant";

export class RentalObject {
    id: string;
    current_tenant: Tenant;

    constructor(id: string, current_tenant: Tenant) {
        this.id = id;
        this.current_tenant = current_tenant;
    }
}