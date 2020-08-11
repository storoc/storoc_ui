import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../search-result.service';
import { ChangeDetectorRef } from '@angular/core';

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
  dataExists: Boolean;

  // Parsed server data
  current_occupancy: number;
  max_occupancy: number;

  maxDefined: Boolean = false;
  occupancyPercent: number;
  statusLabel: string;

  constructor(private searchResultService: SearchResultService, private chRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.searchResultService.currentPlaceData.subscribe((place) => {
      this.placeData = place;
      this.clearResults();
      this.chRef.detectChanges();
    });
    this.searchResultService.currentServerData.subscribe((data) => {
      this.serverData = data;
      if (this.serverData) {

        // Calculate occupancy percent
        this.occupancyPercent = Math.ceil((this.serverData.current_occupancy * 100) / data.max_occupancy);

        // Set status label
        if (this.occupancyPercent < 60) {
          this.statusLabel = "Low occupancy";
        } else {
          this.statusLabel = "High occupancy";
        }
      }
      this.chRef.detectChanges();
    });
    this.searchResultService.currentDataExists.subscribe((data) => {
      this.dataExists = data;
      this.chRef.detectChanges();
    });
  }

  clearResults() {
    this.occupancyPercent = null;
    this.current_occupancy = null;
    this.max_occupancy = null;
    this.chRef.detectChanges();
  }
}