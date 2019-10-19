import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DailyDeal } from '../models/dailyDeal.model';
import { DiscountData } from '../models/discountData.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyDealService {

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
        return this.http.get(environment.BACKEND_ADDRESS + '/api/dailyDeals');
  }

  calculateDiscount(dailyDealData: DailyDeal, discountType: string, subTotal: number): DiscountData {
    // Calculate a discount based on daily deal, and whether end-user is booking a flight/hotel.
    let newTotal;
    let discountAmount = 0;

    if (dailyDealData.type === 'FirstDayOfTheMonth') {
      newTotal = subTotal * dailyDealData.discount;
    } else if (dailyDealData.type === discountType) {
      newTotal = subTotal * dailyDealData.discount;
    } else {
      newTotal = subTotal;
    }

    if (newTotal < subTotal) {
      discountAmount = subTotal - newTotal;
    }

    const discountDataObject = {
      newTotal: newTotal,
      discountAmount: discountAmount
    };

    return discountDataObject;
  }
}
