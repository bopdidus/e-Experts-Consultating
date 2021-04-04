import { Component, OnInit } from '@angular/core';
import {TranslationService} from '../../../_services/translation/translation.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-subscriber-layout',
  templateUrl: './subscriber-layout.component.html',
  styleUrls: ['./subscriber-layout.component.css']
})
export class SubscriberLayoutComponent implements OnInit {

  constructor(private translate: TranslationService, private webservice: WebsocketService) {
    this.translate.useActive();
  }

  ngOnInit(): void {
    this.webservice.newMessage().subscribe((data)=> this.updateNotification(data))
  }

  updateNotification(data:any){

  }
}
