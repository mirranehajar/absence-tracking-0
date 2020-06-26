import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Module} from '../../controller/model/module';
import {Sector} from '../../controller/model/sector';
import {SectorManager} from '../../controller/model/sector-manager';
import {Semestre} from '../../controller/model/semestre';
import {Years} from '../../controller/model/years';
import {AbsenceService} from '../../controller/service/absence.service';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {ModuleService} from '../../controller/service/module.service';
import {SectorManagerService} from '../../controller/service/sector-manager.service';
import {SectorService} from '../../controller/service/sector.service';
import {SemestreService} from '../../controller/service/semestre.service';
import {TypeSessionService} from '../../controller/service/type-session.service';
import {YearsService} from '../../controller/service/years.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss'],
})
export class StatistiqueComponent implements OnInit {
  cities1: SelectItem[];
  data: any;
  data2: any;
  data3: any;
  data4: any;
  n: number;
  filiere: Sector;
  module: Module;
  labelsSemestres = new Array<string>();
  sommeSemestres = new Array<number>();
  dataSemestres =  new Array<any>();
  i = 0;
  labels3: string[];
  somme3: number[];
  labels2: string[];
  somme2: number[];
  labels: string[];
  somme: number[];
  semestre =  new Semestre();
  semestres:  Semestre[];
  sectorManager = new SectorManager();
  constructor(private sectorService: SectorService, private etudiantService: EtudiantService,
              private absenceService: AbsenceService, private moduleService: ModuleService,
              private sectorManagerService: SectorManagerService, private enseignantService: EnseignantService,
              private semestreService: SemestreService, private yearsService: YearsService,
              private typeSessionService: TypeSessionService) {
  }

