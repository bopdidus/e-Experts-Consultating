import { Component, OnInit } from '@angular/core';
import {TranslationService} from '../../../_services/translation/translation.service';
import { Router } from '@angular/router';
import {MainService } from '../../../_services/main.service';

@Component({
  selector: 'app-subscriber-dashboard',
  templateUrl: './subscriber-dashboard.component.html',
  styleUrls: ['./subscriber-dashboard.component.css']
})
export class SubscriberDashboardComponent implements OnInit {

   alphabet =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  domains:any;
  dataGot:any;
  lang:string;

  constructor(private translate: TranslationService, private router:Router, private mainService: MainService) {
    this.translate.useActive();
    this.lang = this.translate.getActiveLang()
  }

  ngOnInit(): void {
    this.mainService.loadExperts(this.lang).subscribe((res:any)=>{
      this.dataGot = res
      console.log(res)
      this.domains = this.dataGot;
    })
  }
  
  onSelectDomaine(id){
    console.log(id)
    this.router.navigate(['subscriber/experts', id])
  }
  filter(alpha){
    this.domains = this.dataGot;
    console.log(alpha)
    let list =this.domains.filter(x=> x.name.toUpperCase().startsWith(alpha.toUpperCase()))
     this.domains = list;
    console.log(list)
  }
}
