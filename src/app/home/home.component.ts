import { Component } from '@angular/core';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  api_url = 'http://52.168.148.0/api';
  api_url_appended: string;

  // temporary for testing
  selectedPlace: PlaceResult;

  // retrieved from google maps autocomplete
  resultPlaceName: string;
  resultPlaceAddress: string;
  resultPlaceId: string;

  // fetched from server
  resultPlaceOccupancy: number;

  constructor() {}

  receivePlace($event) {
    this.selectedPlace = $event
    this.fetchPlaceInfo(this.selectedPlace.place_id)

  }

  async fetchPlaceInfo(place_id: string) {

    // api call to server
    console.log('place_id: ', place_id);
    this.api_url_appended = this.api_url + '?unique_id=' + place_id;
    console.log('api_url_appended:', this.api_url_appended);
    let response = await fetch(this.api_url_appended);
    console.log('response.json()', response.json());

    // convert response
    const store = await response.json();
    console.log(store);
    document.getElementById("current_occupancy").textContent = store.current_occupancy;
  }
}