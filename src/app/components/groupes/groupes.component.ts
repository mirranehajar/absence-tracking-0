import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Groupe} from '../../controller/model/groupe';
import {Sector} from '../../controller/model/sector';
import {SectorManager} from '../../controller/model/sector-manager';
import {Semestre} from '../../controller/model/semestre';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {GroupeService} from '../../controller/service/groupe.service';
import {SectorManagerService} from '../../controller/service/sector-manager.service';
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
  data: Groupe;

  constructor(private semestreService: SemestreService, private etudiantService: EtudiantService,
              private groupeService: GroupeService, private sectorService: SectorService,
              private sectorManagerService: SectorManagerService, private enseignantService: EnseignantService) {}

  async ngOnInit(): Promise<void> {
    await this.etudiantService.findAll();
    this.etudiantService.etudiantsGroupe = null;
    for (const e of this.etudiants) {
      if (e.groupe == null) {
        this.etudiantsGroupe.push(e);
      }
    }
    await this.groupeService.findBySemestre(this.semestreConnected);
    console.log(this.sectorManagerConnected);
    console.log(this.enseignantConnected);
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
  async remove(etudiant: Etudiant) {
    etudiant.groupe = null;
    this.etudiantService.etudiantFounded = etudiant;
    await this.etudiantService.update();
    await this.etudiantService.findAll();
    this.etudiantService.etudiantsGroupe = null;
    for (const e of this.etudiants) {
      if (e.groupe == null) {
        this.etudiantsGroupe.push(e);
      }
    }
    await this.groupeService.findBySemestre(this.semestreConnected);
  }
  onDrag(etudiant: Etudiant) {
    this.etudiantService.etudiantFounded = etudiant;
  }
  public findByLibelle(groupe: Groupe) {
    return this.groupeService.findByLibelle(groupe.libelle);
  }
  public async deleteByReference(groupe: Groupe) {
    this.etudiantService.etudiantFounded.groupe = null;
    console.log(this.etudiantsFounded);
    await this.etudiantService.update();
    this.groupeService.deleteByReference(groupe);
    await this.groupeService.findBySemestre(this.semestreConnected);
    this.displayBasic2 = false;
    await this.groupeService.findBySemestre(this.semestreConnected);
  }
  public async update() {
    this.groupeService.update();
    await this.groupeService.findBySemestre(this.semestreConnected);
    this.displayBasic2 = false;
  }
  public async save() {
    this.groupeService.groupe.semestre = this.semestreConnected;
    this.data = this.groupe;
    console.log('data : ' + this.data.etudiants);
    await this.groupeService.save();
    for ( const e of this.data.etudiants) {
      this.etudiantService.etudiantFounded = e;
      this.etudiantService.etudiantFounded.sector = this.groupeSaved.semestre.sector;
      this.etudiantService.etudiantFounded.groupe = this.groupeSaved;
      this.etudiantService.update();
    }
    await this.groupeService.findBySemestre(this.semestreConnected);
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
  get groupesFounded(): Groupe[] {
    return this.groupeService.groupesFounded;
  }
  dropGroupe(event: CdkDragDrop<Etudiant[]>, groupe: Groupe) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.etudiantService.etudiantFounded.sector = groupe.semestre.sector;
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
  get semestreConnected(): Semestre {
    return this.semestreService.semestreConnected;
  }
  get enseignantConnected(): Enseignant {
    return this.enseignantService.enseignantConnected;
  }
  get sectorManagerConnected(): SectorManager {
    return this.sectorManagerService.sectorManagerConnected;
  }
  get groupeSaved(): Groupe {
    return this.groupeService.groupeSaved;
  }
  get etudiantsGroupe(): Etudiant[] {
    return this.etudiantService.etudiantsGroupe;
  }
}
