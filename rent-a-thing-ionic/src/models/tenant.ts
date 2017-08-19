export class Tenant {
    url: string;
    username: string;
    email: string;

    constructor(url: string, username: string, email: string) {
        this.url = url;
        this.username = username;
        this.email = email;
    }
}