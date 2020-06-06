import {Enseignant} from './enseignant.model';
import {Module} from './module';
import {Subject} from './subject';

export class TypeSession {
  public id: number;
  public libelle: string;
  public reference: string;
  public subject: Subject;
  public enseignant: Enseignant;
  public module: Module;
}
