import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TypeSession} from '../model/type-session';

@Injectable({
  providedIn: 'root',
})
export class TypeSessionService {
// tslint:disable-next-line:variable-name
  private _typeSession: TypeSession;
  // tslint:disable-next-line:variable-name
  private _typeSessions: TypeSession[];
  // tslint:disable-next-line:variable-name
  private _typeSessionFounded: TypeSession;
  private _typeSessionsFounded: TypeSession[];
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/typeSession/';
  constructor(private http: HttpClient) { }

  public findByModule(typeSession: TypeSession) {
    this.http.post<TypeSession>(this._url + 'module/' , typeSession.module).subscribe(
      (data) => {
        this.typeSessionFounded = data;
      },
    );
  }
  public findBySubject(typeSession: TypeSession) {
    this.http.post<TypeSession>(this._url + 'subject/' , typeSession.subject).subscribe(
      (data) => {
        this.typeSessionFounded = data;
      },
    );
  }
  public findByLibelle(typeSession: TypeSession) {
    this.http.get<TypeSession>(this._url + 'libelle/' + typeSession.libelle).subscribe(
      (data) => {
        this.typeSessionFounded = data;
      },
    );
  }
  public findByReference(typeSession: TypeSession) {
    this.http.get<TypeSession>(this._url + 'reference/' + typeSession.reference).subscribe(
      (data) => {
        this.typeSessionFounded = data;
      },
    );
  }
  public findAll() {
    this.http.get<TypeSession[]>(this._url).subscribe(
      (data) => {
        this.typeSessions = data;
      },
    );
  }
  public deleteByReference(typeSession: TypeSession) {
    this.http.delete<number>(this._url + 'reference/' + typeSession.reference).subscribe(
      (data) => {
        console.log(data);
        this.deleteFromList(typeSession);
      },
    );
  }
  public deleteFromList(typeSession: TypeSession) {
    const index = this.typeSessions.findIndex((e) => e.reference === typeSession.reference);
    if (index !== -1) {
      this.typeSessions.splice(index, 1);
    }
  }
  public update() {
    this.http.post<number>(this._url + 'update', this.typeSessionFounded).subscribe(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.typeSessionFounded);
          this.typeSessions.push(this.clone(this.typeSessionFounded));
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  public save() {
    this.http.post<number>(this._url, this.typeSession).subscribe(
      (data) => {
        if (data > 0) {
          this.typeSessions.push(this.clone(this.typeSession));
          this.typeSession = null;
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  private clone(typeSession: TypeSession) {
    const myclone = new TypeSession();
    myclone.libelle = typeSession.libelle ;
    myclone.enseignant = typeSession.enseignant ;
    myclone.module = typeSession.module ;
    myclone.subject = typeSession.subject ;
    return myclone;
  }
  get typeSession(): TypeSession {
    if (this._typeSession == null) {
      this._typeSession = new TypeSession();
    }
    return this._typeSession;
  }

  set typeSession(value: TypeSession) {
    this._typeSession = value;
  }

  get typeSessions(): TypeSession[] {
    if (this._typeSessions == null) {
      this._typeSessions = new Array<TypeSession>();
    }
    return this._typeSessions;
  }

  set typeSessions(value: TypeSession[]) {
    this._typeSessions = value;
  }

  get typeSessionFounded(): TypeSession {
    return this._typeSessionFounded;
  }

  set typeSessionFounded(value: TypeSession) {
    this._typeSessionFounded = value;
  }

  get typeSessionsFounded(): TypeSession[] {
    return this._typeSessionsFounded;
  }

  set typeSessionsFounded(value: TypeSession[]) {
    this._typeSessionsFounded = value;
  }
}
