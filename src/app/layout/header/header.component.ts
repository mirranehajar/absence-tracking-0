import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Cycle} from '../../controller/model/cycle';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Sector} from '../../controller/model/sector';
import {SectorManager} from '../../controller/model/sector-manager';
import {Semestre} from '../../controller/model/semestre';
import {CycleService} from '../../controller/service/cycle.service';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {SectorManagerService} from '../../controller/service/sector-manager.service';
import {SectorService} from '../../controller/service/sector.service';
import {SemestreService} from '../../controller/service/semestre.service';

// @ts-ignore
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    categoriesList: Sector[];
    items: MenuItem[];
    item: MenuItem;
    classes = {
    topnav: true,
    responsive: false,
  };
    displayBasic: boolean;
    displayBasic2: boolean;
    displayBasic3: boolean;
    displayBasic4: boolean;
    filiere: string;

   constructor(public sectorManagerService: SectorManagerService, public sectorService: SectorService,
               public cycleService: CycleService, public enseignantService: EnseignantService, public semestreService: SemestreService) { }

  async ngOnInit(): Promise<void> {
    this.cycleService.findAll();
    this.sectorService.findAll();
    await this.semestreService.findAll();
    this.enseignantService.findAll();
    this.items = [
      {
        label: 'Acceuil',
        icon: 'pi pi-fw pi-home',
      },
      {separator: true},
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Filière',
        icon: 'pi pi-fw pi-list',
        items: [
          {
            label: 'SIR',
            icon: 'pi pi-fw pi-desktop',
          },
          {
            label: 'IRISI',
            icon: 'pi pi-fw pi-desktop',
          },
          {
            label: 'SDAD',
            icon: 'pi pi-fw pi-desktop',
          },
          {
            label: 'Ajouter une filière',
            icon: 'pi pi-fw pi-plus',
            command: (event) => {this.showBasicDialog(); },
          },
        ],
      },
      {
        label: 'Étudiants',
        icon: 'pi pi-fw pi-users',
      },
      {
        label: 'Enseignants',
        icon: 'pi pi-fw pi-star',
      },
    ];
  }

  setClasses() {
    return this.classes;
  }

  onNavClick() {
    this.classes.responsive = !this.classes.responsive;
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  showBasicDialog2(sector: Sector) {
    this.displayBasic2 = true;
    this.findByLibelle(sector);
  }
  showBasicDialog3(libelle: string) {
     this.filiere = libelle;
     this.displayBasic3 = true;
  }
  get sectors(): Sector[] {
    return this.sectorService.sectors;
  }
  get sector(): Sector {
    return this.sectorService.sector;
  }
  get sectorFounded(): Sector {
    return this.sectorService.sectorFounded;
  }
  get cycles(): Cycle[] {
    return this.cycleService.cycles;
  }
  get cycle(): Cycle {
    return this.cycleService.cycle;
  }
  get enseignant(): Enseignant {
    return this.enseignantService.enseignant;
  }
  get enseignants(): Enseignant[] {
    return this.enseignantService.enseignants;
  }
  get enseignantFounded(): Enseignant {
    return this.enseignantService.enseignantFounded;
  }
  get sectorManagers(): SectorManager[] {
    return this.sectorManagerService.sectorManagers;
  }
  get sectorManager(): SectorManager {
    return this.sectorManagerService.sectorManager;
  }
  get sectorManagerFounded(): SectorManager {
    return this.sectorManagerService.sectorManagerFounded;
  }
  public save() {
    this.sectorService.save();
    this.sectorManagerService.sectorManager.sector = this.sector;
    this.sectorManagerService.save();
    this.displayBasic = false;
  }
  public update() {
    this.sectorService.update();
    this.sectorManagerService.sectorManagerFounded.sector = this.sectorFounded;
    console.log(this.sectorManagerFounded);
    this.sectorManagerService.update();
    this.displayBasic2 = false;
  }
  public save2() {
    this.semestreService.save(this.filiere);
    this.displayBasic3 = false;
  }
  public update2() {
    this.semestreService.update();
    this.displayBasic4 = false;
  }
  public findByLibelle(sector: Sector) {
  return this.sectorService.findByLibelle(sector);
  }
  public deleteByLibelle(sector: Sector) {
    return this.sectorService.deleteByLibelle(sector);
    this.displayBasic2 = false;
    window.location.reload();
  }
  get semestres(): Semestre[] {
    return this.semestreService.semestres;
  }
  get semestre(): Semestre {
    return this.semestreService.semestre;
  }
  get semestreFounded(): Semestre {
    return this.semestreService.semestreFounded;
  }

  public deleteByReference(semestre: Semestre) {
     console.log(semestre.reference);
     return this.semestreService.deleteByReference(semestre);
  }
}
