import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Enseignant} from '../model/enseignant.model';
import {Semestre} from '../model/semestre';
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
  private _sessionsFounded: Session[];
  // tslint:disable-next-line:variable-name
  private _sessionTrouve: Session;
  private _url = 'http://localhost:8090/absence-tracking/session/';
  constructor(private http: HttpClient) { }

  public findByLibelle(session: Session) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.get<Session>(this._url + 'libelle/' + session.libelle, {headers}).subscribe(
      (data) => {
        this.sessionFounded = data;
      },
    );
  }
  public async findByEnseignant(enseignant: Enseignant) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Session[]>(this._url + 'enseignant ' , enseignant, {headers}).toPromise().then(
      (data) => {
        this.sessionsFounded = data;
      },
    );
    console.log(this.sessionsFounded);
  }
  public async findByDateAndEnseignant(date: Date, enseignant: Enseignant) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Session>(this._url + 'dateAndEnseignant/dateStart/ ' + date, enseignant, {headers}).toPromise().then(
      (data) => {
        this.sessionTrouve = data;
      },
    );
    console.log(this.sessionsFounded);
  }
  public async findByDateAndSemestre(date: Date, semestre: Semestre) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Session>(this._url + 'dateAndSemestre/dateStart/' + date , semestre, {headers}).toPromise().then(
      (data) => {
        this.sessionTrouve = data;
      },
    );
    console.log(this.sessionsFounded);
  }
  public async findBySemestre(semestre: Semestre) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Session[]>(this._url + 'semestre' , semestre, {headers}).toPromise().then(
      (data) => {
        this.sessionsFounded = data;
      },
    );
    console.log(this.sessionsFounded);
  }
  public async findByTypeSession(typeSession: TypeSession) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Session[]>(this._url + 'typeSession' , typeSession, {headers}).toPromise().then(
      (data) => {
        this.sessionsFounded = data;
      },
    );
    console.log(this.sessionsFounded);
  }
  public async findByReference(reference: string) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Session>(this._url + 'reference/' + reference, {headers}).toPromise().then(
      (data) => {
        this.sessionFounded = data;
      },
    );
    console.log(this.sessionFounded);
  }
  public async findAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Session[]>(this._url, {headers}).toPromise().then(
      (data) => {
        this.sessions = data;
      },
    );
  }
  public deleteByReference(session: Session) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete<number>(this._url + 'reference/' + session.reference, {headers}).subscribe(
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
  public async update() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Session>(this._url + 'update', this.sessionFounded, {headers}).toPromise().then(
      (data) => {
        if (data) {
          this.deleteFromList(this.sessionFounded);
          this.sessions.push(this.clone(data));
          this.sessionFounded = data;
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  public async save() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Session>(this._url, this.session, {headers}).toPromise().then(
      (data) => {
        if (data) {
          console.log(this.session);
          this.sessions.push(this.clone(data));
          this.session = null;
          this.sessionFounded = data;
        }
      }, (error) => {
        console.log('error' + error);
      },
    );
  }
  private clone(session: Session) {
    const myclone = new Session();
    myclone.reference = session.reference;
    myclone.libelle = session.libelle ;
    myclone.dateStart = session.dateStart ;
    myclone.dateStop = session.dateStop ;
    myclone.typeSession = session.typeSession ;
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
    }
    if (this._sessionFounded.typeSession == null) {
      this._sessionFounded.typeSession = new TypeSession();
    }
    if (this._sessionFounded.typeSession.enseignant == null) {
      this._sessionFounded.typeSession.enseignant = new Enseignant();
    }

    return this._sessionFounded;
  }

  set sessionFounded(value: Session) {
    this._sessionFounded = value;
  }

  get sessionsFounded(): Session[] {
    if (this._sessionsFounded == null) {
      this._sessionsFounded = new Array<Session>();
    }
    return this._sessionsFounded;
  }

  set sessionsFounded(value: Session[]) {
    this._sessionsFounded = value;
  }

  get sessionTrouve(): Session {
    return this._sessionTrouve;
  }

  set sessionTrouve(value: Session) {
    this._sessionTrouve = value;
  }
}
