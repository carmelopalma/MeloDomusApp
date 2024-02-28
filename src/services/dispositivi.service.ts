import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Dispositivo {
    id!: string;
    imageUrl!: string;
    position!: { top: string; left: string; };
    status!: number;
}

@Injectable({
  providedIn: 'root'
})
export class DispositiviServices {
  private baseUrl = 'https://192.168.11.123:3000'; // Assicurati che corrisponda all'URL del tuo server

  constructor(private http: HttpClient) { }

  loadDispositivi(): Observable<any> {
    return this.http.get(`${this.baseUrl}/devices`);
  }

  saveDispositivo(newDevice: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/save-device", newDevice);
  }
  loadDeviceTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/deviceTypes`);
  }
}
