export class CardExpirationHelper {

    private static months = [
        { key: '1', value: 'Janeiro' },
        { key: '2', value: 'Fevereiro' },
        { key: '3', value: 'Março' },
        { key: '4', value: 'Abril' },
        { key: '5', value: 'Maio' },
        { key: '6', value: 'Junho' },
        { key: '7', value: 'Julho' },
        { key: '8', value: 'Agosto' },
        { key: '9', value: 'Setembro' },
        { key: '10', value: 'Outubro' },
        { key: '11', value: 'Novembro' },
        { key: '12', value: 'Dezembro' }
    ];

    private static years = [
        2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032,
        2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040,
        2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048,
        2049, 2050
    ];

    public static getMonths() {
        return this.months;
    }

    public static getYears() {
        return this.years;
    }
}
