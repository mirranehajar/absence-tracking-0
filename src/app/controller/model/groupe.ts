import {Etudiant} from './etudiant.model';
import {Semestre} from './semestre';

export class Groupe {
  public libelle: string;
  public etudiants: Array<Etudiant>;
  public semestre: Semestre;
}
