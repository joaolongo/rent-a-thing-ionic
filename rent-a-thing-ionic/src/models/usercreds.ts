import { Profile } from "./profile";

export class UserCreds {
    
    username: string;
    email: string;
    password: string;
    profile: Profile;

    constructor(username: string, email: string, password: string, cpf: string) {
        this.username = username;
        this.email = email
        this.password = password;
        this.profile = new Profile(cpf, '', '', '');
    }
}
