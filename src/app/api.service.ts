import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://52.168.148.0/api';
  apiUrlAppended: string;

  constructor(private httpClient: HttpClient) { }

  public getLocationData(place_id: string) {

    // api call to server
    // returns an Observable of LocationData
    this.apiUrlAppended = this.apiUrl + '?unique_id=' + place_id;
    console.log('made api call to ', this.apiUrlAppended);
    return this.httpClient.get(this.apiUrlAppended);
  }
}
