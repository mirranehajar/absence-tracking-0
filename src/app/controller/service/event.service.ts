import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  getEvents() {
    return this.http.get<any>('/events.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }
}
