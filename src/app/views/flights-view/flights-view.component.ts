import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { LocationService } from '../../services/location.service';
import { ProcessFlightsService } from '../../services/process-flights.service';
import { DailyDealService } from '../../services/daily-deal.service';

import { DailyDeal } from '../../models/dailyDeal.model';
import { DiscountData } from '../../models/discountData.model';
import { Locations } from '../../models/locations.model';
import { FlightData } from '../../models/flightData.model';

@Component({
  selector: 'app-flights-view',
  templateUrl: './flights-view.component.html',
  styleUrls: ['./flights-view.component.css']
})
export class FlightsViewComponent implements OnInit {
  flightsForm: FormGroup;
  locationCtrl: FormControl;
  filteredLocations: Observable<any[]>;
  displayResults = false;
  displayArrivalResults = false;
  displayDepartureResults = false;
  displayReturnResults = false;
  displayFlightPicked = false;
  returnFlightType = true;
  oneWayFlightType = false;
  departureflightResults: object;
  returnFlightResults: object;
  flightData: FlightData[];
  loadingScreen = false;
  totalFlightsCost: number;
  totalFlightsSubtotal: number;
  totalFlightsTaxtotal: number;
  locations: Locations[] = [];
  flightsDataError = false;
  dailyDealData: DailyDeal;
  discountData: DiscountData;
  dailyDealError = false;

  selectOptions = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'}
  ];

  minDateDeparture = new Date();
  maxDateDeparture = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  minDateReturn = new Date();
  maxDateReturn = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  constructor(private fb: FormBuilder, private locationService: LocationService,
    private processFlightsService: ProcessFlightsService, private dailyDealService: DailyDealService) {
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
    this.flightsForm = new FormGroup({
      fromLocation: new FormControl('', Validators.required),
      toLocation: new FormControl('', Validators.required),
      departureDate: new FormControl('', Validators.required),
      returnDate: new FormControl('', Validators.required),
      ticketsAmt: new FormControl('', Validators.required)
    });
  }

  dateCheck() {
    if (this.oneWayFlightType) {
      return;
    }

    const hasValues = this.flightsForm.value.departureDate && this.flightsForm.value.returnDate;
    const invalidDates = this.flightsForm.value.departureDate >= this.flightsForm.value.returnDate;

    if (hasValues && invalidDates) {
      this.flightsForm.controls.returnDate.setErrors({
        invalidDates: true
      });
    }
  }

  locationPickerCheck() {
    const hasValues = this.flightsForm.value.fromLocation && this.flightsForm.value.toLocation;
    const invalidLocations = this.flightsForm.value.fromLocation === this.flightsForm.value.toLocation;

    if (hasValues && invalidLocations) {
      this.flightsForm.controls.toLocation.setErrors({
        invalidLocations: true
      });
    }
  }

  onSubmit() {
    const formData = this.createFlightFormPostData('departure', this.flightsForm.value);

    this.processFlightsService.getJSON(formData)
      .subscribe(
        data => { this.departureflightResults = data; },
        error => {  this.flightsDataError = true; }
      );

    this.displayResults = true;
    this.loadingScreen = true;

    setTimeout(function(e) {
      this.loadingScreen = false;
      this.displayDepartureResults = true;
    }.bind(this), 3000);
  }

  createFlightFormPostData(travelType: string, travelData: any): string {
    const flightParamString = '?type=' + travelType +
                        '&toLocation=' + travelData.fromLocation +
                        '&fromLocation=' + travelData.toLocation +
                        '&departureDate=' + travelData.departureDate +
                        '&returnDate=' + travelData.returnDate +
                        '&ticketsAmt=' + travelData.ticketsAmt;

    return flightParamString;
  }

  filterLocations(name: string) {
    return this.locations.filter(location =>
      location.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  pickDepartureFlight(flightId: string, flightDepartureData: FlightData) {
    this.displayDepartureResults = false;

    this.flightData = [ flightDepartureData ];

    if (this.returnFlightType) {
      this.loadingScreen = true;

      setTimeout(function(e) {
        this.loadingScreen = false;
        this.displayArrivalResults = true;
      }.bind(this), 3000);

      const formData = this.createFlightFormPostData('return', this.flightsForm.value);

      this.processFlightsService.getJSON(formData)
        .subscribe(
          data => { this.returnFlightResults = data; },
          error => { this.flightsDataError = true; }
        );

    } else {
      this.calculateFlightCosts();
      this.displayArrivalResults = false;
      this.displayFlightPicked = true;
    }

  }

  pickReturnFlight(flightId: string, flightReturnData: FlightData) {
    this.displayArrivalResults = false;
    this.displayFlightPicked = true;

    this.flightData.push(flightReturnData);

    this.calculateFlightCosts();
  }

  calculateFlightCosts() {
    const taxAmt = 0.15;
    const departureFlightCost = this.flightData[0].flightPrice ? this.flightData[0].flightPrice : 0;
    const returnFlightCost = this.flightData[1] ? this.flightData[1].flightPrice : 0;
    const ticketsAmt = this.flightsForm.value.ticketsAmt;

    // this.totalFlightsSubtotal = this.calculateDiscount((departureFlightCost + returnFlightCost) * ticketsAmt);
    this.calculateDiscount((departureFlightCost + returnFlightCost) * ticketsAmt);
    this.totalFlightsTaxtotal = (+this.totalFlightsSubtotal) * taxAmt;
    this.totalFlightsCost = (Math.round(this.totalFlightsSubtotal * 100) / 100)  + (Math.round(this.totalFlightsTaxtotal * 100) / 100);
  }

  changeFlightTypeReturn() {
    this.returnFlightType = true;
    this.oneWayFlightType = false;
    this.flightsForm.controls.returnDate.enable();
  }

  changeFlightTypeOneWay() {
    this.oneWayFlightType = true;
    this.returnFlightType = false;
    this.flightsForm.controls.returnDate.disable();
  }

  getReturnFlightType(): boolean {
    return this.returnFlightType;
  }

  calculateDiscount(subTotal: number) {
    if (!this.dailyDealError) {
      this.discountData = this.dailyDealService.calculateDiscount(this.dailyDealData, 'Flights', subTotal);
      this.totalFlightsSubtotal = this.discountData.newTotal;
    } else {
      this.totalFlightsSubtotal = subTotal;
    }
  }

}
