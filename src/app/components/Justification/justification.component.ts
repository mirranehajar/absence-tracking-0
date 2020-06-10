import {Component, OnInit} from '@angular/core';
import {Absence} from '../../controller/model/absence';
import {AbsenceService} from '../../controller/service/absence.service';
import {EtudiantService} from '../../controller/service/etudiant.service';

@Component({
  selector: 'app-try',
  templateUrl: './justification.component.html',
  styleUrls: ['./justification.component.scss'],
})

export class JustificationComponent implements OnInit {
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
    console.log(this.absenceFounded);
    this.basicDialog = true;
  }
  update() {
    return this.absenceService.update();
    this.basicDialog = false;
  }
}