  selectData(event) {
    console.log(this.data.datasets[event.element._datasetIndex].data[event.element._index]);
    // tslint:disable-next-line:max-line-length
  }
  async ngOnInit(): Promise<void> {
    await this.moduleService.findAll();
    await this.sectorManagerService.findByEnseignant(this.enseignantService.enseignantConnected);
    console.log(this.sectorManagerService.sectorManagerFounded);
    this.sectorManager = this.sectorManagerService.sectorManagerFounded;
    if (this.enseignantConnected.role === 2) {
      this.sectorService.sector = this.sectorManagerService.sectorManagerFounded.sector;
      console.log(this.sector);
      await this.semestreService.findBySector(this.sector);
      console.log(this.semestresFounded);
      this.semestres = this.semestresFounded;
      console.log(this.semestres);
    }
    this.cities1 = [
      {label: 'Select City', value: null},
      {label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}},
      {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
      {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
      {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}},
      {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}},
    ];
    await this.sectorService.findAll();
    this.labels = new Array<string>();
    this.somme = new Array<number>();
    console.log(this.sectorService.sectors);
    for (const s of this.sectorService.sectors) {
      await this.etudiantService.findBySector(s);
      this.n = 0;
      for (const e of this.etudiantService.etudiantsFounded) {
        console.log(e);
        this.n = this.n + e.nbrAbsence;
      }
      console.log(this.n);
      console.log(s);
      this.labels.push(s.libelle);
      this.somme.push(this.n);
    }
    console.log(this.labels);
    console.log(this.somme);
    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: 'First Dataset',
          backgroundColor: '#a64d79',
          data: this.somme,
          fill: true,
          borderColor: '#4bc0c0',
        },
      ],
    };
  }
  get sector(): Sector {
   return this.sectorService.sector;
  }
  get semestresFounded(): Semestre[] {
    return this.semestreService.semestresFounded;
  }
  async statistiqueSemestre() {
    this.labels2 = new Array<string>();
    this.somme2 = new Array<number>();
    await this.moduleService.findBySemestre(this.semestre);
    for (const m of this.moduleService.modulesFounded) {
      await this.absenceService.findByModule(m);
      this.n = 0;
      for (const a of this.absenceService.absencesFounded) {
        if (a.absent === true && a.justification == null) {
          this.n++;
        }
      }
      this.labels2.push(m.abreveation);
      this.somme2.push(this.n);
    }
    this.data2 = {
      labels: this.labels2,
      datasets: [
        {
          label: 'Par semestre',
          backgroundColor: '#a64d79',
          data: this.somme2,
          fill: true,
          borderColor: '#4bc0c0',
        },
      ],
    };
  }
  get sectorManagerFounded(): SectorManager {
    return this.sectorManagerService.sectorManagerFounded;
  }
  get enseignantConnected(): Enseignant {
    return this.enseignantService.enseignantConnected;
  }
  async statistiqueSector() {
    this.data3 = null;
    this.labelsSemestres = new Array<string>();
    this.dataSemestres = new Array<any>();
    this.sommeSemestres = new Array<number>();
    console.log(this.filiere);
    await this.semestreService.findBySector(this.filiere);
    console.log(this.semestreService.semestresFounded);
    for (const s of this.semestreService.semestresFounded) {
      this.i = 0;
      for ( const l of this.labelsSemestres) {
        if ( s.libelle !== l) {
          this.i++;
        }
      }
      console.log(this.i);
      if (this.i === this.labelsSemestres.length) {
        this.labelsSemestres.push(s.libelle);
      }
    }
    console.log(this.labelsSemestres);
    this.statistiqueSectorAndAnnee();
  }
  get yearss(): Years[] {
    return this.yearsService.yearss;
  }
  get sectors(): Sector[] {
    return this.sectorService.sectors;
  }
  async statistiqueSectorAndAnnee() {
    this.data3 = null;
    this.dataSemestres = new Array<any>();
    this.sommeSemestres = new Array<number>();
    await this.yearsService.findAll();
    for (const y of this.yearss) {
      console.log(y.libelle);
      await this.semestreService.findBySectorAndAnneeUniversitaire(this.filiere, y.libelle);
      console.log(this.semestresFounded);
      for (const l of this.labelsSemestres) {
        console.log(l);
        for (const s of this.semestresFounded) {
          console.log(s);
          if (s.libelle === l) {
          await this.etudiantService.findBySemestre(s);
          console.log(this.etudiantService.etudiantsFounded);
          this.n = 0;
          for (const e of this.etudiantService.etudiantsFounded) {
            console.log(e);
            this.n = this.n + e.nbrAbsence;
          }
          console.log(this.n);
          this.sommeSemestres.push(this.n);
        }
      }
    }
      console.log(this.sommeSemestres);
      this.dataSemestres.push(
        {
          label: y.libelle,
          backgroundColor: '#a64d79',
          data: this.sommeSemestres,
          fill: true,
          borderColor: '#4bc0c0',
        },
      );
    }
    console.log(this.dataSemestres);
    this.data3 = {
      labels: this.labelsSemestres,
      datasets: this.dataSemestres,
    };
  }
  async statistiqueModule() {
    this.labels3 = new Array<string>();
    this.somme3 = new Array<number>();
    await this.typeSessionService.findByModule(this.module);
    for (const t of this.typeSessionService.typeSessionsFounded) {
      console.log(this.typeSessionService.typeSessionsFounded);
      await this.absenceService.findByTypeSession(t);
      this.n = 0;
      console.log(this.absenceService.absencesFounded);
      for (const a of this.absenceService.absencesFounded) {
          if (a.absent === true && a.justification == null) {
            this.n++;
          }
        }
      console.log(this.n);
      this.somme3.push(this.n);
      this.labels3.push(t.reference);
      }
    console.log(this.labels3);
    console.log(this.somme3);
    this.data3 = {
      labels: this.labels3,
      datasets: [
        {
          label: this.module.abreveation,
          backgroundColor: '#a64d79',
          data: this.somme3,
          fill: true,
          borderColor: '#4bc0c0',
        },
      ],
    };
  }
  get modules(): Module[] {
    return this.moduleService.modules;
  }
}
