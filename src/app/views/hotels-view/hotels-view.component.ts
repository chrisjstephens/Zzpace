import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { LocationService } from '../../services/location.service';
import { ProcessHotelsService } from '../../services/process-hotels.service';
import { DailyDealService } from '../../services/daily-deal.service';

import { DailyDeal } from '../../models/dailyDeal.model';
import { DiscountData } from '../../models/discountData.model';
import { Locations } from '../../models/locations.model';

@Component({
  selector: 'app-hotels-view',
  templateUrl: './hotels-view.component.html',
  styleUrls: ['./hotels-view.component.css']
})
export class HotelsViewComponent implements OnInit {
  hotelsForm: FormGroup;
  locations: Locations[] = [];
  hotelsResults: object;
  hotelRoomTypeResults: object;
  hotelsDataError = false;
  displayResults = false;
  loadingScreen = false;
  displayHotelFirstResults = false;
  displayHotelSecondResults = false;
  displayFinalHotelResults = false;
  totalHotelsSubtotal: number;
  totalHotelsTaxtotal: number;
  totalHotelsCost: number;
  hotelRoomData: any;
  dailyDealData: DailyDeal;
  discountData: DiscountData;
  dailyDealError = false;

  minDateCheckIn = new Date();
  maxDateCheckIn = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  minDateCheckOut = new Date();
  maxDateCheckOut = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  constructor(private fb: FormBuilder, private locationService: LocationService,
    private processHotelsService: ProcessHotelsService, private dailyDealService: DailyDealService) {
    this.createForm();
  }

  ngOnInit() {
    this.locationService.getJSON().subscribe( data => {
      this.locations = data.locations;
    });

    this.dailyDealService.getJSON().subscribe(
      data => { this.dailyDealData = data; },
      error => { this.dailyDealError = true; }
    );
  }

  createForm() {
    this.hotelsForm = new FormGroup({
      hotelLocation: new FormControl('', Validators.required),
      checkInDate: new FormControl('', Validators.required),
      checkOutDate: new FormControl('', Validators.required)
    });
  }

  dateCheck() {
    const hasValues = this.hotelsForm.value.checkInDate && this.hotelsForm.value.checkOutDate;
    const invalidDates = this.hotelsForm.value.checkInDate >= this.hotelsForm.value.checkOutDate;

    if (hasValues && invalidDates) {
      this.hotelsForm.controls.checkOutDate.setErrors({
        invalidDates: true
      });
    }
  }

  createHotelFormPostData(travelData: any) {
    const hotelParamString = '?type=listHotels' +
                        '&hotelLocation=' + travelData.hotelLocation +
                        '&checkInDate=' + travelData.checkInDate +
                        '&checkOutDate=' + travelData.checkOutDate;

    return hotelParamString;
  }

  createHotelRoomTypeData(travelData: any) {
    const hotelRoomTypeString = '?type=getRoomType' +
                          '&hotelLocation=' + travelData.hotelLocation +
                          '&checkInDate=' + travelData.checkInDate +
                          '&checKOutDate=' + travelData.checkOutDate +
                          '&hotelName=' + travelData.hotelName +
                          '&hotelPrice= ' + travelData.price;

    return hotelRoomTypeString;
  }

  onSubmit() {
    const formData = this.createHotelFormPostData(this.hotelsForm.value);

    this.processHotelsService.getJSON(formData)
      .subscribe(
        data => { this.hotelsResults = data; },
        error => {  this.hotelsDataError = true; }
      );

      this.displayResults = true;
      this.loadingScreen = true;

      setTimeout(function(e) {
        this.loadingScreen = false;
        this.displayHotelFirstResults = true;
      }.bind(this), 3000);
    }


      pickHotel(hotelPicked: object) {
        this.displayHotelFirstResults = false;
        this.loadingScreen = true;

        const formData = this.createHotelRoomTypeData(hotelPicked);

        this.processHotelsService.getJSON(formData)
          .subscribe(
            data => { this.hotelRoomTypeResults = data; },
            error => { this.hotelsDataError = true; }
        );

        setTimeout(function(e) {
          this.loadingScreen = false;
          this.displayHotelSecondResults = true;
        }.bind(this), 3000);
      }

      pickHotelRoomType(hotelRoomData: object) {
        this.hotelRoomData = hotelRoomData;

        this.displayHotelSecondResults = false;
        this.loadingScreen = true;

        setTimeout(function(e) {
          this.loadingScreen = false;
          this.displayFinalHotelResults = true;
        }.bind(this), 3000);

        this.calculateHotelCosts();
      }

      calculateHotelCosts() {
        const hotelForm = this.hotelsForm.value;

        const taxAmt = 0.15;
        const hotelRoomCost = this.hotelRoomData.price;
        const hotelRoomNights = Math.floor((Date.parse(hotelForm.checkOutDate) - Date.parse(hotelForm.checkInDate)) / 86400000);

        this.calculateDiscount(hotelRoomCost * hotelRoomNights);
        this.totalHotelsTaxtotal = (+this.totalHotelsSubtotal) * taxAmt;
        this.totalHotelsCost = (Math.round(this.totalHotelsSubtotal * 100) / 100)  + (Math.round(this.totalHotelsTaxtotal * 100) / 100);
      }

      calculateDiscount(subTotal: number) {
        if (!this.dailyDealError) {
          this.discountData = this.dailyDealService.calculateDiscount(this.dailyDealData, 'Hotels', subTotal);
          this.totalHotelsSubtotal = this.discountData.newTotal;
        } else {
          this.totalHotelsSubtotal = subTotal;
        }
      }
}
