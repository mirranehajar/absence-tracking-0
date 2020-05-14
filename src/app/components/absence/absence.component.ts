import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../controller/model/etudiant.model';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {SelectItem} from 'primeng';
import {Absence} from '../../controller/model/absence';
import {AbsenceService} from '../../controller/service/absence.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})
export class AbsenceComponent implements OnInit {
  types: SelectItem[];
  constructor(private etudiantService: EtudiantService, private absenceService: AbsenceService) {
    this.types = [
      {label: 'Prs', value: false},
      {label: 'AbsJ', value: true},
      {label: 'AbsNJ', value: true}
    ];
  }

  ngOnInit(): void {
    this.etudiantService.findAll();
  }
  get etudiants(): Array<Etudiant> {
    return this.etudiantService.etudiants;
  }
  get absences(): Array<Absence> {
    return this.absenceService.absences;
  }
  get absence(): Absence {
    return this.absenceService.absence;
  }
  public save() {
    return this.absenceService.save();
  }
}
