import { Component, OnInit } from '@angular/core';
import { PlanetCardsService } from '../../services/planet-cards.service';

@Component({
  selector: 'app-planet-cards',
  templateUrl: './planet-cards.component.html',
  styleUrls: ['./planet-cards.component.css']
})
export class PlanetCardsComponent implements OnInit {
  planetCardsData: object;
  planetCardsError = false;

  constructor(private planetCardsService: PlanetCardsService) { }

  ngOnInit() {
    //Get data from api, and return 3 random results
    this.planetCardsService.getJSON()
      .subscribe(
        data => { this.planetCardsData = data.sort(() => Math.random() - 0.5).slice(0, 3); },
        error => {  this.planetCardsError = true; }
      );
  }

}
