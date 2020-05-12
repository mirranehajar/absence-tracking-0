import {Etudiant} from './etudiant.model';
import {Session} from './session';

export class Absence {
  public id: number;
  public ref: string;
  public absent: boolean;
  public justification: string;
  public etudiant: Etudiant;
  public séance: Session;
}
