import { Component, OnInit } from '@angular/core';
import {APP_STARTING_YEAR, MONTHS_RESOURCES_NAMES} from '../../../_models/constants.interface';

@Component({
  selector: 'app-subscriber-consultations',
  templateUrl: './subscriber-consultations.component.html',
  styleUrls: ['./subscriber-consultations.component.css']
})
export class SubscriberConsultationsComponent implements OnInit {
  months = MONTHS_RESOURCES_NAMES;

  // ToDo: Change this to the correct api incoming data.
  data = MONTHS_RESOURCES_NAMES;

  /**
   * Index of the month currently used as filter.
   */
  selectedMonth = 1;

  startYear = 0;
  endYear = new Date().getFullYear();

  availableYears = [];

  constructor() { }

  ngOnInit(): void {
    this.startYear = this.endYear === APP_STARTING_YEAR ? this.endYear : this.endYear - 1;

    const diff = this.endYear - APP_STARTING_YEAR + 1;
    for (let i = 0; i < diff; i++) {
      this.availableYears.unshift(this.startYear + i);
    }
  }

  /**
   * Reload view data from the api and apply them to the view.
   */
  refresh(): void {
    console.log('Refreshing ...');
  }

  /**
   * Handles month filter changes.
   *
   * @param index [1-12] position of the month used to filter.
   */
  setCurrentMonth(index: number): void {
    // Prevent execution if actually selected month is the given index
    if (this.selectedMonth === index) { return; }

    this.selectedMonth = index;

    this.refresh();
  }
}
