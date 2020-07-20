import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../search-result.service';
import PlaceResult = google.maps.places.PlaceResult;

/*
  The search-result component receives PlaceResults from
  the search-box component and updates the page to
  display the results that are returned from an API call
  to the storoc server.
*/
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  // All search result data taken from search result service
  placeData: PlaceResult;   // current place data
  serverData: any;          // current location data

  constructor(private searchResultService: SearchResultService) {}

  ngOnInit() {
    this.searchResultService.currentPlaceData.subscribe(placeData => this.placeData = placeData);
    this.searchResultService.currentServerData.subscribe(serverData => this.serverData = serverData);
  }
}