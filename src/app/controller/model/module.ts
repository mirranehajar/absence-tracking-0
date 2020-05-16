import {Enseignant} from './enseignant.model';

export class Module {
  public id: number;
  public libelle: string;
}

export class TypeSeance {
  public id: number;
  public reference: string;
  public libelle: string;
  public module: Module;
  public enseignant: Enseignant;
}
