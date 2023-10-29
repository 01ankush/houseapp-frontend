import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RoomsService } from '../rooms.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  allRooms:any
  originalLocation: any
  searchQuery: string = '';
  constructor(private sharedDataService: SharedDataService,private router : Router,private http : HttpClient,private navCtrl: NavController, private roomsService: RoomsService) {}
 

  ngOnInit(): void {
    const user = localStorage.getItem('User');
    if (user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      // Fetch initial data from the shared service
      this.sharedDataService.roomsData$.subscribe((data) => {
        this.allRooms = data;
        this.originalLocation = data;

       
      });
    }
  }
  

  ionViewDidEnter() {
     // Fetch room data when the homepage loads
     this.fetchRooms();
  }



    navigateToAddProperty() {
      this.router.navigateByUrl('/add-property');
    }
    



    fetchRooms() {
      this.roomsService.getRooms().subscribe(
        (data: any) => {
          // Update the shared service data
          this.sharedDataService.updateRoomsData(data);
          // Update the local data
          this.allRooms = data;
        },
        (error) => {
          console.error('Error fetching rooms', error);
        }
      );
    }

    onSearchInput(event: any) {
      this.searchQuery = event.target.value;
      if (this.searchQuery) {
        this.allRooms = this.originalLocation.filter((room: { location: string }) =>
          room.location.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.allRooms = this.originalLocation;
      }
    }




    navigateToRoomDetails(roomId: string) {
      this.router.navigate(['/room-details', roomId]);
      console.log(roomId)
      console.log("user navigating")
    }
    goToMapView() {
      this.router.navigate(['/map-view']); // 'map-view' is the path to your map view page
    }

    
}


 // ngOnInit(): void {
  //   const user = localStorage.getItem('User')
  //   if(user == null){
  //     this.router.navigateByUrl('/login',{replaceUrl : true})
  //   }else{
  //     this.http.get('http://localhost:3000/users').subscribe(res =>{
  //       this.allRooms = res;
  //       this.originalLocation = res;
  //       // Fetch room data when the homepage loads
  //   this.fetchRooms();
  //       // console.log(res)
  //     },error=>{
  //       console.log(error)
  //     })
  //     // console.log(JSON.parse(user))
  //   }
  // }


      // navigateToRoomDetails(roomId: string) {
    //   this.navCtrl.navigateForward(`/room-details/${roomId}`);
    // console.log(roomId);

    // }

        // fetchRooms() {
    //   this.roomsService.getRooms().subscribe(
    //     (data: any) => {
    //       this.allRooms = data;
    //       // console.log(this.allRooms)
    //     },
    //     (error) => {
    //       console.error('Error fetching rooms', error);
    //     }
    //   );
    // }

    