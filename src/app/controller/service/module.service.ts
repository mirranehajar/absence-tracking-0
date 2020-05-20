import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Enseignant} from '../model/enseignant.model';
import {Module, TypeSeance} from '../model/module';

@Injectable({
  providedIn: 'root',
})

export class ModuleService {
  // tslint:disable-next-line:variable-name
  private _typeSeances: TypeSeance[];
  // tslint:disable-next-line:variable-name
  private  _typeSeance: TypeSeance;
  // tslint:disable-next-line:variable-name
  private _module: Module;
  // tslint:disable-next-line:variable-name
  private _modules: Module[];
  // tslint:disable-next-line:variable-name
  private _moduleFounded: Module;
  private _enseignant: Enseignant;
  private _enseignants: Enseignant[];
  // tslint:disable-next-line:variable-name
  private _url = 'http://localhost:8090/absence-tracking/module/';
  // tslint:disable-next-line:variable-name
  private _urlT = 'http://localhost:8090/absence-tracking/typeSeance/';
  private _urlE = 'http://localhost:8090/absence-tracking/enseignant/';

  private ensaignantFounded: Enseignant;
  constructor(private http: HttpClient) { }

  public findByLibelle(module: Module) {
    this.http.get<Module>(this._url + 'libelle/' + module.libelle).subscribe(
      (data) => {
        this.moduleFounded = data;
      },
    );
  }

  public findByLastName(enseignant: Enseignant) {
    this.http.get<Enseignant>(this._url + 'lastName/' + enseignant.lastName).subscribe(
      (data) => {
        this.ensaignantFounded = data;
      },
    );
  }
  public findAll() {
    this.http.get<Module[]>(this._url).subscribe(
      (data) => {
        this.modules = data;
      },
    );
  }
  public findAllT() {
    this.http.get<TypeSeance[]>(this._urlT).subscribe(
      (data) => {
        this.typeSeances = data;
      },
    );
  }

  public findAllE() {
    this.http.get<Enseignant[]>(this._urlT).subscribe(
      (data) => {
        this.enseignants = data;
      },
    );
  }
  private clone(module: Module) {
    const myclone = new Module();
    myclone.libelle = module.libelle ;
    return myclone;
  }
  private cloneT(typeSeance: TypeSeance) {
    const mycloneT = new TypeSeance();
    mycloneT.reference = typeSeance.reference;
    mycloneT.libelle = typeSeance.libelle ;
    mycloneT.module.libelle = typeSeance.module.libelle;
    mycloneT.enseignant.lastName = typeSeance.enseignant.lastName;
    return mycloneT;
  }
  get module(): Module {
    if (this._module == null) {
      this._module = new Module();
    }
    return this._module;
  }

  get modules(): Module[] {
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
  set modules(value: Module[]) {
    this._modules = value;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set moduleFounded(value: Module) {
    this._moduleFounded = value;
  }

  get typeSeance(): TypeSeance {
    if (this._typeSeance == null) {
      this._typeSeance = new TypeSeance();
    }
    return this._typeSeance;
  }

  set typeSeance(value: TypeSeance) {
    this._typeSeance = value;
  }

  get typeSeances(): TypeSeance[] {
    if (this._typeSeances == null) {
      this._typeSeances = new Array<TypeSeance>();
    }
    return this._typeSeances;
  }

  set typeSeances(value: TypeSeance[]) {
    this._typeSeances = value;
  }

  get enseignant(): Enseignant {
    if (this._enseignant == null) {
      this._enseignant = new Enseignant();
    }
    return this._enseignant;
  }

  set enseignant(value: Enseignant) {
    this._enseignant = value;
  }

  get enseignants(): Enseignant[] {
    if (this._enseignants == null) {
      this._enseignants = new Array<Enseignant>();
    }
    return this._enseignants;
  }

  set enseignants(value: Enseignant[]) {
    this._enseignants = value;
  }

  public deleteFromList(module: Module) {
    const index = this.modules.findIndex((e) => e.libelle === module.libelle);
    if (index !== -1) {
      this.modules.splice(index, 1);
    }
  }

  deleteByLibelle(m: Module) {
    this.http.delete<number>(this._url + 'libelle/' + m.libelle).subscribe(
      (data) => {
        console.log(data);
        this.deleteFromList(m);
      },
    );
  }

  saveModule() {
    this.http.post<number>(this._url, this.module).subscribe(
      (data) => {
        if (data > 0) {
          this.modules.push(this.clone(this.module));
          this.module = null;
        }
      }, (error) => {
        console.log('error');
      },
    );
  }

  saveTypeSeance() {
    this.http.post<number>(this._url, this.typeSeance).subscribe(
      (data) => {
        if (data > 0) {
          this.typeSeances.push(this.cloneT(this.typeSeance));
          this.typeSeance = null;
        }
      }, (error) => {
        console.log('error');
      },
    );
  }
}
