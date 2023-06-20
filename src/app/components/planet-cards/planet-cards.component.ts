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
    // Get data from api, and return 3 random results
    const planetCards = localStorage.getItem("planetCards");

    if (!planetCards) {
      this.planetCardsService.getJSON()
      .subscribe(
        data => { 
          this.planetCardsData = data.sort(() => Math.random() - 0.5).slice(0, 3); 
          localStorage.setItem("planetCards", JSON.stringify(this.planetCardsData));
        },
        error => { 
          this.planetCardsError = true; 
          localStorage.remove("planetCards");
        }
      );
    } else {
      this.planetCardsData = JSON.parse(planetCards);
    }
    
  }

}
