import { Component, OnInit } from '@angular/core';
import {APP_STARTING_YEAR, MONTHS_RESOURCES_NAMES} from '../../../_models/constants.interface';
import { MainService } from 'src/app/_services/main.service';
import { TokenStorageService } from 'src/app/_services/token-storage/token-storage.service';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {


    months = MONTHS_RESOURCES_NAMES;

  // ToDo: Change this to the correct api incoming data.
  data = MONTHS_RESOURCES_NAMES;

  selectedMonth = 1;

  startYear = 0;
  endYear = new Date().getFullYear();

  availableYears = [];

  constructor(private mainService: MainService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.loadDates()
    this.loadConsultations()
  }

  loadDates(){
    for (let i = 0; i < 10; i++) {
      this.availableYears.push(2021+i)  
    }
  }

 refresh(): void {
   console.log('Refreshing ...');
 }

 loadConsultations(){
  this.mainService.getConsultations().subscribe((res:any)=>{
    console.log(res)
  })
 }

}
