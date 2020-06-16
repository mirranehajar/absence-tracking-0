import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.post<any>('http://localhost:8090/authenticate', {username, password}, {headers}).pipe(
      map(
        (userData) => {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);
          console.log(sessionStorage.getItem('username'));
          console.log(sessionStorage.getItem('password'));
          const tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        },
      ),

    );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log(sessionStorage.getItem('username'));
    console.log(sessionStorage.getItem('password'));
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('password');
  }
}
