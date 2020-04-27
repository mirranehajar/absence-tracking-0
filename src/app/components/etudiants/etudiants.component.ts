import { Component, OnInit } from '@angular/core';
import {ConfirmationService, Message} from 'primeng/api';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {Etudiant} from '../../controller/model/etudiant.model';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.scss'],
  providers: [ConfirmationService]
})
export class EtudiantsComponent implements OnInit {
  msgs: Message[] = [];
  displayBasic: boolean;
  position: string;

  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.etudiantService.findAll();
  }

  public deleteByCne(etudiant: Etudiant) {
    this.etudiantService.deleteByCne(etudiant);
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  public save() {
    this.etudiantService.save();
    this.displayBasic = false;
  }
  get etudiant(): Etudiant {
    return this.etudiantService.etudiant;
  }
  get etudiants(): Array<Etudiant> {
    return this.etudiantService.etudiants;
  }


}
