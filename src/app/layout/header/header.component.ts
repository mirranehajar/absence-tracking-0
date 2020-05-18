import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Cycle} from '../../controller/model/cycle';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Sector} from '../../controller/model/sector';
import {SectorManager} from '../../controller/model/sector-manager';
import {CycleService} from '../../controller/service/cycle.service';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {SectorManagerService} from '../../controller/service/sector-manager.service';
import {SectorService} from '../../controller/service/sector.service';

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

   constructor(public sectorManagerService: SectorManagerService, public sectorService: SectorService,
               public cycleService: CycleService, public enseignantService: EnseignantService) { }

  ngOnInit(): void {
    this.cycleService.findAll();
    this.sectorService.findAll();
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
    this.sectorManager.sector = this.sector;
    this.sectorManagerService.save();
    this.displayBasic = false;
  }
  public update() {
    this.sectorService.update();
    this.displayBasic2 = false;
    window.location.reload();
  }
  public findByLibelle(sector: Sector) {
  return this.sectorService.findByLibelle(sector);
  }
  public deleteByLibelle(sector: Sector) {
    return this.sectorService.deleteByLibelle(sector);
    this.displayBasic2 = false;
    window.location.reload();
  }
}
