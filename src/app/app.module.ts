import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LightBulbComponent } from './light-bulb/light-bulb.component';
import { LightingComponent } from './lighting/lighting.component';
import { InsertionPointDirective } from './directives/insertionPoint';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  // hostname: '192.168.11.37',
  // url: 'ws://192.168.11.37:1884',
  // clientId: 'angular-client',
  // username: 'brokermqtt',
  // password: 'cicciobello',

  hostname: '109.199.124.241', // o l'indirizzo IP del tuo broker MQTT se non in locale
  port: 9099, // Porta standard per MQTT su WebSocket (non SSL/TLS), può variare in base alla configurazione del broker
  path: '', // Percorso per la connessione WebSocket, dipende dalla configurazione del broker
  protocol: 'ws', // 'ws' per WebSocket, cambia in 'wss' per WebSocket Secure (se il tuo broker supporta SSL/TLS)

  };
@NgModule({
  declarations: [
    AppComponent,
    LightBulbComponent,
    LightingComponent,
    InsertionPointDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
