import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Cycle} from '../../controller/model/cycle';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Module} from '../../controller/model/module';
import {Notification} from '../../controller/model/notification';
import {Sector} from '../../controller/model/sector';
import {SectorManager} from '../../controller/model/sector-manager';
import {Semestre} from '../../controller/model/semestre';
import {Subject} from '../../controller/model/subject';
import {TypeSession} from '../../controller/model/type-session';
import {Years} from '../../controller/model/years';
import {AbsenceService} from '../../controller/service/absence.service';
import {CycleService} from '../../controller/service/cycle.service';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {ModuleService} from '../../controller/service/module.service';
import {NotificationService} from '../../controller/service/notification.service';
import {SectorManagerService} from '../../controller/service/sector-manager.service';
import {SectorService} from '../../controller/service/sector.service';
import {SemestreService} from '../../controller/service/semestre.service';
import {TypeSessionService} from '../../controller/service/type-session.service';
import {YearsService} from '../../controller/service/years.service';
import {HttpClient} from '@angular/common/http';

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
    notif: number;
    year = new Years();
  private _url = 'http://localhost:8090/absence-tracking/enseignant/';
  retrievedImage: any;
   constructor(public sectorManagerService: SectorManagerService, public sectorService: SectorService,
               public cycleService: CycleService, public enseignantService: EnseignantService,
               public semestreService: SemestreService, private router: Router,
               private moduleService: ModuleService, private typeSessionService: TypeSessionService,
               private notificationService: NotificationService, private absenceService: AbsenceService,
               private yearsService: YearsService, private http: HttpClient) { }

   async ngOnInit(): Promise<void> {
    this.getImage(this.enseignantConnected.cin);
    this.cycleService.findAll();
    this.sectorService.findAll();
    this.semestreService.findAll();
    this.enseignantService.findAll();
    this.yearsService.findAll();
    this.notificationService.notifications = null;
    await this.notificationService.findByEnseignant(this.enseignantConnected);
    for (const n of this.notificationsFounded) {
      if (n.state === null) {
        this.notifications.push(n);
      }
    }
    this.notif = this.notifications.length;
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

  async refuser(notification: Notification) {
     notification.state = 'refusée';
     this.notificationService.notificationFounded = notification;
     await this.notificationService.update();
     await this.notificationService.findByEnseignant(this.enseignantConnected);
     this.notificationService.notifications = null;
     for (const n of this.notificationsFounded) {
       if (n.state === null) {
        this.notifications.push(n);
      }
    }
  }
  async accepter(notification: Notification) {
    notification.state = 'acceptée';
    this.notificationService.notificationFounded = notification;
    await this.absenceService.findByReference(notification.absence);
    this.absenceService.absenceFounded.justification = notification.contenu;
    await this.absenceService.update();
    await this.notificationService.update();
    await this.notificationService.findByEnseignant(this.enseignantConnected);
    this.notificationService.notifications = null;
    for (const n of this.notificationsFounded) {
      if (n.state === null) {
        this.notifications.push(n);
      }
    }
  }
  setClasses() {
    return this.classes;
  }

  onNavClick() {
    this.classes.responsive = !this.classes.responsive;
  }
  async showBasicDialog() {
    await this.findByRole(3);
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
    this.sectorManagerService.sectorManager.sector = this.sector;
    await this.sectorService.save();
    console.log(this.sectorManager);
    await this.sectorManagerService.save();
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
    this.semestre.anneeUniversitaire = this.year.libelle;
    await this.semestreService.save(this.filiere);
    this.displayBasic3 = false;
    this.sectorService.findAll();
  }
  public update2() {
    this.semestreService.update();
    this.displayBasic4 = false;
  }
  public async findByLibelle(sector: Sector) {
  await this.sectorService.findByLibelle(sector.libelle);
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
  async goToStatistique() {
    await this.sectorManagerService.findByEnseignant(this.enseignantService.enseignantConnected);
    console.log(this.sectorManagerService.sectorManagerFounded);
    if (this.sectorManagerService.sectorManagerFounded != null) {
      this.sectorService.sector = this.sectorManagerService.sectorManagerFounded.sector;
      console.log(this.sector);
    }
    await this.semestreService.findBySector(this.sector);
    console.log(this.semestreService.semestresFounded);
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
  get notificationsFounded(): Notification[] {
    return this.notificationService.notificationsFounded;
  }
  get notifications(): Notification[] {
    return this.notificationService.notifications;
  }
  get years(): Years {
    return this.yearsService.years;
  }
  get yearss(): Subject[] {
    return this.yearsService.yearss;
  }
  async addYears() {
    await this.yearsService.save();
    await this.yearsService.findAll();
  }
  async showNotif() {
    this.notificationService.notifications = null;
    await this.notificationService.findByEnseignant(this.enseignantConnected);
    for (const n of this.notificationsFounded) {
      if (n.state === null) {
        this.notifications.push(n);
      }
    }
  }
  async getImage(cin: string): Promise<any> {
    // Make a call to Spring Boot to get the Image Bytes.
    await this.http.get<Enseignant>(this._url + 'get/' + cin)
      .toPromise().then(
        (res) => {
          this.retrievedImage = 'data:image/jpeg;base64,' + res.image;
          this.enseignantConnected.src = 'data:image/jpeg;base64,' + res.image;
          console.log(this.retrievedImage);
        },
      );
  }
}
