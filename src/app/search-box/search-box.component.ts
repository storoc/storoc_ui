import { Component, Output, EventEmitter } from '@angular/core';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  
  // to be updated by onAutocompleteSelected()
  selectedPlace: PlaceResult;

  // used by google maps
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;

  @Output() selectedPlaceEvent = new EventEmitter<PlaceResult>();
  constructor() { }

  ngOnInit() {

    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;

    this.setCurrentPosition();
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.selectedPlace = result;
    this.selectedPlaceEvent.emit(this.selectedPlace);
    console.log('this.selectedPlace: ', this.selectedPlace);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  
}
