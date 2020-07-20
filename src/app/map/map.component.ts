import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchResultService } from '../search-result.service';
import PlaceResult = google.maps.places.PlaceResult;
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

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
    this.searchResultService.currentPlaceData.subscribe((place) => {
      this.changeLocation(place);
    })
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }

  changeLocation(place: PlaceResult) {
    this.lat = place.geometry.location.lat();
    this.lng = place.geometry.location.lng();
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);


    this.map.panTo(this.coordinates);
    this.marker.setPosition(this.coordinates);
    console.log('changeLocation() called with ', this.coordinates);
  }
}
