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
  private _enseignantConnected: Enseignant;
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
  public async findByNumeroSOM(enseignant: Enseignant) {
    await this.http.get<Enseignant>(this._url + 'numeroSOM/' + enseignant.numeroSOM).toPromise().then(
      (data) => {
        this.enseignantFounded = data;
      },
    );
  }
  public async findAll() {
    await this.http.get<Enseignant[]>(this._url).toPromise().then(
      (data) => {
        this.enseignants = data;
      },
    );
  }
  public update() {
    this.http.post<number>(this._url + 'update', this.enseignantFounded).subscribe(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.enseignantFounded);
          this.enseignants.push(this.clone(this.enseignantFounded));
        }
      }, (error) => {
        console.log('error' + error);
      },
    );
  }
  public save() {
    // tslint:disable-next-line:max-line-length
    this.enseignant.image = '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';
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
    myclone.image = enseignant.image;
    myclone.src = enseignant.src;
    myclone.departement = enseignant.departement;
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

  get enseignantConnected(): Enseignant {
    if (this._enseignantConnected == null) {
      this._enseignantConnected = new Enseignant();
    }
    return this._enseignantConnected;
  }

  set enseignantConnected(value: Enseignant) {
    this._enseignantConnected = value;
  }
}
