import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeViewComponent } from './views/home-view/home-view.component';
import { HotelsViewComponent } from './views/hotels-view/hotels-view.component';
import { FlightsViewComponent } from './views/flights-view/flights-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { TeleportationViewComponent } from './views/teleportation-view/teleportation-view.component';
import { UserComponent } from './views/user-view/user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AuthGuardService } from './services/auth-guard.service';


const appRoutes: Routes = [
   { path: '', component: HomeViewComponent },
   { path: 'hotels', component: HotelsViewComponent },
   { path: 'login', component: LoginViewComponent },
   { path: 'flights', component: FlightsViewComponent },
   { path: 'teleportation', component: TeleportationViewComponent },
   { path: 'user', canActivate: [AuthGuardService], component: UserComponent },
   { path: '**',  component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutesModule {

}
