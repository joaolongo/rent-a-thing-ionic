export class RentalTimeHelper {

    public static getTimeDifference(minDate: Date, maxDate: Date): Array<number> {
        let result = new Array<number>();

        let diffMs = maxDate.getTime() - minDate.getTime();
        
        result.push(Math.floor(diffMs / 86400000));
        result.push(Math.floor((diffMs % 86400000) / 3600000));
        result.push(Math.round(((diffMs % 86400000) % 3600000) / 60000));
        result.push(0);

        return result;
    }
}
