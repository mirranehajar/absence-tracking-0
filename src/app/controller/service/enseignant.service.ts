import { Injectable } from '@angular/core';
import {Enseignant} from '../model/enseignant.model';
import {HttpClient} from '@angular/common/http';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  // tslint:disable-next-line:variable-name
  private _enseignant: Enseignant;
  // tslint:disable-next-line:variable-name
  private _enseignants: Array<Enseignant>;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/enseignant/';

  constructor(private http: HttpClient) { }
  public deleteFromList(enseignant: Enseignant) {
    const index = this.enseignants.findIndex(e => e.matricule === enseignant.matricule);
    if (index !== -1) {
      this.enseignants.splice(index, 1);
    }
  }
  public deleteByMatricule(enseignant: Enseignant) {
    this.http.delete<number>(this._url + 'matricule/' + enseignant.matricule).subscribe(
      data => {
        console.log(data);
        this.deleteFromList(enseignant);
      }
    );
  }
  public findAll() {
    this.http.get<Array<Enseignant>>(this._url).subscribe(
      data => {
        this.enseignants = data;
      }
    );
  }
  public save() {
      this.http.post<number>(this._url, this.enseignant).subscribe(
        data => {
          if (data > 0) {
            this.enseignants.push(this.clone(this.enseignant));
            this.enseignant = null;
          }
        }, error => {
          console.log('error');
        }
      );
    }
  private clone(enseignant: Enseignant) {
    const myclone = new Enseignant();
    myclone.matricule = enseignant.matricule;
    myclone.cin = enseignant.cin;
    myclone.firstName = enseignant.firstName;
    myclone.lastName = enseignant.lastName;
    myclone.tel = enseignant.tel;
    myclone.birthDay = enseignant.birthDay;
    myclone.mail = enseignant.mail;
    return myclone;
  }
  get enseignant(): Enseignant {
    if (this._enseignant == null) {
      this._enseignant = new Enseignant();
    }
    return this._enseignant;
  }

  set enseignant(value: Enseignant) {
    this._enseignant = value;
  }

  get enseignants(): Array<Enseignant> {
    if (this._enseignants == null) {
      this._enseignants = new Array<Enseignant>();
    }
    return this._enseignants;
  }

  set enseignants(value: Array<Enseignant>) {
    this._enseignants = value;
  }
}
