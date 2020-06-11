import {HttpClient} from '@angular/common/http';
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
    await this.http.post<Notification[]>(this._url + 'etudiant' , etudiant).toPromise().then(
      (data) => {
        this.notificationsFounded = data;
      },
    );
  }
  public async findByAbsence(absence: Absence) {
    await this.http.post<Notification>(this._url + 'absence' , absence).toPromise().then(
      (data) => {
        this.notificationFounded = data;
      },
    );
  }
  public async findByEnseignant(enseignant: Enseignant) {
    await this.http.post<Notification[]>(this._url + 'enseignant' , enseignant).toPromise().then(
      (data) => {
        this.notificationsFounded = data;
      },
    );
  }
  public async findByState(state: string) {
    console.log('hani ldakhl tla fct');
    await this.http.get<Notification[]>(this._url + 'state/' + state).toPromise().then(
      (data) => {
        this.notificationsFounded = data;
        console.log(data);
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
  public async deleteByAbsence(absence: Absence) {
    await this.http.delete<number>(this._url + '/absence/' + absence.ref).toPromise().then(
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
  public async save() {
    console.log('wlh ta hani jit lsave');
    await this.http.post<Notification>(this._url, this.notification).toPromise().then(
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
