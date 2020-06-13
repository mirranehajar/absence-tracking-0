import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Cycle} from '../model/cycle';
import {Sector} from '../model/sector';
import {Semestre} from '../model/semestre';
import {SemestreService} from './semestre.service';

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  // tslint:disable-next-line:variable-name
  private _sector: Sector;
  // tslint:disable-next-line:variable-name
  private _sectors: Sector[];
  // tslint:disable-next-line:variable-name
  private _sectorFounded: Sector;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/sector/';
  constructor(private http: HttpClient, private semestreService: SemestreService) { }

  public findByCycle(sector: Sector) {
    this.http.get<Sector>(this._url + 'cycle').subscribe(
      (data) => {
        this.sectorFounded = data;
      },
    );
  }
  public async findByLibelle(libelle: string) {
    await this.http.get<Sector>(this._url + 'libelle/' + libelle).toPromise().then(
      (data) => {
        this.sectorFounded = data;
      },
    );
  }
  public async deleteByLibelle(sector: Sector) {
    await this.http.delete<number>(this._url + 'libelle/' + sector.libelle).toPromise().then(
      (data) => {
        console.log(data);
        this.deleteFromList(sector);
      },
    );
  }
  public deleteFromList(sector: Sector) {
    const index = this.sectors.findIndex((e) => e.libelle === sector.libelle);
    if (index !== -1) {
      this.sectors.splice(index, 1);
    }
  }
  public async findAll() {
    await this.http.get<Sector[]>(this._url).toPromise().then(
      async (data) => {
        this.sectors = data;
        for (const s of this.sectors) {
          await this.findBySector(s);
          s.semestres = this.semestresFounded;
        }
      },
    );
  }
  public update() {
    console.log(this.sectorFounded);
    this.http.post<number>(this._url + 'update', this.sectorFounded).subscribe(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.sectorFounded);
          this.sectors.push(this.clone(this.sectorFounded));
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  public save() {
    this.http.post<number>(this._url, this.sector).subscribe(
      (data) => {
        if (data > 0) {
          this.sectors.push(this.clone(this.sector));
          this.sector = null;
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  private clone(sector: Sector) {
    const myclone = new Sector();
    myclone.libelle = sector.libelle ;
    myclone.cycle = sector.cycle;
    myclone.semestres = sector.semestres;
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

  get sectors(): Sector[] {
    if (this._sectors == null) {
      this._sectors = new Array<Sector>();
    }
    return this._sectors;
  }

  set sectors(value: Sector[]) {
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
  public async findBySector(sector: Sector) {
   await this.semestreService.findBySector(sector);
  }
  get semestresFounded(): Semestre[] {
    return this.semestreService.semestresFounded;
  }
}
