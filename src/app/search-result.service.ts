import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Subject, Observable, interval } from 'rxjs';
import { ApiService } from './api.service';
import PlaceResult = google.maps.places.PlaceResult;

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {

  // Shared data
  private placeDataSource = new BehaviorSubject<PlaceResult>(null);
  currentPlaceData = this.placeDataSource.asObservable();
  private serverDataSource = new BehaviorSubject(null);
  currentServerData = this.serverDataSource.asObservable();
  private loadingDataSource = new BehaviorSubject<Boolean>(true);
  currentLoadingData = this.loadingDataSource.asObservable();

  constructor(private apiService: ApiService) {
  }

  // Get location data from storoc server using api service
  public setLocationData(place_id: string) {

    // Let search results know we're loading data
    this.loadingDataSource.next(true);

    // API call
    this.apiService.getLocationData(place_id).subscribe(
      data => { this.serverDataSource.next(data); },
      err => console.error(err),
      () => {
        console.log('Finished loading location data from storoc server');
        this.loadingDataSource.next(false);
      }
    );
  }

  // Change the current place by updating placeData and serverData
  changePlace(place: PlaceResult) {
    // Update place data
    this.placeDataSource.next(place);
    // Update server data
    this.setLocationData(place.place_id);
  }

  // Clear currently saved data
  clearData() {
    this.serverDataSource.next(null);
    this.placeDataSource.next(null);
  }

  refresh() {

    // API call
    if (this.placeDataSource.getValue()) {
      this.apiService.getLocationData(this.placeDataSource.getValue().place_id).subscribe(
        data => { this.serverDataSource.next(data); },
        err => console.error(err),
        () => {
          console.log('Finished loading UPDATED location data from storoc server');
          this.loadingDataSource.next(false);
        }
      );
    }

  }
}