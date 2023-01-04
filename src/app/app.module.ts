import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutesModule } from './app-routes.module';
import { AppComponent } from './app.component';
import { DailyDealComponent } from './components/daily-deal/daily-deal.component';
import { FlightsViewComponent } from './views/flights-view/flights-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { HotelsViewComponent } from './views/hotels-view/hotels-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import { TeleportationViewComponent } from './views/teleportation-view/teleportation-view.component';
import { UserComponent } from './views/user-view/user.component';
import { HeaderViewComponent } from './views/header-view/header-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlanetCardsComponent } from './components/planet-cards/planet-cards.component';

import { loginReducer, getStorageReducer } from './store/login.reducer';
import { LoginEffects } from './store/login.effects';

import { LocationService } from './services/location.service';
import { ProcessFlightsService } from './services/process-flights.service';
import { ProcessHotelsService } from './services/process-hotels.service';

export const metaReducers: MetaReducer<any>[] = [getStorageReducer];

@NgModule({
  declarations: [
    AppComponent,
    DailyDealComponent,
    HeaderViewComponent,
    HomeViewComponent,
    HotelsViewComponent,
    FlightsViewComponent,
    LoginViewComponent,
    RegisterViewComponent,
    PageNotFoundComponent,
    PlanetCardsComponent,
    TeleportationViewComponent,
    UserComponent
  ],
  imports: [
    AppRoutesModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    StoreModule.forRoot({login: loginReducer}, {metaReducers}),
    EffectsModule.forRoot([LoginEffects])
  ],
  providers: [LocationService, ProcessFlightsService, ProcessHotelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
