import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Cycle} from '../../controller/model/cycle';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Module} from '../../controller/model/module';
import {Sector} from '../../controller/model/sector';
import {SectorManager} from '../../controller/model/sector-manager';
import {Semestre} from '../../controller/model/semestre';
import {TypeSession} from '../../controller/model/type-session';
import {CycleService} from '../../controller/service/cycle.service';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {ModuleService} from '../../controller/service/module.service';
import {SectorManagerService} from '../../controller/service/sector-manager.service';
import {SectorService} from '../../controller/service/sector.service';
import {SemestreService} from '../../controller/service/semestre.service';
import {TypeSessionService} from '../../controller/service/type-session.service';

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
    display: boolean;
   constructor(public sectorManagerService: SectorManagerService, public sectorService: SectorService,
               public cycleService: CycleService, public enseignantService: EnseignantService,
               public semestreService: SemestreService, private router: Router,
               private moduleService: ModuleService, private typeSessionService: TypeSessionService) { }

   async ngOnInit(): Promise<void> {
    this.cycleService.findAll();
    this.sectorService.findAll();
    this.semestreService.findAll();
    this.enseignantService.findAll();
    await this.findByRole(3);
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
  get enseignantConnected(): Enseignant {
    return this.enseignantService.enseignantConnected;
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
  public async  save() {
    this.sectorService.save();
    this.sectorManagerService.sectorManager.sector = this.sector;
    this.sectorManagerService.save();
    await this.findByRole(3);
    this.displayBasic = false;
  }
  public update() {
    this.sectorService.update();
    this.sectorManagerService.sectorManagerFounded.sector = this.sectorFounded;
    console.log(this.sectorManagerFounded);
    this.sectorManagerService.update();
    this.displayBasic2 = false;
  }
  public async save2() {
    await this.semestreService.save(this.filiere);
    this.displayBasic3 = false;
    this.sectorService.findAll();
  }
  public update2() {
    this.semestreService.update();
    this.displayBasic4 = false;
  }
  public findByLibelle(sector: Sector) {
  return this.sectorService.findByLibelle(sector.libelle);
  }
  public async deleteByLibelle(sector: Sector) {
    await this.sectorService.deleteByLibelle(sector);
    this.displayBasic2 = false;
    this.sectorService.findAll();
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
  get semestreConnected(): Semestre {
    return this.semestreService.semestreConnected;
  }
  get typeSessionsFounded(): TypeSession[] {
    return this.typeSessionService.typeSessionsFounded;
  }

  public async deleteByReference(semestre: Semestre) {
     console.log(semestre.reference);
     await this.semestreService.deleteByReference(semestre);
     this.sectorService.findAll();
  }
  public async findBySemestre(semestre: Semestre) {
    await this.moduleService.findBySemestre(semestre);
  }
  public async findByEnseignant(enseignant: Enseignant) {
    await this.typeSessionService.findByEnseignant(enseignant);
  }
  async goToModule(semestre: Semestre) {
     await this.findBySector(semestre.sector);
     await this.findBySemestre(semestre);
     console.log(this.modulesFounded);
     this.moduleService.modules = this.modulesFounded;
     this.sectorManagerService.sectorManagerConnected = this.sectorManagerFounded;
     this.semestreService.semestreConnected = semestre;
     await this.findBySemestre(this.semestreConnected);
     console.log(this.modulesFounded);
     await this.findByEnseignant(this.enseignantConnected);
     this.moduleService.modulesConnected = null;
     for (const t of this.typeSessionsFounded) {
       console.log('kharj la boucle');
       for (const m of this.modulesFounded) {
         console.log('dakhl la boucle');
         console.log(m);
         console.log(t.module);
         if (m.libelle === t.module.libelle) {
           console.log('dakhl tldakhl la boucle');
           await this.moduleService.modulesConnected.push(m);
         } else { console.log('hani khrjt'); }
       }
       console.log(this.modules);
     }
     this.router.navigate(['/module']);
  }
  get modulesFounded(): Module[] {
    return this.moduleService.modulesFounded;
  }
  get modules(): Module[] {
    return this.moduleService.modules;
  }
  show() {
     this.display = true;
  }
  async onHover(sector: Sector) {
     console.log(sector);
     console.log('sector');
     await this.findBySector(sector);
  }
  public async findBySector(sector: Sector) {
    await this.sectorManagerService.findBySector(sector);
  }
  public async findByRole(role: number) {
     await this.enseignantService.findByRole(role);
  }
  get enseignantsFounded(): Enseignant[] {
    return this.enseignantService.enseignantsFounded;
  }
  get modulesConnected(): Module[] {
    return this.moduleService.modulesConnected;
  }
}
