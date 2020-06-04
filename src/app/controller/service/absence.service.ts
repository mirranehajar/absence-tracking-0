import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Absence} from '../model/absence';

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
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/absence/';
  constructor(private http: HttpClient) { }

  public findByReference(absence: Absence) {
    this.http.get<Absence>(this._url + 'ref/' + absence.ref).subscribe(
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
  public update() {
    this.http.post<number>(this._url + 'update', this.absenceFounded).subscribe(
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
  public save() {
    this.http.post<number>(this._url, this.absence).subscribe(
      (data) => {
        if (data > 0) {
          this.absences.push(this.clone(this.absence));
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
    myclone.séance = absence.séance ;
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
    return this._absenceFounded;
  }

  set absenceFounded(value: Absence) {
    this._absenceFounded = value;
  }
}
