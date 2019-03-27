import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule} from '@angular/cdk/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
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


@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ]

})
export class MaterialModule {}

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
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [LocationService, ProcessFlightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
