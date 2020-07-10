import { Component } from '@angular/core';
import { SearchResultService } from '../search-result.service'
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SearchResultService],
})
export class HomeComponent {

  constructor() {}
}