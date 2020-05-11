import { Injectable } from '@angular/core';
import {Session} from '../model/session';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // tslint:disable-next-line:variable-name
  private _session: Session;
  // tslint:disable-next-line:variable-name
  private _sessions: Array<Session>;
  // tslint:disable-next-line:variable-name
  private _sessionFounded: Session;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/seance/';
  constructor(private http: HttpClient) { }

  public findByLibelle(session: Session) {
    this.http.get<Session>(this._url + 'libelle/' + session.libelle).subscribe(
      data => {
        this.sessionFounded = data;
      }
    );
  }
  public findByReference(session: Session) {
    this.http.get<Session>(this._url + 'refrence/' + session.reference).subscribe(
      data => {
        this.sessionFounded = data;
      }
    );
  }
  public findAll() {
    this.http.get<Array<Session>>(this._url).subscribe(
      data => {
        this.sessions = data;
      }
    );
  }
  public deleteByReference(session: Session) {
    this.http.delete<number>(this._url + 'reference/' + session.reference).subscribe(
      data => {
        console.log(data);
        this.deleteFromList(session);
      }
    );
  }
  public deleteFromList(session: Session) {
    const index = this.sessions.findIndex(e => e.reference === session.reference);
    if (index !== -1) {
      this.sessions.splice(index, 1);
    }
  }
  public update() {
    this.http.put<number>(this._url, this._sessionFounded).subscribe(
      data => {
        if (data > 0) {
          this.deleteFromList(this._sessionFounded);
          this.sessions.push(this.clone(this.sessionFounded));
        }
      }, error => {
        console.log('error');
      }
    );
  }
  public save() {
    this.http.post<number>(this._url, this._session).subscribe(
      data => {
        if (data > 0) {
          this._sessions.push(this.clone(this.session));
          this.session = null;
        }
      }, error => {
        console.log('error');
      }
    );
  }
  private clone(session: Session) {
    const myclone = new Session();
    myclone.libelle = session.libelle ;
    myclone.dateStart = session.dateStart ;
    myclone.dateStop = session.dateStop ;
    myclone.groupes = session.groupes ;
    myclone.typeSession = session.typeSession ;
    return myclone;
  }
  get session(): Session {
    if (this._session == null) {
      this._session = new Session();
    }
    return this._session;
  }

  set session(value: Session) {
    this._session = value;
  }

  get sessions(): Array<Session> {
    if (this._sessions == null) {
      this._sessions = new Array<Session>();
    }
    return this._sessions;
  }

  set sessions(value: Array<Session>) {
    this._sessions = value;
  }

  get sessionFounded(): Session {
    return this._sessionFounded;
  }

  set sessionFounded(value: Session) {
    this._sessionFounded = value;
  }
}
