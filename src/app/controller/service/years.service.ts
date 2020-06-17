import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Years} from '../model/years';

@Injectable({
  providedIn: 'root',
})

export class YearsService {
  // tslint:disable-next-line:variable-name
  private _years: Years;
  // tslint:disable-next-line:variable-name
  private _yearss: Years[];
  // tslint:disable-next-line:variable-name
  private _yearsFounded: Years;
  private _yearssFounded: Years[];
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/years/';

  constructor(private http: HttpClient) { }

  public async findAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Years[]>(this._url, {headers}).toPromise().then(
      (data) => {
        this._yearss = data;
      },
    );
  }
  public findByLibelle(years: Years) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.get<Years>(this._url + 'libelle/' + years.libelle, {headers}).subscribe(
      (data) => {
        this._yearsFounded = data;
      },
    );
  }
  deleteByLibelle(years: Years) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.delete<number>(this._url + 'libelle/' + years.libelle, {headers}).subscribe(
      (data) => {
        this.deleteFromList(years);
      },
    );
  }
  public deleteFromList(years: Years) {
    const index = this.yearss.findIndex((y) => y.libelle === years.libelle);
    if (index !== -1) {
      this.yearss.splice(index, 1);
    }
  }
  async save() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<number>(this._url, this._years, {headers}).toPromise().then(
      (data) => {
        if (data > 0) {
          this._yearss.push(this.clone(this._years));
          this._years = null;
        }
      }, (error) => {
        console.log(error);
      },
    );
  }
  private clone(years: Years) {
    const myclone = new Years();
    myclone.libelle = years.libelle ;
    return myclone;
  }

  get years(): Years {
    if (this._years == null) {
      this._years = new Years();
    }
    return this._years;
  }

  set years(value: Years) {
    this._years = value;
  }

  get yearss(): Years[] {
    if (this._yearss == null) {
      this._yearss = new Array<Years>();
    }
    return this._yearss;
  }

  set yearss(value: Years[]) {
    this._yearss = value;
  }

  get yearsFounded(): Years {
    return this._yearsFounded;
  }

  set yearsFounded(value: Years) {
    this._yearsFounded = value;
  }

  get yearssFounded(): Years[] {
    return this._yearssFounded;
  }

  set yearssFounded(value: Years[]) {
    this._yearssFounded = value;
  }
}
