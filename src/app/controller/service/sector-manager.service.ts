import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Enseignant} from '../model/enseignant.model';
import {Sector} from '../model/sector';
import {SectorManager} from '../model/sector-manager';
import {SectorService} from './sector.service';

@Injectable({
  providedIn: 'root',
})
export class SectorManagerService {
  // tslint:disable-next-line:variable-name
  private _sectorManager: SectorManager;
  // tslint:disable-next-line:variable-name
  private _sectorManagers: SectorManager[];
  // tslint:disable-next-line:variable-name
  private _sectorManagerFounded: SectorManager;
  private _sectorManagerConnected: SectorManager;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/sectorManager/';
  constructor(private http: HttpClient, private sectorService: SectorService) { }

  public async findByEnseignant(enseignant: Enseignant) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<SectorManager>(this._url + 'enseignant' , enseignant, {headers}).toPromise().then(
      (data) => {
        this.sectorManagerFounded = data;
      },
    );
  }
  public async findBySector(sector: Sector) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<SectorManager>(this._url + 'sector', sector, {headers}).toPromise().then(
      (data) => {
        this.sectorManagerFounded = data;
      },
    );
  }
  public deleteByFilière(sectorManager: SectorManager) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete<number>(this._url + 'sector/', {headers}).subscribe(
      (data) => {
        console.log(data);
        this.deleteFromList(sectorManager);
      },
    );
  }
  public deleteFromList(sectorManager: SectorManager) {
    const index = this.sectorManagers.findIndex((e) => e.sector === sectorManager.sector);
    if (index !== -1) {
      this.sectorManagers.splice(index, 1);
    }
  }
  public findAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.get<SectorManager[]>(this._url, {headers}).subscribe(
      (data) => {
        this.sectorManagers = data;
      },
    );
  }
  public update() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    // tslint:disable-next-line:max-line-length
    this.http.post<number>(this._url + 'update/' + this.sectorService.sectorFounded.libelle , this.sectorManagerFounded, {headers}).subscribe(
      (data) => {
        if (data > 0) {
          this.deleteFromList(this.sectorManagerFounded);
          this.sectorManagers.push(this.clone(this.sectorManagerFounded));
        }
      }, (error) => {
        console.log(error);
      },
    );
  }
  public async save() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<number>(this._url + this.sectorManager.sector.libelle, this.sectorManager, {headers}).toPromise().then(
      (data) => {
        if (data > 0) {
          this.sectorManagers.push(this.clone(this.sectorManager));
          this.sectorManager = null;
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
  private clone(sectorManager: SectorManager) {
    const myclone = new SectorManager();
    myclone.sector = sectorManager.sector;
    myclone.enseignant = sectorManager.enseignant;
    return myclone;
  }
  get sectorManager(): SectorManager {
    if (this._sectorManager == null) {
      this._sectorManager = new SectorManager();
    }
    if (this._sectorManager.sector == null) {
      this._sectorManager.sector = new Sector();
    }
    return this._sectorManager;
  }

  set sectorManager(value: SectorManager) {
    this._sectorManager = value;
  }

  get sectorManagers(): SectorManager[] {
    if (this._sectorManagers == null) {
      this._sectorManagers = new Array<SectorManager>();
    }
    return this._sectorManagers;
  }

  set sectorManagers(value: SectorManager[]) {
    this._sectorManagers = value;
  }

  get sectorManagerFounded(): SectorManager {
    if (this._sectorManagerFounded == null) {
      this._sectorManagerFounded = new SectorManager();
    }
    if (this._sectorManagerFounded.enseignant == null) {
      this._sectorManagerFounded.enseignant = new Enseignant();
    }
    if (this._sectorManagerFounded.sector == null) {
      this._sectorManagerFounded.sector = new Sector();
    }
    return this._sectorManagerFounded;
  }

  set sectorManagerFounded(value: SectorManager) {
    this._sectorManagerFounded = value;
  }

  get sectorManagerConnected(): SectorManager {
    if (this._sectorManagerConnected == null) {
      this._sectorManagerConnected = new SectorManager();
    }
    if (this._sectorManagerConnected.enseignant == null) {
      this._sectorManagerConnected.enseignant = new Enseignant();
    }
    if (this._sectorManagerConnected.sector == null) {
      this._sectorManagerConnected.sector = new Sector();
    }
    return this._sectorManagerConnected;
  }

  set sectorManagerConnected(value: SectorManager) {
    this._sectorManagerConnected = value;
  }
}
