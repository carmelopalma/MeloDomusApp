import { Component } from '@angular/core';
import { SocketServices } from 'src/services/SocketServices.service';

@Component({
  selector: 'app-light-bulb',
  templateUrl: './light-bulb.component.html',
  styleUrls: ['./light-bulb.component.css']
})
export class LightBulbComponent {
  currentIcon = 'assets/LampadinaSpenta.jpg';
  isOn = false;
  constructor(
    private socketServices: SocketServices,
    // private httpServices: SocketServices,
    ) { }
  toggleLight() {
    this.isOn = !this.isOn;
    switch (this.isOn) {
      case true:
        this.socketServices.turnOnTheSocket()
        break;
        case false:
          this.socketServices.turnOffTheSocket()
          break;
      default:
        break;
    }
    
  }
}
