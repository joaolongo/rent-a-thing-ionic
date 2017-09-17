import { Tenant } from "../models/tenant";
import { ProfileMapper } from "./profilemapper";

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

        if (tenant.profile == null)
            return new Tenant(tenant.url, tenant.username, tenant.email, tenant.first_name, tenant.last_name, null);

        return new Tenant(tenant.url, tenant.username, tenant.email, tenant.first_name, tenant.last_name, ProfileMapper.map(tenant.profile));
    }
}
