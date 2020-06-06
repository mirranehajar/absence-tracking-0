import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Etudiant} from '../model/etudiant.model';
import {Groupe} from '../model/groupe';
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
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/groupe/';
  constructor(private http: HttpClient, private etudiantService: EtudiantService) { }

  public findByLibelle(groupe: Groupe) {
    this.http.get<Groupe>(this._url + 'libelle/' + groupe.libelle).subscribe(
      (data) => {
        this.groupeFounded = data;
      },
    );
  }
  public findAll() {
    this.http.get<Groupe[]>(this._url).subscribe(
      async (data) => {
        this.groupes = data;
        for ( const g of this.groupes) {
          await this.findByGroupe(g);
          g.etudiants = this.etudiantsFounded;
        }
      },
    );
  }
  public deleteByReference(groupe: Groupe) {
    this.http.delete<number>(this._url + 'reference/' + groupe.reference).subscribe(
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
    this.http.post<number>(this._url + 'update', this.groupeFounded).subscribe(
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
  public save() {
    this.http.post<number>(this._url, this.groupe).subscribe(
      (data) => {
        if (data > 0) {
          this.groupes.push(this.clone(this.groupe));
          this.groupe = null;
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
}
