import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Enseignant} from '../model/enseignant.model';
import {Module} from '../model/module';
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
  private _typeSessionsConnected: TypeSession[];
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/typeSession/';
  constructor(private http: HttpClient) { }

  public async findByModule(module: Module) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<TypeSession[]>(this._url + 'module' , module, {headers}).toPromise().then(
      (data) => {
        this.typeSessionsFounded = data;
        console.log(this.typeSessionsFounded);
      },
    );
  }
  public async findByEnseignant(enseignant: Enseignant) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<TypeSession[]>(this._url + 'enseignant' , enseignant, {headers}).toPromise().then(
      (data) => {
        this.typeSessionsFounded = data;
        console.log(this.typeSessionsFounded);
      },
    );
  }
  public findBySubject(typeSession: TypeSession) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.post<TypeSession>(this._url + 'subject/' , typeSession.subject, {headers}).subscribe(
      (data) => {
        this.typeSessionFounded = data;
      },
    );
  }
  public findByLibelle(typeSession: TypeSession) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.get<TypeSession>(this._url + 'libelle/' + typeSession.libelle, {headers}).subscribe(
      (data) => {
        this.typeSessionFounded = data;
      },
    );
  }
  public findByReference(typeSession: TypeSession) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.get<TypeSession>(this._url + 'reference/' + typeSession.reference, {headers}).subscribe(
      (data) => {
        this.typeSessionFounded = data;
      },
    );
  }
  public async findAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<TypeSession[]>(this._url, {headers}).toPromise().then(
      (data) => {
        this.typeSessions = data;
      },
    );
  }
  public async deleteByReference(typeSession: TypeSession) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.delete<number>(this._url + 'reference/' + typeSession.reference, {headers}).toPromise().then(
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
  public async update() {
    console.log('haha');
    this.typeSessionsFounded = this.typeSessionFounded.module.typeSessions;
    this.typeSessionFounded.module.typeSessions = null;
    console.log(this.typeSessionsFounded);
    console.log(this.typeSessionFounded);
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<number>(this._url + 'update', this.typeSessionFounded, {headers}).toPromise().then(
      (data) => {
        if (data > 0) {
          console.log('hoho');
          this.deleteFromList(this.typeSessionFounded);
          this.typeSessions.push(this.clone(this.typeSessionFounded));
        }
      }, (error) => {
        console.log('error');
      },
    );
    this.typeSessionFounded.module.typeSessions = this.typeSessionsFounded;
  }
  public async save() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<number>(this._url, this.typeSession, {headers}).toPromise().then(
      (data) => {
        if (data > 0) {
          this.typeSessions.push(this.clone(this.typeSession));
          this.typeSession = null;
        }
      }, (error) => {
        console.log(error);
      },
    );
  }
  private clone(typeSession: TypeSession) {
    const myclone = new TypeSession();
    myclone.libelle = typeSession.libelle ;
    myclone.enseignant = typeSession.enseignant ;
    myclone.module = typeSession.module ;
    myclone.subject = typeSession.subject ;
    myclone.groupes = typeSession.groupes ;
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
    if (this._typeSessionsFounded == null) {
      this._typeSessionsFounded = new Array<TypeSession>();
    }
    return this._typeSessionsFounded;
  }

  set typeSessionsFounded(value: TypeSession[]) {
    this._typeSessionsFounded = value;
  }
}
