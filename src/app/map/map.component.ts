import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { SearchResultService } from '../search-result.service';
import PlaceResult = google.maps.places.PlaceResult;
import { InfoWindowManager } from '@agm/core';

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
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,

    scrollwheel: false,
    maxZoom: 20,
    minZoom: 5,
    zoom: 17,

    styles: [
      { 
        elementType: 'geometry', 
        stylers: [{ color: '#2f3037' }] 
      },
      { 
        elementType: 'labels.text.stroke', 
        stylers: [{ color: '#2f3037' }] 
      },
      { 
        elementType: 'labels.text.fill', 
        stylers: [{ color: '#746855' }] 
      },

      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },

      // Disable these points of interest
      { featureType: "administrative", stylers: [{visibility: "off"}]},
      { featureType: "landscape", stylers: [{visibility: "off"}]},
      { featureType: "poi.attraction", stylers: [{visibility: "off"}]},
      { featureType: "poi.government", stylers: [{visibility: "off"}]},
      { featureType: "poi.medical", stylers: [{visibility: "off"}]},
      { featureType: "poi.park", stylers: [{visibility: "off"}]},
      { featureType: "poi.place_of_worship", stylers: [{visibility: "off"}]},
      { featureType: "poi.sports_complex", stylers: [{visibility: "off"}]},
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#2f3737' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      }
    ]

  };

  // Mark location of interest
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map
  });

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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.map.setCenter(pos);
        }
      );
    }
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
