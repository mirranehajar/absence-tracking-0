import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Session} from '../model/session';
import {TypeSession} from '../model/type-session';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  // tslint:disable-next-line:variable-name
  private _session: Session;
  // tslint:disable-next-line:variable-name
  private _sessions: Session[];
  // tslint:disable-next-line:variable-name
  private _sessionFounded: Session;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/session/';
  constructor(private http: HttpClient) { }

  public findByLibelle(session: Session) {
    this.http.get<Session>(this._url + 'libelle/' + session.libelle).subscribe(
      (data) => {
        this.sessionFounded = data;
      },
    );
  }
  public async findByReference(reference: string) {
    await this.http.get<Session>(this._url + 'reference/' + reference).toPromise().then(
      (data) => {
        this.sessionFounded = data;
      },
    );
    console.log(this.sessionFounded);
  }
  public async findAll() {
    await this.http.get<Session[]>(this._url).toPromise().then(
      (data) => {
        this.sessions = data;
      },
    );
  }
  public deleteByReference(session: Session) {
    this.http.delete<number>(this._url + 'reference/' + session.reference).subscribe(
      (data) => {
        this.deleteFromList(session);
      },
    );
  }
  public deleteFromList(session: Session) {
    const index = this.sessions.findIndex((e) => e.reference === session.reference);
    if (index !== -1) {
      this.sessions.splice(index, 1);
    }
  }
  public update() {
    this.http.post<number>(this._url + 'update', this.sessionFounded).subscribe(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.sessionFounded);
          this.sessions.push(this.clone(this.sessionFounded));
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  public save() {
    this.http.post<number>(this._url, this.session).subscribe(
      (data) => {
        if (data > 0) {
          console.log(this.session);
          this.sessions.push(this.clone(this.session));
          this.session = null;
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  private clone(session: Session) {
    const myclone = new Session();
    myclone.reference = session.reference;
    myclone.libelle = session.libelle ;
    myclone.dateStart = session.dateStart ;
    myclone.dateStop = session.dateStop ;
    myclone.groupes = session.groupes ;
    console.log(session.typeSession);
    myclone.typeSession = session.typeSession ;
    console.log(myclone.typeSession);
    return myclone;
  }
  get session(): Session {
    if (this._session == null) {
      this._session = new Session();
    }
    if (this._session.typeSession == null) {
      this._session.typeSession = new TypeSession();
    }
    return this._session;
  }

  set session(value: Session) {
    this._session = value;
  }

  get sessions(): Session[] {
    if (this._sessions == null) {
      this._sessions = new Array<Session>();
    }
    return this._sessions;
  }

  set sessions(value: Session[]) {
    this._sessions = value;
  }

  get sessionFounded(): Session {
    if (this._sessionFounded == null) {
      this._sessionFounded = new Session();
      if (this._sessionFounded.typeSession == null) {
        this._sessionFounded.typeSession = new TypeSession();
      }
    }
    return this._sessionFounded;
  }

  set sessionFounded(value: Session) {
    this._sessionFounded = value;
  }
}
