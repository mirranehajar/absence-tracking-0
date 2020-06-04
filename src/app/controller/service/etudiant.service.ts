import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Etudiant} from '../model/etudiant.model';
import {Groupe} from '../model/groupe';
import {Sector} from '../model/sector';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  // tslint:disable-next-line:variable-name
  private _etudiant: Etudiant;
  // tslint:disable-next-line:variable-name
  private _etudiants: Etudiant[];
  // tslint:disable-next-line:variable-name
  private _etudiantFounded: Etudiant;
  private _etudiantsFounded: Etudiant[];
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/etudiant/';

  constructor(private http: HttpClient) { }
  public deleteFromList(etudiant: Etudiant) {
    const index = this.etudiants.findIndex((e) => e.cne === etudiant.cne);
    if (index !== -1) {
      this.etudiants.splice(index, 1);
    }
  }
  public deleteByCne(etudiant: Etudiant) {
    this.http.delete<number>(this._url + 'cne/' + etudiant.cne).subscribe(
      (data) => {
        console.log(data);
        this.deleteFromList(etudiant);
      },
    );
  }
  public findByGroupe(groupe: Groupe) {
    this.http.post<Etudiant[]>(this._url + 'groupe', groupe).subscribe(
      (data) => {
        this.etudiantsFounded = data;
      },
    );
  }
  public findByCne(etudiant: Etudiant) {
    this.http.get<Etudiant>(this._url + 'cne/' + etudiant.cne).subscribe(
      (data) => {
        this.etudiantFounded = data;
      },
    );
  }
  public findAll() {
    this.http.get<Etudiant[]>(this._url).subscribe(
      (data) => {
        this.etudiants = data;
      },
    );
  }
  public update() {
    this.http.post<number>(this._url + 'update', this.etudiantFounded).subscribe(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.etudiantFounded);
          this.etudiants.push(this.clone(this.etudiantFounded));
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  public save() {
    this.http.post<number>(this._url, this.etudiant).subscribe(
      (data) => {
        if (data > 0) {
          this.etudiants.push(this.clone(this.etudiant));
          this.etudiant = null;
        }
      }, (error) => {
        console.log('error');
      },
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
    myclone.filiere = etudiant.filiere;
    myclone.groupe = etudiant.groupe;
    return myclone;
  }

  get etudiantFounded(): Etudiant {
    if (this._etudiantFounded == null) {
      this._etudiantFounded = new Etudiant();
    }
    if (this._etudiantFounded.filiere == null) {
      this._etudiantFounded.filiere = new Sector();
    }
    if (this._etudiantFounded.groupe == null) {
      this._etudiantFounded.groupe = new Groupe();
    }
    return this._etudiantFounded;
  }

  set etudiantFounded(value: Etudiant) {
    this._etudiantFounded = value;
  }

  get etudiant(): Etudiant {
    if (this._etudiant == null) {
      this._etudiant = new Etudiant();
    }
    if (this._etudiant.filiere == null) {
      this._etudiant.filiere = new Sector();
    }
    if (this._etudiant.groupe == null) {
      this._etudiant.groupe = new Groupe();
    }
    return this._etudiant;
  }
  set etudiant(value: Etudiant) {
    this._etudiant = value;
  }
  get etudiants(): Etudiant[] {
    if (this._etudiants == null) {
      this._etudiants = new Array<Etudiant>();
    }
    return this._etudiants;
  }
  set etudiants(value: Etudiant[]) {
    this._etudiants = value;
  }

  get etudiantsFounded(): Etudiant[] {
    return this._etudiantsFounded;
  }

  set etudiantsFounded(value: Etudiant[]) {
    this._etudiantsFounded = value;
  }
}
