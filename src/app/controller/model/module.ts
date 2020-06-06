import {Semestre} from './semestre';
import {Subject} from './subject';

export class Module {
  public id: number;
  public libelle: string;
  public abreveation: string;
  public semestre: Semestre;
  public subjects: Subject[];
}
