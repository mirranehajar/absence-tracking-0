import {Component, OnInit} from '@angular/core';
import {Etudiant} from '../../controller/model/etudiant.model';
import {EtudiantService} from '../../controller/service/etudiant.service';

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss'],
})

export class TryComponent implements OnInit {
  constructor(private etudiantService: EtudiantService) {
  }

  ngOnInit(): void {
    this.etudiantService.findAll();
  }
  get etudiants(): Etudiant[] {
    return this.etudiantService.etudiants;
  }
}
