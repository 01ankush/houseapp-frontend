import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { RoomsService } from '../rooms.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.page.html',
  styleUrls: ['./room-details.page.scss'],
})
export class RoomDetailsPage implements OnInit {
  room: any; // Define the room property here
  coordinates: any;
  platform: any;
  googleMaps: any;

  constructor(private route: ActivatedRoute, private roomService: RoomsService,private http : HttpClient ,private router:Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const roomId = params.get('id');
      if (roomId) {
        this.roomService.getRoomDetails(roomId).subscribe((data: any) => {
          this.room = data;
  
          // Get coordinates for the room's location
          this.getCoordinatesForLocation(this.room.location).subscribe((geoData: any) => {
            if (geoData.results && geoData.results.length > 0) {
              this.coordinates = geoData.results[0].geometry.location;
            }
          });
        });
      }
    });
  }
  
  // navigateToStreetView() {
  //   if (this.room) {
  //     this.router.navigate(['/street-view', { roomId: this?.room?.roomId }]);
  //   }
  // }

  navigateToStreetView(roomId: string) {
    this.router.navigate(['/street-view', roomId]);
    console.log("detials " + roomId)
  //   this.route.paramMap.subscribe((params) => {
  //     const roomId = params.get('id');
  //     if (roomId) {
  //     this.router.navigate(['/street-view/:id'], {
  //       queryParams: { roomId: roomId },
  //     });
  //   }
  // });
}
  
 // Function to navigate to the room's location
 navigateToRoomLocation() {
  if (this.coordinates) {
    // Create a destination LatLng
    const destination = this.coordinates;

    // Check if the Google Maps native plugin is available
    if (this?.platform?.is('cordova')) {
      // Open the native Google Maps app for navigation
      this.googleMaps.getPlugin().then(() => {
        this.googleMaps.navigate({
          destination,
          start: '',
          transportMode: 'driving', // You can change the mode as needed
          launchMode: 'turn-by-turn',
        });
      });
    } else {
      // Handle navigation for non-cordova platforms (e.g., open Google Maps website)
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}`, '_system');
    }
  }
}


getCoordinatesForLocation(location: string): Observable<any> {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=YOUR_API_KEY`;

  return this.http.get(geocodingUrl);
}

}
