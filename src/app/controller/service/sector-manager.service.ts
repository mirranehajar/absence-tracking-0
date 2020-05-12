import { Injectable } from '@angular/core';
import {Sector} from '../model/sector';
import {HttpClient} from '@angular/common/http';
import {SectorManager} from '../model/sector-manager';

@Injectable({
  providedIn: 'root'
})
export class SectorManagerService {
  // tslint:disable-next-line:variable-name
  private _sectorManager: SectorManager;
  // tslint:disable-next-line:variable-name
  private _sectorManagers: Array<SectorManager>;
  // tslint:disable-next-line:variable-name
  private _sectorManagerFounded: SectorManager;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/responsableFiliere/';
  constructor(private http: HttpClient) { }

  public findByEnseignant(sectorManager: SectorManager) {
    this.http.get<SectorManager>(this._url + 'enseignant/' ).subscribe(
      data => {
        this.sectorManagerFounded = data;
      }
    );
  }
  public findByFilière(sectorManager: SectorManager) {
    this.http.get<SectorManager>(this._url + 'filiere/' ).subscribe(
      data => {
        this.sectorManagerFounded = data;
      }
    );
  }
  public deleteByFilière(sectorManager: SectorManager) {
    this.http.delete<number>(this._url + 'filiere/').subscribe(
      data => {
        console.log(data);
        this.deleteFromList(sectorManager);
      }
    );
  }
  public deleteFromList(sectorManager: SectorManager) {
    const index = this.sectorManagers.findIndex(e => e.sector === sectorManager.sector);
    if (index !== -1) {
      this.sectorManagers.splice(index, 1);
    }
  }
  public findAll() {
    this.http.get<Array<SectorManager>>(this._url).subscribe(
      data => {
        this.sectorManagers = data;
      }
    );
  }
  public update() {
    this.http.put<number>(this._url, this.sectorManagers).subscribe(
      data => {
        if (data > 0) {
          this.deleteFromList(this.sectorManagerFounded);
          this.sectorManagers.push(this.clone(this.sectorManagerFounded));
        }
      }, error => {
        console.log('error');
      }
    );
  }
  public save() {
    this.http.post<number>(this._url, this._sectorManager).subscribe(
      data => {
        if (data > 0) {
          this._sectorManagers.push(this.clone(this.sectorManager));
          this.sectorManager = null;
        }
      }, error => {
        console.log('error');
      }
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
    return this._sectorManager;
  }

  set sectorManager(value: SectorManager) {
    this._sectorManager = value;
  }

  get sectorManagers(): Array<SectorManager> {
    if (this._sectorManagers == null) {
      this._sectorManagers = new Array<SectorManager>();
    }
    return this._sectorManagers;
  }

  set sectorManagers(value: Array<SectorManager>) {
    this._sectorManagers = value;
  }

  get sectorManagerFounded(): SectorManager {
    return this._sectorManagerFounded;
  }

  set sectorManagerFounded(value: SectorManager) {
    this._sectorManagerFounded = value;
  }
}
