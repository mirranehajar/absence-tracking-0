import {Absence} from './absence';
import {Enseignant} from './enseignant.model';

export class Notification {
  public id: number;
  public absence: Absence;
  public enseignant: Enseignant;
  public state: string;
  public contenu: string;
}
