import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Etudiant} from '../model/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  // tslint:disable-next-line:variable-name
  private _etudiant: Etudiant;
  // tslint:disable-next-line:variable-name
  private _etudiants: Array<Etudiant>;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/etudiant/';

  constructor(private http: HttpClient) { }
  public deleteFromList(etudiant: Etudiant) {
    const index = this.etudiants.findIndex(e => e.cne === etudiant.cne);
    if (index !== -1) {
      this.etudiants.splice(index, 1);
    }
  }
  public deleteByCne(etudiant: Etudiant) {
    this.http.delete<number>(this._url + 'cne/' + etudiant.cne).subscribe(
      data => {
        console.log(data);
        this.deleteFromList(etudiant);
      }
    );
  }
  public findAll() {
    this.http.get<Array<Etudiant>>(this._url).subscribe(
      data => {
        this.etudiants = data;
      }
    );
  }
  public save() {
    this.http.post<number>(this._url, this.etudiant).subscribe(
      data => {
        if (data > 0) {
          this.etudiants.push(this.clone(this.etudiant));
          this.etudiant = null;
        }
      }, error => {
        console.log('error');
      }
    );
  }
  private clone(etudiant: Etudiant) {
    const myclone = new Etudiant();
    myclone.cne = etudiant.cne;
    myclone.cin = etudiant.cin;
    myclone.codeApogee = etudiant.codeApogee;
    myclone.firstName = etudiant.firstName;
    myclone.lastName = etudiant.lastName;
    myclone.tel = etudiant.tel;
    myclone.birthDay = etudiant.birthDay;
    myclone.mail = etudiant.mail;
    myclone.nbrAbsence = etudiant.nbrAbsence;
    return myclone;
  }

  get etudiant(): Etudiant {
    if (this._etudiant == null) {
      this._etudiant = new Etudiant();
    }
    return this._etudiant;
  }
  set etudiant(value: Etudiant) {
    this._etudiant = value;
  }
  get etudiants(): Array<Etudiant> {
    if (this._etudiants == null) {
      this._etudiants = new Array<Etudiant>();
    }
    return this._etudiants;
  }
  set etudiants(value: Array<Etudiant>) {
    this._etudiants = value;
  }
}
