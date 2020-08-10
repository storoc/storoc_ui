import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.css']
})
export class SearchOverlayComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }


  postMax() {
    let obj = {
      place_id: 'ChIJ82TJ8MaxPIgRGd8xSBhWo54',
      max_occupancy: 5
    };
    console.log('posted new max');
    return this.httpClient.post('https://storoc.live/api/store_max', obj);
  }
}
