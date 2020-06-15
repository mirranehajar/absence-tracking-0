import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Absence} from '../model/absence';
import {Etudiant} from '../model/etudiant.model';
import {Module} from '../model/module';
import {Session} from '../model/session';
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
  private _url = 'http://localhost:8090/absence-tracking/absence/';
  constructor(private http: HttpClient) { }

  public async findBySessionAndEtudiant(session: Session, etudiant: Etudiant) {
    await this.http.post<Absence[]>(this._url + 'sessionAndEtudiant' , { session , etudiant}).toPromise().then(
      (data) => {
        this.absencesFounded = data;
      },
    );
  }
  public async findByTypeSession(typeSession: TypeSession) {
    await this.http.post<Absence[]>(this._url + 'typeSession' , typeSession).toPromise().then(
      (data) => {
        this.absencesFounded = data;
      },
    );
  }
  public async findByModule(module: Module) {
    await this.http.post<Absence[]>(this._url + 'module' , module).toPromise().then(
      (data) => {
        this.absencesFounded = data;
      },
    );
  }
  public async findBySession(session: Session) {
    await this.http.post<Absence[]>(this._url + 'session' , session).toPromise().then(
      (data) => {
        this.absencesFounded = data;
      },
    );
  }
  public async findByEtudiant(etudiant: Etudiant) {
    await this.http.post<Absence[]>(this._url + 'etudiant' , etudiant).toPromise().then(
      (data) => {
        this.absencesFounded = data;
      },
    );
  }
  public async findByReference(absence: Absence) {
    await this.http.get<Absence>(this._url + 'ref/' + absence.ref).toPromise().then(
      (data) => {
        this.absenceFounded = data;
      },
    );
  }
  public findAll() {
    this.http.get<Absence[]>(this._url).subscribe(
      (data) => {
        this.absences = data;
      },
    );
  }
  public deleteByReference(absence: Absence) {
    this.http.delete<number>(this._url + 'ref/' + absence.ref).subscribe(
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
    await this.http.post<number>(this._url + 'update', this.absenceFounded).toPromise().then(
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
    await this.http.post<Absence>(this._url, this.absence).toPromise().then(
      (data) => {
        if (data) {
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
}
