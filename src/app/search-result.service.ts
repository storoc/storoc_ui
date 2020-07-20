import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Subject, Observable } from 'rxjs';
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

  constructor(private apiService: ApiService) {}

  // Change the current place by updating placeData and serverData
  changePlace(result: PlaceResult) {

    // Update place data
    this.placeDataSource.next(result);

    // Update server data
    this.updateServerData(result.place_id);
  }

  getPlaceData() {
    return this.placeDataSource.asObservable();
  }

  getServerData() {
    return this.serverDataSource.asObservable();
  }

  // get location data from storoc server using api service
  updateServerData(place_id: string) {

    this.apiService.getLocationData(place_id).subscribe(
      data => { this.serverDataSource.next(data) },
      err => console.error(err),
      () => { 
        console.log('done loading location data from storoc server');
       }
    );
  }
}