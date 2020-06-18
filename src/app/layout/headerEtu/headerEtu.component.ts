import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Absence} from '../../controller/model/absence';
import {Cycle} from '../../controller/model/cycle';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Notification} from '../../controller/model/notification';
import {Sector} from '../../controller/model/sector';
import {SectorManager} from '../../controller/model/sector-manager';
import {Semestre} from '../../controller/model/semestre';
import {AuthenticationService} from '../../controller/service/authentication.service';
import {CycleService} from '../../controller/service/cycle.service';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {NotificationService} from '../../controller/service/notification.service';
import {SectorManagerService} from '../../controller/service/sector-manager.service';
import {SectorService} from '../../controller/service/sector.service';
import {SemestreService} from '../../controller/service/semestre.service';

// @ts-ignore
@Component({
  selector: 'app-header-etu',
  templateUrl: './headerEtu.component.html',
  styleUrls: ['./headerEtu.component.scss'],
})
export class HeaderEtuComponent implements OnInit {
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
  private _url = 'http://localhost:8090/absence-tracking/etudiant/';
  retrievedImage: any;
   constructor(private sectorManagerService: SectorManagerService, private sectorService: SectorService,
               private cycleService: CycleService, private enseignantService: EnseignantService,
               private semestreService: SemestreService, private notificationService: NotificationService,
               private etudiantService: EtudiantService, private http: HttpClient,
               private authentocationService: AuthenticationService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.etudiantService.findByMail(sessionStorage.getItem('username'));
    this.getImage(this.etudiantService.etudiantConnected.cin);
    await this.cycleService.findAll();
    await this.sectorService.findAll();
    await this.semestreService.findAll();
    this.enseignantService.findAll();
    await this.notificationService.findByEtudiant(this.etudiantService.etudiantConnected);
    console.log(this.notificationsFounded);
    this.notificationService.notifications = null;
    for (const n of this.notificationsFounded) {
      console.log(this.notificationsFounded);
      if (n.state !== null) {
        this.notifications.push(n);
        console.log(this.notifications);
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
  return this.sectorService.findByLibelle(sector.libelle);
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
  show() {
     this.display = true;
  }
  public async deleteByAbsence(absence: Absence) {
    await this.notificationService.deleteByAbsence(absence);
    await this.notificationService.findByEtudiant(this.etudiantService.etudiantConnected);
    console.log(this.notificationsFounded);
    this.notificationService.notifications = null;
    for (const n of this.notificationsFounded) {
      console.log(this.notificationsFounded);
      if (n.state !== null) {
        this.notifications.push(n);
        console.log(this.notifications);
      }
    }
    this.notif = this.notifications.length;
  }
  get notificationsFounded(): Notification[] {
    return this.notificationService.notificationsFounded;
  }
  get notifications(): Notification[] {
    return this.notificationService.notifications;
  }
  async getImage(cin: string): Promise<any> {
    // Make a call to Spring Boot to get the Image Bytes.
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Etudiant>(this._url + 'get/' + cin, {headers})
      .toPromise().then(
        (res) => {
          this.retrievedImage = 'data:image/jpeg;base64,' + res.image;
          this.etudiantService.etudiantConnected.src = 'data:image/jpeg;base64,' + res.image;
          console.log(this.retrievedImage);
        },
      );
  }
get etudiantConnected(): Etudiant {
     return this.etudiantService.etudiantConnected;
}
logout() {
  this.authentocationService.logOut();
  this.router.navigate(['login']);
}
}
