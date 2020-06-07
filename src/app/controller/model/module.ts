import {Semestre} from './semestre';
import {Subject} from './subject';
import {TypeSession} from './type-session';

export class Module {
  public id: number;
  public libelle: string;
  public abreveation: string;
  public semestre: Semestre;
  public subjects: Subject[];
  public typeSessions: TypeSession[];
}
