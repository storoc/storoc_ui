import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule} from '@angular/material/form-field';

const routes: Routes = [

  /* error handling */
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
