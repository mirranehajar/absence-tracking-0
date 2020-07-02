import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Etudiant} from '../model/etudiant.model';
import {Groupe} from '../model/groupe';
import {Sector} from '../model/sector';
import {Semestre} from '../model/semestre';

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
  private _etudiantConnected: Etudiant;
  private _etudiantsGroupe: Etudiant[];
  private _url = 'http://localhost:8090/absence-tracking/etudiant/';

  constructor(private http: HttpClient) { }
  public deleteFromList(etudiant: Etudiant) {
    const index = this.etudiants.findIndex((e) => e.cne === etudiant.cne);
    if (index !== -1) {
      this.etudiants.splice(index, 1);
    }
  }
  public deleteByCne(etudiant: Etudiant) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete<number>(this._url + 'cne/' + etudiant.cne, {headers}).subscribe(
      (data) => {
        console.log(data);
        this.deleteFromList(etudiant);
      },
    );
  }
  public async findBySector(sector: Sector) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Etudiant[]>(this._url + 'sector', sector, {headers}).toPromise().then(
      (data) => {
        this.etudiantsFounded = data;
      },
    );
  }
  public async findBySemestre(semestre: Semestre) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Etudiant[]>(this._url + 'semestre', semestre, {headers}).toPromise().then(
      (data) => {
        this.etudiantsFounded = data;
      },
    );
  }
  public async findByGroupe(groupe: Groupe) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Etudiant[]>(this._url + 'groupe', groupe, {headers}).toPromise().then(
      (data) => {
        this.etudiantsFounded = data;
      },
    );
  }
  public async findByMail(mail: string) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Etudiant>(this._url + 'mail/' + mail, {headers}).toPromise().then(
      (data) => {
        this.etudiantConnected = data;
      },
    );
  }
  public async findByCne(etudiant: Etudiant) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Etudiant>(this._url + 'cne/' + etudiant.cne, {headers}).toPromise().then(
      (data) => {
        this.etudiantFounded = data;
      },
    );
  }
  public async findAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Etudiant[]>(this._url, {headers}).toPromise().then(
      (data) => {
        this.etudiants = data;
        for (const e of this.etudiants) {
          e.label = e.lastName + ' ' + e.firstName;
        }
      },
    );
  }
  public async update() {
    if (this.etudiantFounded.groupe != null) {
    this.etudiantsFounded = this.etudiantFounded.groupe.etudiants;
    this.etudiantFounded.groupe.etudiants = null;
    } else {this.etudiantsFounded = null; }
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Etudiant>(this._url + 'update', this.etudiantFounded, {headers}).toPromise().then(
      (data) => {
        if (data) {
          this.deleteFromList(this.etudiantFounded);
          this.etudiants.push(this.clone(data));
          console.log('etudiant groupe null: ' + data);
        }
      }, (error) => {
        console.log(error);
      },
    );
    if (this.etudiantsFounded != null && this.etudiantFounded.groupe != null) {
      this.etudiantFounded.groupe.etudiants = new Array<Etudiant>();
      this.etudiantFounded.groupe.etudiants = this.etudiantsFounded;
    }
  }
  public async password() {
    if (this.etudiantFounded.groupe != null) {
    this.etudiantsFounded = this.etudiantFounded.groupe.etudiants;
    this.etudiantFounded.groupe.etudiants = null;
    } else {this.etudiantsFounded = null; }
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Etudiant>(this._url + 'password', this.etudiantFounded, {headers}).toPromise().then(
      (data) => {
        if (data) {
          this.deleteFromList(this.etudiantFounded);
          this.etudiants.push(this.clone(data));
          console.log('etudiant groupe null: ' + data);
        }
      }, (error) => {
        console.log(error);
      },
    );
    if (this.etudiantsFounded != null && this.etudiantFounded.groupe != null) {
      this.etudiantFounded.groupe.etudiants = new Array<Etudiant>();
      this.etudiantFounded.groupe.etudiants = this.etudiantsFounded;
    }
  }
  public async save() {
    if ( this.etudiant.sex === 'F') {
      // tslint:disable-next-line:max-line-length
      this.etudiant.image = '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';
    } else {
      // tslint:disable-next-line:max-line-length
      this.etudiant.image = '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';
    }
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Etudiant>(this._url, this.etudiant, {headers}).toPromise().then(
      (data) => {
        if (data) {
          this.etudiants.push(this.clone(data));
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
    myclone.sector = etudiant.sector;
    myclone.groupe = etudiant.groupe;
    myclone.sex = etudiant.sex;
    myclone.ville = etudiant.ville;
    myclone.label = etudiant.lastName + ' ' + etudiant.firstName;
    return myclone;
  }

  get etudiantFounded(): Etudiant {
    if (this._etudiantFounded == null) {
      this._etudiantFounded = new Etudiant();
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
    if (this._etudiantsFounded == null) {
      this._etudiantsFounded = new Array<Etudiant>();
    }
    return this._etudiantsFounded;
  }

  set etudiantsFounded(value: Etudiant[]) {
    this._etudiantsFounded = value;
  }

  get etudiantConnected(): Etudiant {
    if (this._etudiantConnected == null) {
      this._etudiantConnected = new Etudiant();
    }
    return this._etudiantConnected;
  }

  set etudiantConnected(value: Etudiant) {
    this._etudiantConnected = value;
  }

  get etudiantsGroupe(): Etudiant[] {
    if (this._etudiantsGroupe == null) {
      this._etudiantsGroupe = new Array<Etudiant>();
    }
    return this._etudiantsGroupe;
  }

  set etudiantsGroupe(value: Etudiant[]) {
    this._etudiantsGroupe = value;
  }
}
