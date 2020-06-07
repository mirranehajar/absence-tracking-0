import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Module} from '../model/module';
import {Session} from '../model/session';
import {TypeSessionService} from './type-session.service';
import {TypeSession} from '../model/type-session';

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
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/module/';

  constructor(private http: HttpClient, private typeSessionService: TypeSessionService) { }

  public findAll() {
    this.http.get<Module[]>(this._url).subscribe(
      async (data) => {
        this.modules = data;
        for ( const m of this.modules) {
          await this.findByModule(m);
          console.log(this.typeSessionsFounded);
          m.typeSessions = this.typeSessionsFounded;
          console.log(m);
        }
      },
    );
  }
  public findBySemestre(module: Module) {
    this.http.post<Module[]>(this._url + 'semestre/', module.semestre).subscribe(
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
  public findByLibelle(module: Module) {
    this.http.get<Module>(this._url + 'libelle/' + module.libelle).subscribe(
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
  save() {
    this.http.post<number>(this._url, this.module).subscribe(
      (data) => {
        if (data > 0) {
          this.modules.push(this.clone(this.module));
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
    myclone.abreveation = module.abreveation;
    myclone.semestre = myclone.semestre;
    return myclone;
  }
  get module(): Module {
    if (this._module == null) {
      this._module = new Module();
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
    return this._moduleFounded;
  }

  set moduleFounded(value: Module) {
    this._moduleFounded = value;
  }

  get modulesFounded(): Module[] {
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
}
