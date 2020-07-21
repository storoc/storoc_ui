import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule} from '@agm/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MatIconModule } from '@angular/material/icon';

// Componenet imports
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { HeaderComponent } from './header/header.component';
import { environment } from 'src/environments/environment';
import { MobileHomeComponent } from './mobile-home/mobile-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideBarComponent,
    MapComponent,
    FooterComponent,
    SearchBoxComponent,
    SearchResultsComponent,
    AutocompleteComponent,
    HelpComponent,
    AboutComponent,
    HeaderComponent,
    MobileHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
    HttpClientModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
