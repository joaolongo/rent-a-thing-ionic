export class CreditCard {
    cvv: number;
    cc: string;
    month: number;
    year: number;
    fullName: string;

    private _validDate: string;

    constructor(cc: string, validDate: string, fullName: string, cvv: number = null) {
        this.cc = cc;
        this.validDate = validDate;
        this.fullName = fullName;
        this.cvv = cvv;
    }

    get validDate(): string {
        return this._validDate;
    }

    set validDate(dateString: string) {
        this._validDate = dateString;

        if (dateString.length == 7) {
            let monthYear = this.validDate.split(" ");
            this.month = Number(monthYear[0]);
            this.year = Number(monthYear[1]);
        }
    }
}
