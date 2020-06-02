import {Groupe} from './groupe';
import {Sector} from './sector';

export class Etudiant {
  public cin: string ;
  public cne: string ;
  public  codeApogee: number;
  public  firstName: string ;
  public lastName: string ;
  public birthDay: Date;
  public tel: number;
  public nbrAbsence: number;
  public mail: string;
  public password: string;
  public role: number;
  public image: any;
  public filiere: Sector;
  public groupe: Groupe;
}
