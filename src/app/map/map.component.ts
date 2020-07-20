import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchResultService } from '../search-result.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  
  map: google.maps.Map;
  lat = 42.2780;
  lng = -83.7382;
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 14,
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  })

  constructor(private searchResultService: SearchResultService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }

  changeLocation(lat: number, lng: number) {
    this.map.panTo({lat, lng});
    this.marker.setPosition({lat, lng});
    console.log('changeLocation() called with ', {lat, lng});
  }
}
