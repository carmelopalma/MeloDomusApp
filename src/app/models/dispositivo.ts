export class Dispositivo {
    id!: string;
    deviceType!: string;
    position!: { top: string; left: string; };
    status!: number;
    rotate!: number;
}
export class DeviceType {
    id!: string;
    imageOn!: string;
    imageOff!: string;    
}