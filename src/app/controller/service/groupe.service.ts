import { Injectable } from '@angular/core';
import {Groupe} from '../model/groupe';
import {HttpClient} from '@angular/common/http';
import {Etudiant} from '../model/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  // tslint:disable-next-line:variable-name
  private _groupe: Groupe;
  // tslint:disable-next-line:variable-name
  private _groupes: Array<Groupe>;
  // tslint:disable-next-line:variable-name
  private _groupeFounded: Groupe;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/groupe/';
  constructor(private http: HttpClient) { }

  public findByLibelle(groupe: Groupe) {
    this.http.get<Groupe>(this._url + 'libelle/' + groupe.libelle).subscribe(
      data => {
        this.groupeFounded = data;
      }
    );
  }
  public findAll() {
    this.http.get<Array<Groupe>>(this._url).subscribe(
      data => {
        this.groupes = data;
      }
    );
  }
  public deleteByLibelle(groupe: Groupe) {
    this.http.delete<number>(this._url + 'liblle/' + groupe.libelle).subscribe(
      data => {
        console.log(data);
        this.deleteFromList(groupe);
      }
    );
  }
  public deleteFromList(groupe: Groupe) {
    const index = this.groupes.findIndex(e => e.libelle === groupe.libelle);
    if (index !== -1) {
      this.groupes.splice(index, 1);
    }
  }
  public update() {
    this.http.put<number>(this._url, this._groupeFounded).subscribe(
      data => {
        if (data > 0) {
          this.deleteFromList(this._groupeFounded);
          this.groupes.push(this.clone(this.groupeFounded));
        }
      }, error => {
        console.log('error');
      }
    );
  }
  public save() {
    this.http.post<number>(this._url, this._groupe).subscribe(
      data => {
        if (data > 0) {
          this._groupes.push(this.clone(this.groupe));
          this.groupe = null;
        }
      }, error => {
        console.log('error');
      }
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

  get groupes(): Array<Groupe> {
    if (this._groupes == null) {
      this._groupes = new Array<Groupe>();
    }
    return this._groupes;
  }

  set groupes(value: Array<Groupe>) {
    this._groupes = value;
  }

  get groupeFounded(): Groupe {
    return this._groupeFounded;
  }

  set groupeFounded(value: Groupe) {
    this._groupeFounded = value;
  }
}
