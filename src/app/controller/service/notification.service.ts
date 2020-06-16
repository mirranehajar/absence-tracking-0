import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Absence} from '../model/absence';
import {Enseignant} from '../model/enseignant.model';
import {Etudiant} from '../model/etudiant.model';
import {Notification} from '../model/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // tslint:disable-next-line:variable-name
  private _notification: Notification;
  // tslint:disable-next-line:variable-name
  private _notifications: Notification[];
  // tslint:disable-next-line:variable-name
  private _notificationFounded: Notification;
  private _notificationsFounded: Notification[];
  private _deleteNotification: Notification;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/notification/';
  constructor(private http: HttpClient) { }

  public async findByEtudiant(etudiant: Etudiant) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Notification[]>(this._url + 'etudiant' , etudiant, {headers}).toPromise().then(
      (data) => {
        this.notificationsFounded = data;
      },
    );
  }
  public async findByAbsence(absence: Absence) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Notification>(this._url + 'absence' , absence, {headers}).toPromise().then(
      (data) => {
        this.notificationFounded = data;
      },
    );
  }
  public async findByEnseignant(enseignant: Enseignant) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Notification[]>(this._url + 'enseignant' , enseignant, {headers}).toPromise().then(
      (data) => {
        this.notificationsFounded = data;
      },
    );
  }
  public async findByState(state: string) {
    console.log('hani ldakhl tla fct');
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Notification[]>(this._url + 'state/' + state, {headers}).toPromise().then(
      (data) => {
        this.notificationsFounded = data;
        console.log(data);
      },
    );
  }
  public findAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.get<Notification[]>(this._url, {headers}).subscribe(
      (data) => {
        this.notifications = data;
      },
    );
  }
  public async deleteByAbsence(absence: Absence) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.delete<number>(this._url + '/absence/' + absence.ref, {headers}).toPromise().then(
      (data) => {
        console.log(data);
        this.findByAbsence(absence);
        this.deleteNotification = this.notificationFounded;
        this.deleteFromList(this.deleteNotification);
        this.notification = null;
      },
    );
  }
  public deleteFromList(notification: Notification) {
    const index = this.notifications.findIndex((n) => n.absence === notification.absence);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
  public async update() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<number>(this._url + 'update', this.notificationFounded, {headers}).toPromise().then(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.notificationFounded);
          this.notifications.push(this.clone(this.notificationFounded));
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  public async save() {
    console.log('wlh ta hani jit lsave');
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Notification>(this._url, this.notification, {headers}).toPromise().then(
      (data) => {
        if (data) {
          this.notifications.push(this.clone(data));
          this.notification = null;
        }
      }, (error) => {
        console.log('error');
      },
    );
    console.log('hani khrj mn save');
  }
  private clone(notification: Notification) {
    const myclone = new Notification();
    myclone.absence = notification.absence ;
    myclone.state = notification.state ;
    myclone.contenu = notification.contenu ;
    myclone.enseignant = notification.enseignant ;
    return myclone;
  }

  get notifications(): Notification[] {
    if (this._notifications == null) {
      this._notifications = new Array<Notification>();
    }
    return this._notifications;
  }

  set notifications(value: Notification[]) {
    this._notifications = value;
  }

  get notification(): Notification {
    if (this._notification == null) {
      this._notification = new Notification();
    }
    return this._notification;
  }

  set notification(value: Notification) {
    this._notification = value;
  }

  get notificationFounded(): Notification {
    return this._notificationFounded;
  }

  set notificationFounded(value: Notification) {
    this._notificationFounded = value;
  }

  get notificationsFounded(): Notification[] {
    if (this._notificationsFounded == null) {
      this._notificationsFounded = new Array<Notification>();
    }
    return this._notificationsFounded;
  }

  set notificationsFounded(value: Notification[]) {
    this._notificationsFounded = value;
  }

  get deleteNotification(): Notification {
    if (this._deleteNotification == null) {
      this._deleteNotification = new Notification();
    }
    return this._deleteNotification;
  }

  set deleteNotification(value: Notification) {
    this._deleteNotification = value;
  }
}
