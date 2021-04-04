import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any
  readonly url:string;

  constructor() {
    //this.socket = io.connect(this.url);
   }

  newMessage(){
    return new Observable((subscriber)=>{
      this.socket.on('newMessage', (data)=>{
          subscriber.next(data)
      })
    })
  }
}
