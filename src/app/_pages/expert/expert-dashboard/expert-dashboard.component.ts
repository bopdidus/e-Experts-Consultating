import { Component, OnInit } from '@angular/core';
import {TranslationService} from '../../../_services/translation/translation.service';

@Component({
  selector: 'app-expert-dashboard',
  templateUrl: './expert-dashboard.component.html',
  styleUrls: ['./expert-dashboard.component.css']
})
export class ExpertDashboardComponent implements OnInit {

  constructor(private translate: TranslationService) {
    this.translate.useActive();
  }

  ngOnInit(): void {
  }

}
