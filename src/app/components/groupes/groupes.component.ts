import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Groupe} from '../../controller/model/groupe';
import {Sector} from '../../controller/model/sector';
import {Semestre} from '../../controller/model/semestre';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {GroupeService} from '../../controller/service/groupe.service';
import {SectorService} from '../../controller/service/sector.service';
import {SemestreService} from '../../controller/service/semestre.service';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.scss'],
})
export class GroupesComponent implements OnInit {
  index = -1;
  displayBasic: boolean;
  displayBasic2: boolean;

  constructor(private semestreService: SemestreService, private etudiantService: EtudiantService,
              private groupeService: GroupeService, private sectorService: SectorService) {}

  ngOnInit(): void {
    this.etudiantService.findAll();
    this.groupeService.findAll();
  }
  openNext() {
    this.index = (this.index === 3) ? 0 : this.index + 1;
  }

  openPrev() {
    this.index = (this.index <= 0) ? 3 : this.index - 1;
  }
  public findByLibelle(groupe: Groupe) {
    return this.groupeService.findByLibelle(groupe);
  }
  public deleteByReference(groupe: Groupe) {
    this.groupeService.deleteByReference(groupe);
    this.displayBasic2 = false;
  }
  public update() {
    this.groupeService.update();
    this.displayBasic2 = false;
  }
  public save() {
    this.groupeService.save();
    this.displayBasic = false;
  }
  get etudiants(): Etudiant[] {
    return this.etudiantService.etudiants;
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  showBasicDialog2(groupe: Groupe) {
    this.displayBasic2 = true;
    this.findByLibelle(groupe);
  }
  get groupe(): Groupe {
    return this.groupeService.groupe;
  }
  get groupes(): Groupe[] {
    return this.groupeService.groupes;
  }
  get groupeFounded(): Groupe {
    return this.groupeService.groupeFounded;
  }
  drop(event: CdkDragDrop<Etudiant[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  get sectors(): Sector[] {
    return this.sectorService.sectors;
  }
  get sector(): Sector {
    return this.sectorService.sector;
  }
  get semestres(): Semestre[] {
    return this.semestreService.semestres;
  }
  get semestre(): Semestre {
    return this.semestreService.semestre;
  }
}
