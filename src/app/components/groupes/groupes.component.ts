import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng';
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
  providers: [MessageService],
})
export class GroupesComponent implements OnInit {
  index = -1;
  displayBasic: boolean;
  displayBasic2: boolean;
  cols: any[];
  data: Groupe;
  private _url = 'http://localhost:8090/absence-tracking/etudiant/';
  retrievedImage: any;
  userform: FormGroup;
  constructor(private semestreService: SemestreService, private etudiantService: EtudiantService,
              private groupeService: GroupeService, private sectorService: SectorService, private fb: FormBuilder,
              private sectorManagerService: SectorManagerService, private enseignantService: EnseignantService,
              private http: HttpClient, private messageService: MessageService) {}

  async ngOnInit(): Promise<void> {
    this.userform = this.fb.group({
      libelle: new FormControl('', Validators.required),
    });
    await this.etudiantService.findAll();
    for (const e of this.etudiants) {
      await this.getImage(e.cin);
      e.src = this.retrievedImage;
    }
    this.etudiantService.etudiantsGroupe = null;
    for (const e of this.etudiants) {
      if (e.groupe == null) {
        await this.getImage(e.cin);
        e.src = this.retrievedImage;
        this.etudiantsGroupe.push(e);
      }
    }
    await this.groupeService.findBySemestre(this.semestreConnected);
    for (const g of this.groupesFounded) {
      for (const e of g.etudiants) {
        await this.getImage(e.cin);
        e.src = this.retrievedImage;
      }
    }
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
      { field: 'birthDay', header: 'D.Naissance' },
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
        await this.getImage(e.cin);
        e.src = this.retrievedImage;
        this.etudiantsGroupe.push(e);
      }
    }
    await this.groupeService.findBySemestre(this.semestreConnected);
    for (const g of this.groupesFounded) {
      for (const e of g.etudiants) {
        await this.getImage(e.cin);
        e.src = this.retrievedImage;
      }
    }
  }
  onDrag(etudiant: Etudiant) {
    this.etudiantService.etudiantFounded = etudiant;
  }
  public findByLibelle(groupe: Groupe) {
    return this.groupeService.findByLibelle(groupe.libelle);
  }
  public async deleteByReference(groupe: Groupe) {
    await this.findByGroupe(groupe);
    for ( const e of this.etudiantsFounded) {
      e.groupe = null;
      this.etudiantService.etudiantFounded = e;
      await this.etudiantService.update();
    }
    await this.groupeService.deleteByReference(groupe);
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Groupe supprimé'});
    await this.groupeService.findBySemestre(this.semestreConnected);
    for (const g of this.groupesFounded) {
      for (const e of g.etudiants) {
        await this.getImage(e.cin);
        e.src = this.retrievedImage;
      }
    }
    this.displayBasic2 = false;
  }
  public async update() {
    this.groupeService.update();
    await this.groupeService.findBySemestre(this.semestreConnected);
    this.displayBasic2 = false;
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Groupe enregistré'});
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
      await this.etudiantService.update();
      await this.getImage(e.cin);
      e.src = this.retrievedImage;
    }
    await this.etudiantService.findAll();
    this.etudiantService.etudiantsGroupe = null;
    for (const e of this.etudiants) {
      if (e.groupe == null) {
        await this.getImage(e.cin);
        e.src = this.retrievedImage;
        this.etudiantsGroupe.push(e);
      }
    }
    await this.groupeService.findBySemestre(this.semestreConnected);
    for (const g of this.groupesFounded) {
      for (const e of g.etudiants) {
        await this.getImage(e.cin);
        e.src = this.retrievedImage;
      }
    }
    this.displayBasic = false;
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Groupe enregistré'});
  }
  get etudiants(): Etudiant[] {
    return this.etudiantService.etudiants;
  }
  showBasicDialog() {
    this.groupeService.groupe.etudiants = [];
    console.log(this.groupeService.groupe.etudiants);
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
  async getImage(cin: string): Promise<any> {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    // Make a call to Spring Boot to get the Image Bytes.
    await this.http.get<Etudiant>(this._url + 'get/' + cin, {headers})
      .toPromise().then(
        (res) => {
          this.retrievedImage = 'data:image/jpeg;base64,' + res.image;
          console.log(this.retrievedImage);
        },
      );
  }
}
