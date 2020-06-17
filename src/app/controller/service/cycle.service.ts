import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Cycle} from '../model/cycle';

@Injectable({
  providedIn: 'root',
})
export class CycleService {
  // tslint:disable-next-line:variable-name
  private _cycle: Cycle;
  // tslint:disable-next-line:variable-name
  private _cycles: Cycle[];
  // tslint:disable-next-line:variable-name
  private _cycleFounded: Cycle;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/cycle/';
  constructor(private http: HttpClient) { }

  public async findByLibelle(cycle: Cycle) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Cycle>(this._url + 'libelle/' + cycle.libelle, {headers}).toPromise().then(
      (data) => {
        this.cycleFounded = data;
      },
    );
  }
  public findAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.get<Cycle[]>(this._url, {headers}).subscribe(
      (data) => {
        this.cycles = data;
      },
    );
  }
  public deleteByLibelle(cycle: Cycle) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete<number>(this._url + 'cycle/' + cycle.libelle, {headers}).subscribe(
      (data) => {
        console.log(data);
        this.deleteFromList(cycle);
      },
    );
  }
  public deleteFromList(cycle: Cycle) {
    const index = this.cycles.findIndex((e) => e.libelle === cycle.libelle);
    if (index !== -1) {
      this.cycles.splice(index, 1);
    }
  }
  public save() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.post<number>(this._url, this._cycle, {headers}).subscribe(
      (data) => {
        if (data > 0) {
          this._cycles.push(this.clone(this.cycle));
          this.cycle = null;
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  private clone(cycle: Cycle) {
    const myclone = new Cycle();
    myclone.libelle = cycle.libelle ;
    return myclone;
  }
  get cycle(): Cycle {
    if (this._cycle == null) {
      this._cycle = new Cycle();
    }
    return this._cycle;
  }

  set cycle(value: Cycle) {
    this._cycle = value;
  }

  get cycles(): Cycle[] {
    if (this._cycles == null) {
      this._cycles = new Array<Cycle>();
    }
    return this._cycles;
  }

  set cycles(value: Cycle[]) {
    this._cycles = value;
  }

  get cycleFounded(): Cycle {
    return this._cycleFounded;
  }

  set cycleFounded(value: Cycle) {
    this._cycleFounded = value;
  }
}
