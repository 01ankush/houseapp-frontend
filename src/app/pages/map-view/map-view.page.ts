import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { RoomsService } from 'src/app/rooms.service';

declare var google: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.page.html',
  styleUrls: ['./map-view.page.scss'],
})
export class MapViewPage {
  map: any;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef | undefined;
  infoWindows: any = [];
  markers: any[] = [];
  googleMaps: any;
  platform: any;

  constructor(private ngZone: NgZone, private roomsService: RoomsService) {} // Replace 'LocationService' with the service you use to fetch location data.

  ionViewDidEnter() {
    this.showMap();
  }

  ngOnInit() {
    // Fetch locations from your backend API
    // this.roomsService.fetchLocations().subscribe((locations: any[]) => {
    //   if (Array.isArray(locations)) {
    //     this.markers = locations;
    //     this.fetchCoordinatesAndShowOnMap();
    //   }
    // });



    // Fetch room data from your RoomService
    this.roomsService.getRooms().subscribe((rooms: any) => {
      this.markers = rooms;
      this.fetchCoordinatesAndShowOnMap();
    });
  }

  async fetchCoordinatesAndShowOnMap() {
    for (const location of this.markers) {
      try {
        const coordinates = await this.getCoordinatesForLocation(location.location);
        if (coordinates) {
          location.latitude = coordinates.lat;
          location.longitude = coordinates.lng;
          console.log( location.latitude,location.longitude);
          this.addMarkerToMap(location);
        }
      } catch (error) {
        console.error('Error fetching coordinates for location', error);
      }
    }
  }

  async getCoordinatesForLocation(location: string): Promise<any> {
    // Send a geocoding request to Google Maps API and return coordinates
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=YOUR_API_KEY`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return location;
      }
    } catch (error) {
      console.error('Error fetching coordinates', error);
      return null;
    }
  }

  addMarkerToMap(marker: any) {
    let position = new google.maps.LatLng(marker.latitude, marker.longitude);
    let mapMarker = new google.maps.Marker({
      position: position,
      title: marker.location,
    });

    mapMarker.setMap(this.map);
    this.addInfoWindowToMarker(mapMarker, marker);
  }

  addInfoWindowToMarker(marker: any, data: any) {
    const capitalizedLocation = data?.location?.charAt(0)?.toUpperCase() + data?.location?.slice(1);

    // Prefix a currency symbol (e.g., $) to the price
    const formattedPrice = `₹${data.price}`;

    let infoWindowContent = `
      <div id="content">
        <h2 id="firstHeading" class="firstHeading">${capitalizedLocation}</h2>
        <img src="${data.frontImage}" width="100" height="100">
        <p>Price: ${formattedPrice}</p>
        <p>Number of Rooms for Rent: ${data.numRoomsForRent}</p>
        <p>Latitude: ${data.latitude}</p>
        <p>Longitude: ${data.longitude}</p>
        <ion-button id="navigate">Navigate</ion-button>
      </div>
    `;


    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigate')?.addEventListener('click', () => {
          this.navigateToLocation(data?.latitude, data?.longitude);
        });
      });
    });

    this.infoWindows.push(infoWindow);
  }

  navigateToLocation(latitude: number, longitude: number) {
      console.log(latitude, longitude);
    let destination = new google.maps.LatLng(latitude, longitude);

    if (this?.platform?.is('cordova')) {
      this.googleMaps.getPlugin().then(() => {
        this.googleMaps.navigate({
          destination: destination,
          start: '',
          transportMode: 'driving',
          launchMode: 'turn-by-turn',
        });
      });
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_system');
    }
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    const location = new google.maps.LatLng(19.0759837, 72.8776559);
    const options = {
      center: location,
      zoom: 5,
      disableDefaultUI: true,
    };
    this.map = new google.maps.Map(this.mapRef?.nativeElement, options);
    this.addMarkerToMap(this.markers);
  }

  
}
