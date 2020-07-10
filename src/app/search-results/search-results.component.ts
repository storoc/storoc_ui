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

  placeResult: PlaceResult; // shared using SearchResultService
  occupancy: number = 1;        // current occupancy data

  constructor(private searchResultService: SearchResultService) {}

  ngOnInit() {
    this.searchResultService.currentPlaceResult.subscribe(placeResult => this.placeResult = placeResult)
  }
}
