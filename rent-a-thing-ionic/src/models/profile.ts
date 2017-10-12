export class Profile {
    cpf: string;
    address1: string;
    address2: string;
    zipcode: string;

    constructor(cpf: string, address1: string, address2: string, zipcode: string) {
        this.cpf = cpf;
        this.address1 = address1;
        this.address2 = address2;
        this.zipcode = zipcode;
    }
}
