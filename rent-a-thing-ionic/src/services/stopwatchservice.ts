export class StopWatchService {

    time: string;

    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    t: number;
    
    private constructor(days: number = null, hours: number = null, minutes: number = null, seconds: number = null) {
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
    
    public static createInstance(days: number = null, hours: number = null, minutes: number = null, seconds: number = null): StopWatchService {
        return new StopWatchService(days, hours, minutes, seconds);
    }

    public static createInstanceAndStart(days: number = null, hours: number = null, minutes: number = null, seconds: number = null): StopWatchService {
        let stopWatch = this.createInstance(days, hours, minutes, seconds);

        stopWatch.start();

        return stopWatch;
    }

    start() {
        this.t = setTimeout(() => {
            this.seconds++;
            if (this.seconds >= 60) {
                this.seconds = 0;
                this.minutes++;
                if (this.minutes >= 60) {
                    this.minutes = 0;
                    this.hours++;
                    if (this.hours >= 24) {
                        this.hours = 0;
                        this.days++;
                    }
                }
            }

            this.time = (this.days + (this.days == 1 ? " dia " : " dias ")) + (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") +
                ":" + (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") +
                ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);

            this.start();
        }, 1000);
    }
}
