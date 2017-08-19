import { Tenant } from "../models/tenant";

export class TenantMapper{
    static mapMany(objects) {
        let tenants: Array<Tenant> = new Array<Tenant>();

        for (let tenant of objects)
            tenants.push(this.map(tenant));

        return tenants;
    }

    static map(tenant) {

        if (tenant == null)
            return null;

        return new Tenant(tenant.url, tenant.username, tenant.email);
    }
}