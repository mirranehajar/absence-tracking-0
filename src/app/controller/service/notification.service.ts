import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Enseignant} from '../model/enseignant.model';
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
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/notification/';
  constructor(private http: HttpClient) { }

  public async findByEnseignant(enseignant: Enseignant) {
    await this.http.post<Notification[]>(this._url + 'enseignant' , enseignant).toPromise().then(
      (data) => {
        this.notificationsFounded = data;
      },
    );
  }
  public findByState(state: string) {
    this.http.get<Notification[]>(this._url + 'state/' + state).subscribe(
      (data) => {
        this.notificationsFounded = data;
      },
    );
  }
  public findAll() {
    this.http.get<Notification[]>(this._url).subscribe(
      (data) => {
        this.notifications = data;
      },
    );
  }
  public deleteByAbsence(notification: Notification) {
    this.http.delete<number>(this._url + '/' + notification.absence.ref).subscribe(
      (data) => {
        console.log(data);
        this.deleteFromList(notification);
      },
    );
  }
  public deleteFromList(notification: Notification) {
    const index = this.notifications.findIndex((n) => n.absence === notification.absence);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
  public update() {
    this.http.post<number>(this._url + 'update', this.notificationFounded).subscribe(
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
  public save() {
    this.http.post<Notification>(this._url, this.notification).subscribe(
      (data) => {
        if (data) {
          this.notifications.push(this.clone(data));
          this.notification = null;
        }
      }, (error) => {
        console.log('error');
      },
    );
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
    return this._notifications;
  }

  set notifications(value: Notification[]) {
    this._notifications = value;
  }

  get notification(): Notification {
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
    return this._notificationsFounded;
  }

  set notificationsFounded(value: Notification[]) {
    this._notificationsFounded = value;
  }
}
