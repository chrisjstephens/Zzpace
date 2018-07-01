import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'

import { FlightsService } from "./flights-service.service";

export class Locations {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-flights-view',
  templateUrl: './flights-view.component.html',
  styleUrls: ['./flights-view.component.css']
})
export class FlightsViewComponent implements OnInit {
  flightsForm: FormGroup;
  locationCtrl: FormControl;
  filteredLocations: Observable<any[]>;
  displayResults: boolean = false;
  displayDepartureResults: boolean = false;
  displayReturnResults: boolean = false;
  displayFlightPicked: boolean = false;
  returnFlightType: boolean = true;
  oneWayFlightType: boolean = false;
  departureflightResults: object;
  flightData: object;
  totalFlightsCost: number;

  locations: Locations[] = [
    {
      name: 'Earth'
    },
    {
      name: 'Jupiter'
    },
    {
      name: 'Mars'
    },
    {
      name: 'Planet-X'
    }
  ];

  selectOptions = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'}
  ];

  minDate = new Date();
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  constructor(private fb: FormBuilder, private flightsService: FlightsService) {

    this.locationCtrl = new FormControl();
    this.filteredLocations = this.locationCtrl.valueChanges
      .pipe(
        startWith(''),
        map(location => location ? this.filterLocations(location) : this.locations.slice())
      );

    this.createForm();
  }

  ngOnInit() {
    // this.flightsService.getFlightStatus2().subscribe(
    //   data => console.log(data));
  }

  //TODO: Submit form results to service

  createForm() {
    console.log('form created');
    this.flightsForm = this.fb.group({
     fromLocation: '',
     toLocation: '',
     departureDate: '',
     returnDate: '',
     ticketsAmt: 0
   });
  }

  onSubmit() {
    //console.log('some results lol', this.someResults);
    console.log('form submit!', typeof(this.flightsForm.value));

    this.departureflightResults = this.flightsService.getFlightStatus(this.flightsForm.value);

    this.displayResults = true;
    this.displayDepartureResults = true;

  }

  filterLocations(name: string) {
    return this.locations.filter(location =>
      location.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  pickDepartureFlight(flightId: string, flightDepartureData: object) {
    this.displayDepartureResults = false;
    this.displayArrivalResults = true;

    this.flightData = [ flightDepartureData ];

    if (this.returnFlightType) {
      this.returnflightResults = this.flightsService.getReturnFlightStatus(this.flightsForm.value);
    } else {
      this.totalFlightsCost = (+this.flightData[0].flightPrice)
      this.displayArrivalResults = false;
      this.displayFlightPicked = true;
    }

    //this.displayFlightPicked = true;
    //
    // console.log('flight picked!', flightId);
    // console.log('flight picked data', flightData);
    // console.log('this.displayFlightPicked', this.displayFlightPicked);

  }

  pickReturnFlight(flightId: string, flightReturnData: object) {
    this.displayArrivalResults = false;
    this.displayFlightPicked = true;

    this.flightData.push(flightReturnData);

    this.totalFlightsCost = ((+this.flightData[0].flightPrice) + (+this.flightData[1].flightPrice)) * 1.15;
  }

  changeFlightType() {
    this.returnFlightType = !this.returnFlightType;
    this.oneWayFlightType = !this.oneWayFlightType;
  }
}
