import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sector} from '../model/sector';
import {Cycle} from '../model/cycle';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  // tslint:disable-next-line:variable-name
  private _sector: Sector;
  // tslint:disable-next-line:variable-name
  private _sectors: Array<Sector>;
  // tslint:disable-next-line:variable-name
  private _sectorFounded: Sector;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/filiere/';
  constructor(private http: HttpClient) { }

  public findByCycle(sector: Sector) {
    this.http.get<Sector>(this._url + 'cycle').subscribe(
      data => {
        this.sectorFounded = data;
      }
    );
  }
  public findByLibelle(sector: Sector) {
    this.http.get<Sector>(this._url + 'libelle/' + sector.libelle).subscribe(
      data => {
        this.sectorFounded = data;
      }
    );
  }
  public deleteByLibelle(sector: Sector) {
    this.http.delete<number>(this._url + 'libelle/' + sector.libelle).subscribe(
      data => {
        console.log(data);
        this.deleteFromList(sector);
      }
    );
  }
  public deleteFromList(sector: Sector) {
    const index = this.sectors.findIndex(e => e.libelle === sector.libelle);
    if (index !== -1) {
      this.sectors.splice(index, 1);
    }
  }
  public findAll() {
    this.http.get<Array<Sector>>(this._url).subscribe(
      data => {
        this.sectors = data;
      }
    );
  }
  public update() {
    this.http.put<number>(this._url, this.sectorFounded).subscribe(
      data => {
        if (data > 0) {
          this.deleteFromList(this.sectorFounded);
          this.sectors.push(this.clone(this.sectorFounded));
        }
      }, error => {
        console.log('error');
      }
    );
  }
  public save() {
    this.http.post<number>(this._url, this.sector).subscribe(
      data => {
        if (data > 0) {
          this.sectors.push(this.clone(this.sector));
          this.sector = null;
        }
      }, error => {
        console.log('error');
      }
    );
  }
  private clone(sector: Sector) {
    const myclone = new Sector();
    myclone.libelle = sector.libelle ;
    myclone.cycle = sector.cycle;
    return myclone;
  }
  get sector(): Sector {
    if (this._sector == null) {
      this._sector = new Sector();
    }
    return this._sector;
  }

  set sector(value: Sector) {
    this._sector = value;
  }

  get sectors(): Array<Sector> {
    if (this._sectors == null) {
      this._sectors = new Array<Sector>();
    }
    return this._sectors;
  }

  set sectors(value: Array<Sector>) {
    this._sectors = value;
  }

  get sectorFounded(): Sector {
    if (this._sectorFounded == null) {
      this._sectorFounded = new Sector();
    }
    if (this._sectorFounded.cycle == null) {
      this._sectorFounded.cycle = new Cycle();
    }
    return this._sectorFounded;
  }

  set sectorFounded(value: Sector) {
    this._sectorFounded = value;
  }
}
