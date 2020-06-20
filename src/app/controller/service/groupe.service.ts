import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Etudiant} from '../model/etudiant.model';
import {Groupe} from '../model/groupe';
import {Sector} from '../model/sector';
import {Semestre} from '../model/semestre';
import {EtudiantService} from './etudiant.service';

@Injectable({
  providedIn: 'root',
})
export class GroupeService {
  // tslint:disable-next-line:variable-name
  private _groupe: Groupe;
  // tslint:disable-next-line:variable-name
  private _groupes: Groupe[];
  // tslint:disable-next-line:variable-name
  private _groupeFounded: Groupe;
  private _groupesFounded: Groupe[];
  private _groupeSaved: Groupe;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/groupe/';
  constructor(private http: HttpClient, private etudiantService: EtudiantService) { }

  public async findByReference(reference: string) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Groupe>(this._url + 'reference/' + reference, {headers}).toPromise().then(
      (data) => {
        this.groupeFounded = data;
      },
    );
  }
  public async findByLibelle(libelle: string) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Groupe>(this._url + 'libelle/' + libelle, {headers}).toPromise().then(
      (data) => {
        this.groupeFounded = data;
      },
    );
  }
  public async findBySector(sector: Sector) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Groupe[]>(this._url + 'sector' , sector, {headers}).toPromise().then(
     async (data) => {
        this.groupesFounded = data;
        for ( const g of this.groupesFounded) {
          await this.findByGroupe(g);
          g.etudiants = this.etudiantsFounded;
          console.log(g);
        }
      },
    );
  }
  public async findBySemestre(semestre: Semestre) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Groupe[]>(this._url + 'semestre' , semestre, {headers}).toPromise().then(
     async (data) => {
        this.groupesFounded = data;
        for ( const g of this.groupesFounded) {
          await this.findByGroupe(g);
          g.etudiants = this.etudiantsFounded;
          console.log(g);
        }
      },
    );
  }
  public findAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.get<Groupe[]>(this._url, {headers}).subscribe(
      async (data) => {
        this.groupes = data;
        for ( const g of this.groupes) {
          await this.findByGroupe(g);
          g.etudiants = this.etudiantsFounded;
        }
      },
    );
  }
  public async deleteByReference(groupe: Groupe) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.delete<number>(this._url + 'reference/' + groupe.reference, {headers}).toPromise().then(
      (data) => {
        console.log(data);
        this.deleteFromList(groupe);
      },
    );
  }
  public deleteFromList(groupe: Groupe) {
    const index = this.groupes.findIndex((e) => e.libelle === groupe.libelle);
    if (index !== -1) {
      this.groupes.splice(index, 1);
    }
  }
  public update() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.post<number>(this._url + 'update', this.groupeFounded, {headers}).subscribe(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.groupeFounded);
          this.groupes.push(this.clone(this.groupeFounded));
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  public async save() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Groupe>(this._url, this.groupe, {headers}).toPromise().then(
      (data) => {
        if (data) {
          this.groupes.push(this.clone(data));
          this.groupe = null;
          this.groupeSaved = data;
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  private clone(groupe: Groupe) {
    const myclone = new Groupe();
    myclone.libelle = groupe.libelle ;
    myclone.semestre = groupe.semestre ;
    myclone.etudiants = groupe.etudiants ;
    return myclone;
  }
  get groupe(): Groupe {
    if (this._groupe == null) {
      this._groupe = new Groupe();
    }
    if (this._groupe.etudiants == null) {
      this._groupe.etudiants = new Array<Etudiant>();
    }
    if (this._groupe.semestre == null) {
      this._groupe.semestre = new Semestre();
    }
    if (this._groupe.semestre.sector == null) {
      this._groupe.semestre.sector = new Sector();
    }
    return this._groupe;
  }

  set groupe(value: Groupe) {
    this._groupe = value;
  }

  get groupes(): Groupe[] {
    if (this._groupes == null) {
      this._groupes = new Array<Groupe>();
    }
    return this._groupes;
  }

  set groupes(value: Groupe[]) {
    this._groupes = value;
  }

  get groupeFounded(): Groupe {
    if (this._groupeFounded == null) {
      this._groupeFounded = new Groupe();
    }
    return this._groupeFounded;
  }

  set groupeFounded(value: Groupe) {
    this._groupeFounded = value;
  }
  public async findByGroupe(groupe: Groupe) {
   await this.etudiantService.findByGroupe(groupe);
  }
  get etudiantsFounded(): Etudiant[] {
    return this.etudiantService.etudiantsFounded;
  }

  get groupesFounded(): Groupe[] {
    if (this._groupesFounded == null) {
      this._groupesFounded = new Array<Groupe>();
    }
    return this._groupesFounded;
  }

  set groupesFounded(value: Groupe[]) {
    this._groupesFounded = value;
  }

  get groupeSaved(): Groupe {
    if (this._groupeSaved == null) {
      this._groupeSaved = new Groupe();
    }
    if (this._groupeSaved.semestre == null) {
      this._groupeSaved.semestre = new Semestre();
    }
    if (this._groupeSaved.semestre.sector == null) {
      this._groupeSaved.semestre.sector = new Sector();
    }
    return this._groupeSaved;
  }

  set groupeSaved(value: Groupe) {
    this._groupeSaved = value;
  }
}
