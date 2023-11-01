import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from 'src/app/rooms.service';

declare var google: any;

@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.page.html',
  styleUrls: ['./street-view.page.scss'],
})
export class StreetViewPage implements OnInit {
  @ViewChild('streetViewContainer') streetViewContainer: any;
  markers: any;
  roomid : any;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private router: Router
  ) {
    
  }

   ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const roomId = params.get('id');
      this.roomid = roomId;
      if (roomId) {
        // Now you have the roomId in the StreetViewPage
        console.log(roomId)
        this.roomService.getRoomDetails(roomId).subscribe((data: any) => {
          this.markers = data.location;
          console.log(this.markers)
          this.fetchCoordinatesAndShowOnMap(this.markers);
        });
      }
    });
  }

  async fetchCoordinatesAndShowOnMap(markers: any) {
      try {
        const coordinates = await this.getCoordinatesForLocation(markers);
        if (coordinates) {
          // location.latitude = coordinates.lat;
          // location.longitude = coordinates.lng;
          console.log(coordinates.lat, coordinates.lng);
          this.loadStreetView(coordinates);
        }
      } catch (error) {
        console.error('Error fetching coordinates for location', error);
      }
    
  }

  async getCoordinatesForLocation(location: string): Promise<any> {
    // Send a geocoding request to Google Maps API and return coordinates
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location
    )}&key=YOUR_API_KEY`;

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

  loadStreetView(location: any) {
    if (
      location &&
      typeof location.lat === 'number' &&
      typeof location.lng === 'number'
    ) {
      console.log(location.lat, location.lng)
      const position = { lat: location.lat, lng: location.lng };
      const panorama = new google.maps.StreetViewPanorama(
        document.getElementById('street-view'),
        {
          position,
          pov: { heading: 165, pitch: 0 },
        }
      );
    } else {
      // Handle the case where coordinates are not available or valid
      console.error('Invalid coordinates:', location);
    }
  }
}
