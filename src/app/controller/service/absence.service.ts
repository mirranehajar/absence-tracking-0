import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Absence} from '../model/absence';
import {Etudiant} from '../model/etudiant.model';
import {Module} from '../model/module';
import {Session} from '../model/session';
import {SessionEtudiant} from '../model/sessionEtudiant';
import {TypeSession} from '../model/type-session';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  // tslint:disable-next-line:variable-name
  private _absence: Absence;
  // tslint:disable-next-line:variable-name
  private _absences: Absence[];
  // tslint:disable-next-line:variable-name
  private _absenceFounded: Absence;
  private _absencesFounded: Absence[];
  private _absencesEtudiant: Absence[];
  // tslint:disable-next-line:variable-name
  private _sessionEtudiant: SessionEtudiant;
  private _boolean: boolean;
  private _url = 'http://localhost:8090/absence-tracking/absence/';
  constructor(private http: HttpClient) { }

  public async findBySessionAndEtudiant(session: Session, etudiant: Etudiant) {
    this.sessionEtudiant.session = session;
    this.sessionEtudiant.etudiant = etudiant;
    console.log(this.sessionEtudiant);
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Absence>(this._url + 'sessionEtudiant' , this.sessionEtudiant, {headers}).toPromise().then(
      (data) => {
        this.absenceFounded = data;
        if (data == null) {
          this.boolean = false;
        }
        console.log(this.absenceFounded);
      },
    );
  }
  public async findByTypeSession(typeSession: TypeSession) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Absence[]>(this._url + 'typeSession' , typeSession, {headers}).toPromise().then(
      (data) => {
        this.absencesFounded = data;
      },
    );
  }
  public async findByModule(module: Module) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Absence[]>(this._url + 'module' , module, {headers}).toPromise().then(
      (data) => {
        this.absencesFounded = data;
      },
    );
  }
  public async findBySession(session: Session) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Absence[]>(this._url + 'session' , session, {headers}).toPromise().then(
      (data) => {
        this.absencesFounded = data;
      },
    );
  }
  public async findByEtudiant(etudiant: Etudiant) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Absence[]>(this._url + 'etudiant' , etudiant, {headers}).toPromise().then(
      (data) => {
        this.absencesFounded = data;
      },
    );
  }
  public async findByReference(absence: Absence) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Absence>(this._url + 'ref/' + absence.ref, {headers}).toPromise().then(
      (data) => {
        this.absenceFounded = data;
      },
    );
  }
  public findAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.get<Absence[]>(this._url, {headers}).subscribe(
      (data) => {
        this.absences = data;
      },
    );
  }
  public deleteByReference(absence: Absence) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete<number>(this._url + 'ref/' + absence.ref, {headers}).subscribe(
      (data) => {
        console.log(data);
        this.deleteFromList(absence);
      },
    );
  }
  public deleteFromList(absence: Absence) {
    const index = this.absences.findIndex((e) => e.ref === absence.ref);
    if (index !== -1) {
      this.absences.splice(index, 1);
    }
  }
  public async update() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<number>(this._url + 'update', this.absenceFounded, {headers}).toPromise().then(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.absenceFounded);
          this.absences.push(this.clone(this.absenceFounded));
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  public async save() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Absence>(this._url, this.absence, {headers}).toPromise().then(
      (data) => {
        if (data) {
          console.log('data : ' + data);
          this.absences.push(this.clone(data));
          this.absence = null;
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  private clone(absence: Absence) {
    const myclone = new Absence();
    myclone.ref = absence.ref ;
    myclone.justification = absence.justification ;
    myclone.etudiant = absence.etudiant ;
    myclone.absent = absence.absent ;
    myclone.session = absence.session ;
    myclone.justificatif = absence.justificatif ;
    return myclone;
  }
  get absence(): Absence {
    if (this._absence == null) {
      this._absence = new Absence();
    }
    return this._absence;
  }

  set absence(value: Absence) {
    this._absence = value;
  }

  get absences(): Absence[] {
    if (this._absences == null) {
      this._absences = new Array<Absence>();
    }
    return this._absences;
  }

  set absences(value: Absence[]) {
    this._absences = value;
  }

  get absenceFounded(): Absence {
    if (this._absenceFounded == null) {
      this._absenceFounded = new Absence();
    }
    return this._absenceFounded;
  }

  set absenceFounded(value: Absence) {
    this._absenceFounded = value;
  }

  get absencesFounded(): Absence[] {
    if (this._absencesFounded == null) {
      this._absencesFounded = new Array<Absence>();
    }
    return this._absencesFounded;
  }

  set absencesFounded(value: Absence[]) {
    this._absencesFounded = value;
  }

  get absencesEtudiant(): Absence[] {
    if (this._absencesEtudiant == null) {
      this._absencesEtudiant = new Array<Absence>();
    }
    return this._absencesEtudiant;
  }

  set absencesEtudiant(value: Absence[]) {
    this._absencesEtudiant = value;
  }

  get sessionEtudiant(): SessionEtudiant {
    if (this._sessionEtudiant == null) {
      this._sessionEtudiant = new SessionEtudiant();
    }
    return this._sessionEtudiant;
  }

  set sessionEtudiant(value: SessionEtudiant) {
    this._sessionEtudiant = value;
  }

  get boolean(): boolean {
    return this._boolean;
  }

  set boolean(value: boolean) {
    this._boolean = value;
  }
}
