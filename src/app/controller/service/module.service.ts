import {Injectable} from '@angular/core';
import {Module} from '../model/module';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ModuleService {
  // tslint:disable-next-line:variable-name
  private _module: Module;
  // tslint:disable-next-line:variable-name
  private _modules: Array<Module>;
  // tslint:disable-next-line:variable-name
  private _moduleFounded: Module;
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/module/';
  constructor(private http: HttpClient) { }

  public findByLibelle(module: Module) {
    this.http.get<Module>(this._url + 'libelle/' + module.libelle).subscribe(
      data => {
        this.moduleFounded = data;
      }
    );
  }
  public findAll() {
    this.http.get<Array<Module>>(this._url).subscribe(
      data => {
        this.modules = data;
      }
    );
  }
  private clone(module: Module) {
    const myclone = new Module();
    myclone.libelle = module.libelle ;
    return myclone;
  }
  get module(): Module {
    if (this._module == null) {
      this._module = new Module();
    }
    return this._module;
  }

  get modules(): Array<Module> {
    if (this._modules == null) {
      this._modules = new Array<Module>();
    }
    return this._modules;
  }
  get moduleFounded(): Module {
    return this._moduleFounded;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set module(value: Module) {
    this._module = value;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set modules(value: Array<Module>) {
    this._modules = value;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set moduleFounded(value: Module) {
    this._moduleFounded = value;
  }

  public deleteFromList(module: Module) {
    const index = this.modules.findIndex(e => e.libelle === module.libelle);
    if (index !== -1) {
      this.modules.splice(index, 1);
    }
  }
}
