import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.page.html',
  styleUrls: ['./add-property.page.scss'],
})
export class AddPropertyPage {

  property = {
    location: '',
    frontImage: '',
    propertyType: '',
    propertyCategory: '',
    price: null,
    numRoomsForRent: null,
    video: '',
    isHouse: false,
    isPG: false,
    isRoom: false,
    isResidential: false,
    isCommercial: false,
    contactDetails: {
      isOwner: false,
      isBroker: false,

    },
    phone: null,
    roomDetails: {
      bedrooms: null,
      bathrooms: null,
      balconies: null
    },
  };

  constructor(private http: HttpClient,private sharedDataService: SharedDataService) {}

  showSuccessMessage = false;

  updatePropertyType(propertyType: string) {
    // Set the selected property type to true and the others to false
    this.property.isHouse = propertyType === 'isHouse';
    this.property.isRoom = propertyType === 'isRoom';
    this.property.isPG = propertyType === 'isPG';
  }

  updatePropertyCategory(propertyCategory: string) {
    // Set the selected property category to true and the others to false
    this.property.isResidential = propertyCategory === 'isResidential';
    this.property.isCommercial = propertyCategory === 'isCommercial';
  }

  updateContactDetails(contactType: string) {
    if (contactType === 'isOwner') {
      this.property.contactDetails.isOwner = true;
      this.property.contactDetails.isBroker = false;
    } else if (contactType === 'isBroker') {
      this.property.contactDetails.isOwner = false;
      this.property.contactDetails.isBroker = true;
    }
  }
  

  detectLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
  
          // Use the obtained latitude and longitude
          this.fetchLocationDetails(lat, lng);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  
  fetchLocationDetails(lat: number, lng: number) {
    this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCIg58baI6932Ur5BAou6kk6ohg1uqSPtc`
      )
      .subscribe(
        (data: any) => {
          if (data.results.length > 0) {
            this.property.location = data.results[0].formatted_address;
          } else {
            console.log('Location not found');
          }
        },
        (error) => {
          console.error('Error fetching location details:', error);
        }
      );
  }
  
  postProperty() {
    // Implement the logic to post the property details to your backend
    // You can use Angular HTTP client to send a POST request to your backend

    // Example:
    this.http.post('http://localhost:3000/users/rooms', this.property).subscribe((response) => {
      console.log('Property posted successfully', response);
      this.showSuccessMessage = true;
    });

      // Fetch updated data and update the shared service
      this.http.get('http://localhost:3000/users').subscribe((res) => {
         this.sharedDataService.updateRoomsData(res);
      });

    // Reset the form fields
    this.property = {
      location: '',
      frontImage: '',
      propertyType: '',
      propertyCategory: '',
      price: null,
      numRoomsForRent: null,
      video: '',
      isHouse: false,
      isPG: false,
      isRoom: false,
      isResidential: false,
      isCommercial: false,
      contactDetails: {
        isOwner: false,
        isBroker: false
      },
      phone: null,
      roomDetails: {
        bedrooms: null,
        bathrooms: null,
        balconies: null
      },
    };
  }
}
