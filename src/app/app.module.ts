import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppMaterialModule } from './modules/app-material/app-material.module';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutesModule } from './app-routes.module';
import { AppComponent } from './app.component';
import { FlightsViewComponent } from './views/flights-view/flights-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { HotelsViewComponent } from './views/hotels-view/hotels-view.component';
import { TeleportationViewComponent } from './views/teleportation-view/teleportation-view.component';
import { HeaderViewComponent } from './views/header-view/header-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { LocationService } from './services/location.service';
import { ProcessFlightsService } from './services/process-flights.service';
import { ProcessHotelsService } from './services/process-hotels.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderViewComponent,
    HomeViewComponent,
    HotelsViewComponent,
    FlightsViewComponent,
    PageNotFoundComponent,
    TeleportationViewComponent
  ],
  imports: [
    AppRoutesModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [LocationService, ProcessFlightsService, ProcessHotelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
