import {Enseignant} from './enseignant.model';
import {Module} from './module';

export class TypeSession {
  public id: number;
  public libelle: string;
  public reference: string;
  public module: Module;
  public enseignant: Enseignant;
}
