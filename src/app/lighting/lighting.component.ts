import { AfterViewInit, Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { InsertionPointDirective } from '../directives/insertionPoint';
import { DeviceType, Dispositivo } from '../models/dispositivo';
import { DispositiviServices } from 'src/services/dispositivi.service';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-lighting',
  templateUrl: './lighting.component.html',
  styleUrls: ['./lighting.component.css']
})
export class LightingComponent implements AfterViewInit {
  @ViewChild(InsertionPointDirective, { static: false }) insertionPoint!: InsertionPointDirective;
  dispositivi!: Dispositivo[];
  deviceTypes!: DeviceType[];
  dragEnabled = false
  constructor(
    private dispositiviServices: DispositiviServices,
    private mqttService: MqttService,
  ) {
    this.subscribeToTopic('device_status');
  }
  ngAfterViewInit(): void {
  }
  async ngOnInit(): Promise<void> {
    await this.loadDispositivi();
  }
  ondragEnabledChange() {

  }
  async loadDispositivi() {
    await this.loadDeviceTypes();
    try {
      var result = await (lastValueFrom(this.dispositiviServices.loadDispositivi()))
      // debugger
      this.dispositivi = result.devices
      // this.dispositivi.forEach(element => {
      //   this.statusDispositivo(element)
      // });
    } catch (error: any) {
      console.error('Errore nel caricamento dei dispositivi:', error);
    }
  }
  async loadDeviceTypes() {
    try {
      var result = await (lastValueFrom(this.dispositiviServices.loadDeviceTypes()))
      this.deviceTypes = result.deviceTypes
    } catch (error: any) {
      console.error('Errore nel caricamento dei dispositivi:', error);
    }
  }
  async saveDispositivo(d: any) {
    try {
      // debugger
      // Assicurati che `saveDispositivo` ritorni un Observable
      // `lastValueFrom` converte l'Observable in una Promise
      const result: any = await lastValueFrom(this.dispositiviServices.saveDispositivo(d));
      console.log(result);
    } catch (error: any) {
      console.error('Errore nel salvataggio del dispositivo:', error);
    }
  }
  subscribeToTopic(topic: string): void {
    this.mqttService.observe(topic).subscribe(async (message: IMqttMessage) => {
      var mex = message.payload.toString();
      let parts = mex.split('/');
      var id = parts[0]
      var val = parts[1]
      
      const dispositivo = this.dispositivi.find(d => d.id === id);
      if (dispositivo) {
        // console.log("trovato ", id)
        switch (val) {
          case "0":
            console.log(`Ricevuto stato: ${id} = ${val}`);
            dispositivo.status = parseInt(val, 10);
            break;
          case "1":
              console.log(`Ricevuto stato: ${id} = ${val}`);
              dispositivo.status = parseInt(val, 10);
              break;            
          case "9":
            dispositivo.status = 0;
            console.log("Benvenuto ", id)
            break;
          default:
            break;
        }

        await this.saveDispositivo(dispositivo)
      }
    });
  }
  publish(topic: string, mex: string) {
    this.mqttService.publish(topic, mex).subscribe({
      next: () => console.log('Message sent ', topic, ' valore ', mex),
      error: (error) => {
        console.log(error)
      },
    });
  }
  async dispClick(ev: any) {

    // console.log(ev);
    const dispositivo = this.dispositivi.find(bulb => bulb.id === ev);
    if (dispositivo) {
      // console.log("trovato ", ev)

      dispositivo.status = (dispositivo.status == 1) ? 0 : 1;

      this.publish(dispositivo.id + "/command", dispositivo.status.toString())

    }
  }
  imgDevice(dispositivo: Dispositivo) {

    const deviceType = this.deviceTypes.find(t => t.id === dispositivo.deviceType);
    if (dispositivo.status == 1) {
      return deviceType?.imageOn
    } else {
      return deviceType?.imageOff
    }
  }



  dragging = false;
  dragStartPosition = { x: 0, y: 0 };
  draggingDeviceId: string | null = null;
  hasMoved = false;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.dragging || !this.dragEnabled) return;
    this.hasMoved = true;
    event.preventDefault(); // Previene la selezione del testo durante il drag.
    const dispositivo = this.dispositivi.find(d => d.id === this.draggingDeviceId);
    if (dispositivo) {
      const dx = event.clientX - this.dragStartPosition.x;
      const dy = event.clientY - this.dragStartPosition.y;
      dispositivo.position.top += dy;
      dispositivo.position.left += dx;
      this.dragStartPosition = { x: event.clientX, y: event.clientY };
    }
  }

  @HostListener('document:mouseup', ['$event'])
  async onMouseUp(event: MouseEvent) {

    if ((this.dragging && !this.hasMoved) || !this.dragEnabled) {
      // Tratta come un click
      this.dispClick(this.draggingDeviceId);

    }

    if (this.dragging && this.dragEnabled) {
      this.dragging = false;
      this.hasMoved = false;
      const dispositivo = this.dispositivi.find(d => d.id === this.draggingDeviceId);
      if (dispositivo) {
        // Aggiorna la posizione del dispositivo qui se necessario, in base a come gestisci le coordinate
        // Esempio: dispositivo.position = {top: nuovoTop, left: nuovoLeft};
        await this.saveDispositivo(dispositivo); // Assicurati che questa funzione gestisca correttamente le promesse
      }
    }
  }

  startDrag(event: MouseEvent, deviceId: string) {
    event.preventDefault();
    this.dragging = true;
    this.draggingDeviceId = deviceId;
    this.dragStartPosition = { x: event.clientX, y: event.clientY };
  }




}
