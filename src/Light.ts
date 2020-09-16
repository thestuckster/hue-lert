export class Light {
    public id: string;
    public name: string;
    public type: string;
    public on: boolean;
    public reachable: boolean;
    public brightness: number;
    public colorMode: string;
    public hue: string;
    public alert: string;
    public effect: string;

    constructor(id: string, name: string, type:string, on:boolean, reachable:boolean, brightness:number,
    colorMode:string, hue:string, alert:string, effect: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.on = on;
        this.reachable = reachable;
        this.brightness = brightness;
        this.colorMode = colorMode;
        this.hue = hue;
        this.alert = alert;
        this.effect = effect;
    }
}
