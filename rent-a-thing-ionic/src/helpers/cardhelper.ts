export class CardHelper {
    private static masks: {
        'mastercard': '9999 9999 9999 9999',
        'visa': '9999 9999 9999 9999',
        'amex': '9999 999999 99999',
        'diners': '9999 9999 9999 99',
        'discover': '9999 9999 9999 9999',
        'unknown': '9999 9999 9999 9999'
    };
    public static NONE: string = "none";
    public static AMERICAN_EXPRESS: string = "amex";
    public static VISA: string = "visa";
    public static MASTERCARD: string = "mast";

    constructor() { }

    public static isAccepted(cardName: string): boolean {
        return cardName == this.AMERICAN_EXPRESS ||
            cardName == this.VISA ||
            cardName == this.MASTERCARD;
    }

    public static MIN_LENGTH: number = 14;

    private static _types: { [key: string]: Object } =
    {
        "amex": { pattern: /^3[47]/, length: 15 }
        , "visa": { pattern: /^4/, length: 16 }
        , "mast": { pattern: /^5[1-5]/, length: 16 }
    }

    public static getCardType(cardNumber: string): string {
        var key: string;
        var cardProps: Object;
        var theCard: string = this.__preprocess(cardNumber);

        for (key in this._types) {
            cardProps = this._types[key];

            if (theCard.match(cardProps['pattern']))
                return key;
        }

        return "none";
    }

    public static isValid(cardNumber: string): boolean {
        var testNumber: string = this.__preprocess(cardNumber);
        var cardType: string = this.getCardType(testNumber);

        if (cardType != this.NONE)
            return this.__lengthValid(testNumber, cardType) && this.__luhnValid(testNumber);

        return false;
    }

    private static __preprocess(cardNumber: string): string {
        return cardNumber.replace(/[ -]/g, '');
    }

    private static __lengthValid(cardNumber: string, cardType: string): boolean {
        var cardProps: Object = this._types[cardType];
        return cardProps ? cardNumber.length == cardProps['length'] : false;
    }

    private static __luhnValid(cardNumber: string): boolean {
        var digit: number;
        var n: number;
        var sum: number;
        var j: number;

        sum = 0;
        var numbers: Array<number> = cardNumber.split('').reverse().map((val) => parseFloat(val));
        var len: number = numbers.length;
        n = 0;
        j = 0;

        while (j < len) {
            digit = numbers[n];
            digit = +digit;

            if (n % 2) {
                digit *= 2;
                if (digit < 10)
                    sum += digit;
                else
                    sum += digit - 9;
            }
            else
                sum += digit;

            n = ++j;
        }

        return sum % 10 === 0;
    }
    
    static getMaskType(cardType: string) {
        return this.masks[cardType];
    }
}
