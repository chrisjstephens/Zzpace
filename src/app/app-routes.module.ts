import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeViewComponent } from './views/home-view/home-view.component';
import { HotelsViewComponent } from './views/hotels-view/hotels-view.component';
import { FlightsViewComponent } from './views/flights-view/flights-view.component';
import { TeleportationViewComponent } from './views/teleportation-view/teleportation-view.component';


const appRoutes: Routes = [
   { path: '', component: HomeViewComponent },
   { path: 'hotels', component: HotelsViewComponent },
   { path: 'flights', component: FlightsViewComponent },
   { path: 'teleportation', component: TeleportationViewComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutesModule {

}
