import {Groupe} from './groupe';
import {Module} from './module';
import {Sector} from './sector';

export class Semestre {
  public reference: string;
  public libelle: string;
  public number: number;
  public anneeUniversitaire: string;
  public sector: Sector;
  public modules: Module[];
  public groupes: Groupe[];
}
