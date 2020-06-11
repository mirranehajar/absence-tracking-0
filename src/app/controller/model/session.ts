import {Groupe} from './groupe';
import {TypeSession} from './type-session';

export class Session {
  public libelle: string;
  public reference: string;
  public dateStart: Date;
  public dateStop: Date;
  public typeSession: TypeSession;
}
