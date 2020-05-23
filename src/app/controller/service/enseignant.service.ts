import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Enseignant} from '../model/enseignant.model';

@Injectable({
  providedIn: 'root',
})
export class EnseignantService {
  // tslint:disable-next-line:variable-name
  private _enseignant: Enseignant;
  // tslint:disable-next-line:variable-name
  private _enseignants: Enseignant[];
  // tslint:disable-next-line:variable-name
  private _enseignantFounded: Enseignant;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/enseignant/';

  constructor(private http: HttpClient) { }
  public deleteFromList(enseignant: Enseignant) {
    const index = this.enseignants.findIndex((e) => e.numeroSOM === enseignant.numeroSOM);
    if (index !== -1) {
      this.enseignants.splice(index, 1);
    }
  }
  public deleteByNumeroSOM(enseignant: Enseignant) {
    this.http.delete<number>(this._url + 'numeroSOM/' + enseignant.numeroSOM).subscribe(
      (data) => {
        console.log(data);
        this.deleteFromList(enseignant);
      },
    );
  }
  public findByNumeroSOM(enseignant: Enseignant) {
    this.http.get<Enseignant>(this._url + 'numeroSOM/' + enseignant.numeroSOM).subscribe(
      (data) => {
        this.enseignantFounded = data;
      },
    );
  }
  public findAll() {
    this.http.get<Enseignant[]>(this._url).subscribe(
      (data) => {
        this.enseignants = data;
      },
    );
  }
  public update() {
    this.http.put<number>(this._url, this.enseignantFounded).subscribe(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.enseignantFounded);
          this.enseignants.push(this.clone(this.enseignantFounded));
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  public save() {
      this.http.post<number>(this._url, this.enseignant).subscribe(
        (data) => {
          if (data > 0) {
            this.enseignants.push(this.clone(this.enseignant));
            this.enseignant = null;
          }
        }, (error) => {
          console.log('error');
        },
      );
    }
  private clone(enseignant: Enseignant) {
    const myclone = new Enseignant();
    myclone.numeroSOM = enseignant.numeroSOM;
    myclone.cin = enseignant.cin;
    myclone.firstName = enseignant.firstName;
    myclone.lastName = enseignant.lastName;
    myclone.tel = enseignant.tel;
    myclone.birthDay = enseignant.birthDay;
    myclone.mail = enseignant.mail;
    return myclone;
  }
  get enseignantFounded(): Enseignant {
    if (this._enseignantFounded == null) {
      this. _enseignantFounded = new Enseignant();
    }
    return this._enseignantFounded;
  }

  set enseignantFounded(value: Enseignant) {
    this._enseignantFounded = value;
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

  get enseignants(): Enseignant[] {
    if (this._enseignants == null) {
      this._enseignants = new Array<Enseignant>();
    }
    return this._enseignants;
  }

  set enseignants(value: Enseignant[]) {
    this._enseignants = value;
  }
}
