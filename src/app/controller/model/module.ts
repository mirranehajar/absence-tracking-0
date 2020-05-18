import {Enseignant} from './enseignant.model';

export class Module {
  public id: number;
  public libelle: string;
}

// tslint:disable-next-line:max-classes-per-file
export class TypeSeance {
  public id: number;
  public reference: string;
  public libelle: string;
  public module: Module;
  public enseignant: Enseignant;
}
