export class Transaction {
    amount_paid: number;
    credits_purchased: number;
    price_per_credit: number;
    year: number;
    transaction_code: string;
    is_completed: boolean;
    
    constructor(amount_paid: number, credits_purchased: number, price_per_credit: number, transaction_code: string, is_completed: boolean) {
        this.amount_paid = amount_paid;
        this.credits_purchased = credits_purchased;
        this.price_per_credit = price_per_credit;
        this.transaction_code = transaction_code;
        this.is_completed = is_completed;
    }
}
