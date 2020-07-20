import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from '../api.service';
import { SearchResultService } from '../search-result.service';

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

  constructor(private searchResultService: SearchResultService) {}

  ngOnInit(): void {
  }

  // When user selects an option from autocomplete 
  onAutocompleteSelected(place: PlaceResult) {
    this.searchResultService.changePlace(place);
    console.log('onAutocompleteSelected()');
  }


}