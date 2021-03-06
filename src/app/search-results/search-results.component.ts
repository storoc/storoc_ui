import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../search-result.service';
import { ChangeDetectorRef } from '@angular/core';

import PlaceResult = google.maps.places.PlaceResult;
import { Subscription, Observable, timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';

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
  loadingServerData: Boolean;

  // Parsed server data
  current_occupancy: number;
  max_occupancy: number;

  maxDefined: Boolean = false;
  occupancyPercent: number;
  statusLabel: string;

  // Refresh loaded data every 2 seconds
  autoRefresh: Subscription;

  constructor(private searchResultService: SearchResultService, private apiService: ApiService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.searchResultService.currentPlaceData.subscribe((place) => {
      this.placeData = place;
      this.chRef.detectChanges();
    });
    this.searchResultService.currentServerData.subscribe((data) => {
      this.serverData = data;
      this.updateSearchResults(data);
      this.chRef.detectChanges();
    });
    this.searchResultService.currentLoadingData.subscribe((val) => {
      this.loadingServerData = val;
      this.chRef.detectChanges();
    });

    const source = interval(1000);
    this.autoRefresh = source.subscribe(val => this.refreshResults());
  }

  ngOnDestroy() {
    this.autoRefresh && this.autoRefresh.unsubscribe();
  }

  resetFields() {
    this.current_occupancy = null;
    this.max_occupancy = null;
    this.occupancyPercent = null;
  }

  updateSearchResults(data) {
    this.resetFields();

    if (!data) {
      return;
    }

    if (data.current_occupancy) {
      this.current_occupancy = data.current_occupancy;
    }

    if (data.max_occupancy) {
      this.maxDefined = true;
      this.max_occupancy = data.max_occupancy;
    } else {
      this.maxDefined = false;
    }

    // Calculate occupancy percent and set status label
    if (this.current_occupancy && this.max_occupancy) {
      this.occupancyPercent = Math.ceil((this.current_occupancy * 100) / this.max_occupancy);

      // Set status label
      if (this.occupancyPercent < 60) {
        this.statusLabel = "Low occupancy";
      } else {
        this.statusLabel = "High occupancy";
      }
    }
    this.chRef.detectChanges();
  }

  // Refresh serverData
  refreshResults() {

    if (this.serverData) {
      this.searchResultService.refresh();
    }
  }
}