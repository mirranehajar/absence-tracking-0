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
  cols: any[];

  constructor(private semestreService: SemestreService, private etudiantService: EtudiantService,
              private groupeService: GroupeService, private sectorService: SectorService) {}

  async ngOnInit(): Promise<void> {
    await this.etudiantService.findAll();
    this.groupeService.findAll();
    this.cols = [
      { field: 'cne', header: 'Cne' },
      { field: 'codeApogee', header: 'C.Apogée' },
      { field: 'cin', header: 'Cin' },
      { field: 'lastName', header: 'Nom' },
      { field: 'firstName', header: 'Prénom' },
      { field: 'mail', header: 'Email' },
      { field: 'tel', header: 'Tel' },
      { field: 'birthDay', header: 'J.Naissance' },
      { field: 'nbrAbsence', header: 'N.Absence' },
    ];
  }
  onDrag(etudiant: Etudiant) {
    this.etudiantService.etudiantFounded = etudiant;
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
    window.location.reload();
  }
  public save() {
    this.groupeService.save();
    for ( const e of this.groupe.etudiants) {
      this.etudiantService.etudiantFounded = e;
      this.etudiantService.etudiantFounded.groupe = this.groupe;
      this.etudiantService.update();
    }
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
  dropGroupe(event: CdkDragDrop<Etudiant[]>, groupe: Groupe) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.etudiantService.etudiantFounded.groupe = groupe;
      console.log(this.etudiantsFounded);
      this.etudiantService.update();
    }
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
  get etudiantsFounded(): Etudiant[] {
    return this.etudiantService.etudiantsFounded;
  }
  public findByGroupe(groupe: Groupe) {
    return this.etudiantService.findByGroupe(groupe);
    this.groupeFounded.etudiants = this.etudiantsFounded;
    this.etudiantService.update();
    console.log(this.etudiantsFounded);
  }
}
