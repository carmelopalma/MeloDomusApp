import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Injectable({
  providedIn: 'root'
})
export class SocketServices {
  constructor(
    private http: HttpClient,
    private mqttService: MqttService,

  ) {
    
  }
  messageToSend: string = "";
  messagesReceived: string = "";
  private sendData(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' });
  }
  turnOnTheSocket() {
    this.publish("/soggiorno/homeplug-001/command", "1")  
  }
  turnOffTheSocket() {
    this.publish("/soggiorno/homeplug-001/command", "0")    
  }
  publish(topic:string, mex:string){
    this.mqttService.publish(topic, mex).subscribe({
      next: () => console.log('Message sent ', mex),
      error: (error) => {
        console.log(error)
      },
    });
  }
  
}
