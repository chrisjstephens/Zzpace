import { Component, OnInit } from '@angular/core';

import { DailyDealService } from '../../services/daily-deal.service';

@Component({
  selector: 'app-daily-deal',
  templateUrl: './daily-deal.component.html',
  styleUrls: ['./daily-deal.component.css']
})
export class DailyDealComponent implements OnInit {
  dailyDealData: object;
  dailyDealError = false;

  constructor(private dailyDealService: DailyDealService) { }

  ngOnInit() {
    this.dailyDealService.getJSON()
      .subscribe(
        data => { this.dailyDealData = data; },
        error => {  this.dailyDealError = true; }
      );
  }
}
