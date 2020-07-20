import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../search-result.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

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
  placeData: PlaceResult;
  serverData: any;

  constructor(private searchResultService: SearchResultService, private chRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.searchResultService.currentPlaceData.subscribe((place) => {
      this.placeData = place;
      this.chRef.detectChanges();
      console.log('place results placeData updated');
    });
    this.searchResultService.currentServerData.subscribe((data) => {
      this.serverData = data;
      this.chRef.detectChanges();
      console.log('place results serverData updated');
    });
  }
}