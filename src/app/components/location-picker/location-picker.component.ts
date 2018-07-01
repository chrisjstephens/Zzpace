import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})

export class LocationPickerComponent implements OnInit {
  //TODO: From must not be same as To

  @Input() private placeholder: string;
  @Input() private formControlName: string;

  locationCtrl: FormControl;
  stateCtrl: FormControl;
  filteredLocations: Observable<any[]>;
  filteredStates: Observable<any[]>;

  locations: [
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

  ngOnInit() {

  }

  constructor() {
    this.locationCtrl = new FormControl();
    this.filteredLocations = this.locationCtrl.valueChanges
      .pipe(
        startWith(''),
        map(location => location ? this.filterLocations(location) : this.locations.slice())
      );
      console.log('formCtrlName', this.formControlName);
  }

  filterLocations(name: string) {
    return this.locations.filter(location =>
      location.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
