import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Sector} from '../model/sector';
import {Semestre} from '../model/semestre';

@Injectable({
  providedIn: 'root',
})
export class SemestreService {
  // tslint:disable-next-line:variable-name
  private _semestre: Semestre;
  // tslint:disable-next-line:variable-name
  private _semestres: Semestre[];
  // tslint:disable-next-line:variable-name
  private _semestreFounded: Semestre;
  private _semestresFounded: Semestre[];
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/semestre/';
  constructor(private http: HttpClient) { }

  public async findBySector(sector: Sector) {
    await this.http.post<Semestre[]>(this._url + 'sector/', sector).toPromise().then(
      (data) => {
        this.semestresFounded = data;
      },
    );
  }
  public findByReference(semestre: Semestre) {
    this.http.get<Semestre>(this._url + 'refrence/' + semestre.reference).subscribe(
      (data) => {
        this.semestreFounded = data;
      },
    );
  }
  public async findAll() {
    await this.http.get<Semestre[]>(this._url).toPromise().then(
      (data) => {
        this.semestres = data;
      },
    );
  }
  public deleteByReference(semestre: Semestre) {
    this.http.delete<number>(this._url + 'reference/' + semestre.reference).subscribe(
      (data) => {
        console.log(data);
        this.deleteFromList(semestre);
      },
    );
  }
  public deleteFromList(semestre: Semestre) {
    const index = this.semestres.findIndex((e) => e.reference === semestre.reference);
    if (index !== -1) {
      this.semestres.splice(index, 1);
    }
  }
  public update() {
    this.semestresFounded = this.semestreFounded.sector.semestres;
    this.semestreFounded.sector.semestres = null;
    this.http.post<number>(this._url + 'update' , this.semestreFounded).subscribe(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.semestreFounded);
          this.semestres.push(this.clone(this.semestreFounded));
        }
      }, (error) => {
        console.log('error' + error);
      },
    );
    this.semestreFounded.sector.semestres = this.semestresFounded;
  }
  public save(filiere: string) {
    this.http.post<number>(this._url + filiere, this.semestre).subscribe(
      (data) => {
        if (data > 0) {
          this.semestres.push(this.clone(this.semestre));
          this.semestre = null;
        }
      }, (error) => {
        console.log('error' + error);
      },
    );
  }
  private clone(semestre: Semestre) {
    const myclone = new Semestre();
    myclone.libelle = semestre.libelle ;
    myclone.reference = semestre.reference ;
    myclone.anneeUniversitaire = semestre.anneeUniversitaire ;
    myclone.sector = semestre.sector;
    myclone.groupes = semestre.groupes;
    myclone.modules = semestre.modules;
    myclone.number = semestre.number;
    return myclone;
  }
  get semestre(): Semestre {
    if (this._semestre == null) {
      this._semestre = new Semestre();
    }
    return this._semestre;
  }

  set semestre(value: Semestre) {
    this._semestre = value;
  }

  get semestres(): Semestre[] {
    if (this._semestres == null) {
      this._semestres = new Array<Semestre>();
    }
    return this._semestres;
  }

  set semestres(value: Semestre[]) {
    this._semestres = value;
  }

  get semestreFounded(): Semestre {
    return this._semestreFounded;
  }

  set semestreFounded(value: Semestre) {
    this._semestreFounded = value;
  }

  get semestresFounded(): Semestre[] {
    return this._semestresFounded;
  }

  set semestresFounded(value: Semestre[]) {
    this._semestresFounded = value;
  }
}
