import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Module} from '../model/module';
import {Semestre} from '../model/semestre';
import {Subject} from '../model/subject';
import {TypeSession} from '../model/type-session';
import {TypeSessionService} from './type-session.service';
import {Enseignant} from '../model/enseignant.model';
import {Sector} from '../model/sector';

@Injectable({
  providedIn: 'root',
})

export class ModuleService {
  // tslint:disable-next-line:variable-name
  private _module: Module;
  // tslint:disable-next-line:variable-name
  private _modules: Module[];
  // tslint:disable-next-line:variable-name
  private _moduleFounded: Module;
  private _modulesFounded: Module[];
  private _modulesConnected: Module[];
  // tslint:disable-next-line:variable-name
  private _moduleConnected: Module;
  private _url = 'http://localhost:8090/absence-tracking/module/';

  constructor(private http: HttpClient, private typeSessionService: TypeSessionService) { }

  public async update(module: Module) {
          await this.deleteFromList(module);
          await this.modules.push(this.clone(module));
        }
  public async findAll() {
    await this.http.get<Module[]>(this._url).toPromise().then(
      async (data) => {
        this.modules = data;
      },
    );
  }
  public async findBySector(sector: Sector) {
    await this.http.post<Module[]>(this._url + 'sector/', sector).toPromise().then(
      (data) => {
        this.modules = data;
      },
    );
  }
  public async findBySemestre(semestre: Semestre) {
    await this.http.post<Module[]>(this._url + 'semestre/', semestre).toPromise().then(
      (data) => {
        this.modulesFounded = data;
      },
    );
  }
  public findByAbreveation(module: Module) {
    this.http.get<Module[]>(this._url + 'abreveation/' + module.abreveation).subscribe(
      (data) => {
        this.modulesFounded = data;
      },
    );
  }
  public async findByLibelle(module: Module) {
    await this.http.get<Module>(this._url + 'libelle/' + module.libelle).toPromise().then(
      (data) => {
        this.moduleFounded = data;
      },
    );
  }
  deleteByLibelle(module: Module) {
    this.http.delete<number>(this._url + 'libelle/' + module.libelle).subscribe(
      (data) => {
        this.deleteFromList(module);
      },
    );
  }
  public deleteFromList(module: Module) {
    const index = this.modules.findIndex((e) => e.libelle === module.libelle);
    if (index !== -1) {
      this.modules.splice(index, 1);
    }
  }
  async save() {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<Module>(this._url, this.module, {headers}).toPromise().then(
      (data) => {
        if (data) {
          console.log(data);
          this.modules.push(this.clone(data));
          this.module = null;
        }
      }, (error) => {
        console.log(error);
      },
    );
  }
  private clone(module: Module) {
    const myclone = new Module();
    myclone.libelle = module.libelle ;
    myclone.id = module.id ;
    myclone.abreveation = module.abreveation;
    myclone.semestre = module.semestre;
    return myclone;
  }
  get module(): Module {
    if (this._module == null) {
      this._module = new Module();
    }
    if (this._module.subjects == null) {
      this._module.subjects = new Array<Subject>();
    }
    return this._module;
  }

  set module(value: Module) {
    this._module = value;
  }

  get modules(): Module[] {
    if (this._modules == null) {
      this._modules = new Array<Module>();
    }
    return this._modules;
  }

  set modules(value: Module[]) {
    this._modules = value;
  }

  get moduleFounded(): Module {
    if (this._moduleFounded == null) {
      this._moduleFounded = new Module();
    }
    if (this._moduleFounded.subjects == null) {
      this._moduleFounded.subjects = new Array<Subject>();
    }
    return this._moduleFounded;
  }

  set moduleFounded(value: Module) {
    this._moduleFounded = value;
  }

  get modulesFounded(): Module[] {
    if (this._modulesFounded == null) {
      this._modulesFounded = new Array<Module>();
    }
    return this._modulesFounded;
  }

  set modulesFounded(value: Module[]) {
    this._modulesFounded = value;
  }
  public async findByModule(module: Module) {
   await this.typeSessionService.findByModule(module);
  }
  get typeSessionsFounded(): TypeSession[] {
    return this.typeSessionService.typeSessionsFounded;
  }
  get moduleConnected(): Module {
    if (this._moduleConnected == null) {
      this._moduleConnected = new Module();
    }
    if (this._moduleConnected.subjects == null) {
      this._moduleConnected.subjects = new Array<Subject>();
    }
    return this._moduleConnected;
  }

  set moduleConnected(value: Module) {
    this._moduleConnected = value;
  }

  get modulesConnected(): Module[] {
    if (this._modulesConnected == null) {
      this._modulesConnected = new Array<Module>();
    }
    return this._modulesConnected;
  }

  set modulesConnected(value: Module[]) {
    this._modulesConnected = value;
  }
}
