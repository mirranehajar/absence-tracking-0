import {Module} from './module';
import {TypeSession} from './type-session';
import {Enseignant} from './enseignant.model';
import {Groupe} from './groupe';

export class Session {
  public libelle: string;
  public dateStart: Date;
  public dateStop: Date;
  public typeSession: TypeSession;
  public module: Module;
  public enseignant: Enseignant;
  public groupes: Array<Groupe>;
}
