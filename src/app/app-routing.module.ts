import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { MobileHomeComponent } from './mobile-home/mobile-home.component';

import { ApplicationStateService } from './application-state.service';

const desktop_routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
];

const mobile_routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: 'home', component: MobileHomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(desktop_routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor (
    private router: Router, 
    private applicationStateService: ApplicationStateService) {

      if (applicationStateService.getIsMobileResolution()) {
        router.resetConfig(mobile_routes);
      }
    }
}
