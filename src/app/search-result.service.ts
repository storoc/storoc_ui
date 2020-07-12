import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import PlaceResult = google.maps.places.PlaceResult;
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {

  // PlaceResult returned from Google Places API
  private placeResultSource = new BehaviorSubject<PlaceResult>(null);
  currentPlaceResult = this.placeResultSource.asObservable();

  // LocationData returned from storoc server
  private locationDataSource = new BehaviorSubject(null);
  currentLocationData = this.locationDataSource.asObservable();

  constructor(private apiService: ApiService) {}

  // update the current search result data
  updateSearchResult(result: PlaceResult) {
    // update placeResult
    this.placeResultSource.next(result);
    // update location data
    this.getLocationData(result.place_id);
  }

  // get location data from storoc server using api service
  getLocationData(place_id: string) {

    this.apiService.getLocationData(place_id).subscribe(
      data => { this.locationDataSource.next(data) },
      err => console.error(err),
      () => { console.log('done loading location data from storoc server') }
    );
  }
}
