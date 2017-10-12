import { Profile } from "../models/profile";

export class ProfileMapper {
    static mapMany(objects) {
        let tenants: Array<Profile> = new Array<Profile>();

        for (let profile of objects)
            tenants.push(this.map(profile));

        return tenants;
    }

    static map(profile) {

        if (profile == null)
            return null;

        return new Profile(profile.cpf, profile.address1, profile.address2, profile.zipcode);
    }
}
