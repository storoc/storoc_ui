import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule} from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    SideBarComponent,
    MapComponent,
    FooterComponent,
    SearchBoxComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
