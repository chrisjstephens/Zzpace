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
    const dailyDeal = localStorage.getItem("dailyDeal");

    if (!dailyDeal) {
      this.dailyDealService.getJSON()
      .subscribe(
        data => {
          this.dailyDealData = data;
          localStorage.setItem("dailyDeal", JSON.stringify(this.dailyDealData));
        },
        error => {  
          this.dailyDealError = true; 
          localStorage.remove("dailyDeal");
        }
      );
    } else {
      this.dailyDealData = JSON.parse(dailyDeal);
    }
    
  }
}
