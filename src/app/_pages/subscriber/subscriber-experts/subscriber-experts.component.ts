import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute,Router } from '@angular/router';
import {MainService } from '../../../_services/main.service';

@Component({
  selector: 'app-subscriber-experts',
  templateUrl: './subscriber-experts.component.html',
  styleUrls: ['./subscriber-experts.component.css']
})
export class SubscriberExpertsComponent implements OnInit {

  experts:any

  constructor(private route:ActivatedRoute, private router:Router,  private mainService: MainService) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.mainService.getExpertsforDomain(id).subscribe((res:any)=>{
      console.log(res)
      this.experts = res
      //console.log(res)
      //
    })
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  asc(){
    this.experts =this.experts.sort((a,b)=> a - b )
  }

  desc(){
    this.experts = this.experts.sort((a,b)=> b - a)
  }

  load(){
    
  }

  getExpert(id){
    this.router.navigate(['subscriber/expert-detail', id]);
  }
} 
