import {Cycle} from './cycle';
import {Semestre} from './semestre';

export class Sector {
  public id: number;
  public libelle: string;
  public cycle: Cycle;
  public semestres: Semestre[];
}
