import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import PlaceResult = google.maps.places.PlaceResult;

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {

  private placeResultSource = new BehaviorSubject<PlaceResult>(null);
  currentPlaceResult = this.placeResultSource.asObservable();

  constructor() {}

  changePlaceResult(result: PlaceResult) {
    this.placeResultSource.next(result);
  }
}
