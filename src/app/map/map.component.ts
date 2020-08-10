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
    backgroundColor: '#2f3037',
    center: this.coordinates,
    clickableIcons: false,
    controlSize: 30,
    fullscreenControl: false,
    mapTypeControl: false,
    maxZoom: 20,
    minZoom: 5,
    scrollwheel: false,
    streetViewControl: false,
    zoom: 15,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
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
