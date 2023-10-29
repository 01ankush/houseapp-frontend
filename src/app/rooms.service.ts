import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiURL = 'http://localhost:3000/users/rooms'; 
  roomsChanged: any;
  

  constructor(private http: HttpClient) { }
  getRooms() {
    // Replace 'your-api-endpoint' with your actual API endpoint
    return this.http.get('http://localhost:3000/users/rooms');
  }
  getRoomDetails(roomId: string) {
    const url = `${this.apiURL}/${roomId}`;
    console.log(this.http.get(url))
    return this.http.get(url);
  }
}
