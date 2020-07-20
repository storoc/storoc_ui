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
  private dataExists = new BehaviorSubject<Boolean>(true);
  currentDataExists = this.dataExists.asObservable();

  constructor(private apiService: ApiService) {
  }

  // get location data from storoc server using api service
  public setLocationData(place_id: string) {
    this.apiService.getLocationData(place_id).subscribe(
      data => { this.serverDataSource.next(data); },
      err => console.error(err),
      () => { 
        console.log('done loading location data from storoc server');
        if (this.serverDataSource.getValue()) {
          this.dataExists.next(true);
        } else {
          this.dataExists.next(false);
        }
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
}