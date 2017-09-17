export class EndpointHelper {
    private static remote_endpoint: string = 'http://192.168.0.104:8087/';
    private static local_endpoint: string = 'http://localhost:8087/';

    public static isLocal: boolean = false;

    public static getEndpoint(): string { return this.isLocal ? this.local_endpoint : this.remote_endpoint; }
}
