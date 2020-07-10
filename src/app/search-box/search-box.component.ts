import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { SearchResultService } from '../search-result.service';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

/* The search box component's job is to translate what a 
    user types into the search box into a PlaceResult from
    the Google Places API. If no PlaceResult is generated,
    for the text entered into the search box, then the 
    user is informed that there was no match for the 
    searched location.
*/
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  // shared using SearchResultService
  placeResult: PlaceResult;

  // Used by Google Maps
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;

  constructor(private apiService: ApiService, private searchResultService: SearchResultService) {}

  ngOnInit() {
    this.searchResultService.currentPlaceResult.subscribe(placeResult => this.placeResult = placeResult)
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
    this.setCurrentPosition();
  }

  // Set the user's current position
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  // When user selects an option from autocomplete 
  onAutocompleteSelected(result: PlaceResult) {
    this.searchResultService.changePlaceResult(result);
    console.log('this.searchResultService.placeResult', this.searchResultService.currentPlaceResult);
    console.log('onAutocompleteSelected DONE');
  }
}
