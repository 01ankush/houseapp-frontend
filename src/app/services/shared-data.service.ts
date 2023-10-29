import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private roomsDataSubject = new BehaviorSubject<any[]>([]);
  public roomsData$ = this.roomsDataSubject.asObservable();

  constructor() {}

  updateRoomsData(data: any) {
    this.roomsDataSubject.next(data);
  }
}
