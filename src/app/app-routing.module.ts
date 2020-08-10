import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { ApplicationStateService } from './application-state.service';
import { LoginComponent } from './login/login.component';

const desktop_routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

const mobile_routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
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
        // if mobile routes exist, uncomment this line
        // router.resetConfig(mobile_routes);
      }
    }
}
