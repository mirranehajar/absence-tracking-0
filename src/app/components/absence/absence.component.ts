import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../controller/model/etudiant.model';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {SelectItem} from 'primeng';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})
export class AbsenceComponent implements OnInit {
  types: SelectItem[];
  constructor(private etudiantService: EtudiantService) {
    this.types = [
      {label: 'Prs', value: 'Apartment'},
      {label: 'AbsJ', value: 'House'},
      {label: 'AbsNJ', value: 'Studio'}
    ];
  }

  ngOnInit(): void {
    this.etudiantService.findAll();
  }
  get etudiants(): Array<Etudiant> {
    return this.etudiantService.etudiants;
  }
}
