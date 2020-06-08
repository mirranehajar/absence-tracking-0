import {Component, OnInit} from '@angular/core';
import {Absence} from '../../controller/model/absence';
import {Etudiant} from '../../controller/model/etudiant.model';
import {AbsenceService} from '../../controller/service/absence.service';
import {EtudiantService} from '../../controller/service/etudiant.service';

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss'],
})

export class TryComponent implements OnInit {
  basicDialog: boolean;
  constructor(private etudiantService: EtudiantService, private absenceService: AbsenceService) {
  }

  ngOnInit() {
    this.absenceService.findAll();
  }

  get absences(): Absence[] {
    return this.absenceService.absences;
  }
  get absenceFounded(): Absence {
    return this.absenceService.absenceFounded;
  }
  ShowBasicDialog(absence: Absence) {
    this.absenceService.absenceFounded = absence;
    this.basicDialog = true;
  }
  update() {
    return this.absenceService.update();
  }
}
