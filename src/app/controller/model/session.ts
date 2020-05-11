import {TypeSession} from './type-session';
import {Groupe} from './groupe';

export class Session {
  public libelle: string;
  public reference: string;
  public dateStart: Date;
  public dateStop: Date;
  public typeSession: TypeSession;
  public groupes: Array<Groupe>;
}
