import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cycle} from '../model/cycle';

@Injectable({
  providedIn: 'root'
})
export class CycleService {
  // tslint:disable-next-line:variable-name
  private _cycle: Cycle;
  // tslint:disable-next-line:variable-name
  private _cycles: Array<Cycle>;
  // tslint:disable-next-line:variable-name
  private _cycleFounded: Cycle;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/cycle/';
  constructor(private http: HttpClient) { }

  public findByLibelle(cycle: Cycle) {
    this.http.get<Cycle>(this._url + 'libelle/' + cycle.libelle).subscribe(
      data => {
        this.cycleFounded = data;
      }
    );
  }
  public findAll() {
    this.http.get<Array<Cycle>>(this._url).subscribe(
      data => {
        this.cycles = data;
      }
    );
  }
  public deleteByLibelle(cycle: Cycle) {
    this.http.delete<number>(this._url + 'cycle/' + cycle.libelle).subscribe(
      data => {
        console.log(data);
        this.deleteFromList(cycle);
      }
    );
  }
  public deleteFromList(cycle: Cycle) {
    const index = this.cycles.findIndex(e => e.libelle === cycle.libelle);
    if (index !== -1) {
      this.cycles.splice(index, 1);
    }
  }
  public save() {
    this.http.post<number>(this._url, this._cycle).subscribe(
      data => {
        if (data > 0) {
          this._cycles.push(this.clone(this.cycle));
          this.cycle = null;
        }
      }, error => {
        console.log('error');
      }
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

  get cycles(): Array<Cycle> {
    if (this._cycles == null) {
      this._cycles = new Array<Cycle>();
    }
    return this._cycles;
  }

  set cycles(value: Array<Cycle>) {
    this._cycles = value;
  }

  get cycleFounded(): Cycle {
    return this._cycleFounded;
  }

  set cycleFounded(value: Cycle) {
    this._cycleFounded = value;
  }
}
