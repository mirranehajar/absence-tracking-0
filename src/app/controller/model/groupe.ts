import {Etudiant} from './etudiant.model';
import {Semestre} from './semestre';

export class Groupe {
  public reference: number;
  public libelle: string;
  public etudiants: Etudiant[];
  public semestre: Semestre;
}
