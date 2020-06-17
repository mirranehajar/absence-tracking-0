import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng';
import {Absence} from '../../controller/model/absence';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Session} from '../../controller/model/session';
import {AbsenceService} from '../../controller/service/absence.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {SessionService} from '../../controller/service/session.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],
})
export class AbsenceComponent implements OnInit {
  types: SelectItem[];
  cols: any[];
  constructor(private etudiantService: EtudiantService, private absenceService: AbsenceService, private sessionService: SessionService) {
    this.types = [
      {label: 'Prs', value: false},
      {label: 'Abs', value: true},
    ];
  }

  async ngOnInit(): Promise<void> {
    this.etudiantService.findAll();
    this.absenceService.findBySession(this.sessionFounded);
    this.cols = [
      { field: 'cne', header: 'Cne' },
      { field: 'codeApogee', header: 'C.Apogée' },
      { field: 'lastName', header: 'Nom' },
      { field: 'firstName', header: 'Prénom' },
    ];
  }
  get etudiants(): Etudiant[] {
    return this.etudiantService.etudiants;
  }
  get absences(): Absence[] {
    return this.absenceService.absences;
  }
  get absence(): Absence {
    return this.absenceService.absence;
  }
  get absenceFounded(): Absence {
    return this.absenceService.absenceFounded;
  }
  public save() {
    return this.absenceService.save();
  }
  public update(absence: Absence) {
    this.absenceService.absenceFounded = absence;
    this.absenceService.update();
  }
  get absencesFounded(): Absence[] {
    return this.absenceService.absencesFounded;
  }
  get sessionFounded(): Session {
    return this.sessionService.sessionFounded;
  }
}
