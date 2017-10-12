import { Profile } from "./profile";

export class Tenant {
    lastName: string;
    firstName: string;
    profile: Profile;
    url: string;
    username: string;
    email: string;

    constructor(url: string, username: string, email: string, firstName: string, lastName: string, profile: Profile) {
        this.url = url;
        this.username = username;
        this.email = email;
        this.profile = profile;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
