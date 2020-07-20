import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { SearchResultService } from '../search-result.service';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

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

  placeData: PlaceResult;

  constructor(private searchResultService: SearchResultService, private chRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.searchResultService.currentPlaceData.subscribe((place) => {
      this.placeData = place;
      this.chRef.detectChanges();
      this.changeLocation(place);
    });
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.marker.setVisible(false);
  }

  changeLocation(place: PlaceResult) {
    if (this.coordinates && place) {
      this.coordinates = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
    }

    if (this.map) {
      this.map.panTo(this.coordinates);
    }

    if (this.marker) {
      this.marker.setPosition(this.coordinates);
      this.marker.setVisible(true);
    }
  }
}
