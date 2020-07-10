import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://52.168.148.0/api';
  apiUrlAppended: string;

  constructor(private httpClient: HttpClient) { }
  
  public getPlaceData(place_id: string) {

    // api call to server
    console.log('place_id: ', place_id);
    this.apiUrlAppended = this.apiUrl + '?unique_id=' + place_id;
    console.log('api_url_appended:', this.apiUrlAppended);
    return this.httpClient.get(this.apiUrlAppended);
  }
}
