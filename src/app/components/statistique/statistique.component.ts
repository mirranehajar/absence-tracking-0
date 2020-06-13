import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Sector} from '../../controller/model/sector';
import {SectorManager} from '../../controller/model/sector-manager';
import {Semestre} from '../../controller/model/semestre';
import {AbsenceService} from '../../controller/service/absence.service';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {ModuleService} from '../../controller/service/module.service';
import {SectorManagerService} from '../../controller/service/sector-manager.service';
import {SectorService} from '../../controller/service/sector.service';
import {SemestreService} from '../../controller/service/semestre.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss'],
})
export class StatistiqueComponent implements OnInit {
  cities1: SelectItem[];
  data: any;
  data2: any;
  n: number;
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
              private semestreService: SemestreService) {
  }

  selectData(event) {
    console.log(this.data.datasets[event.element._datasetIndex].data[event.element._index]);
    // tslint:disable-next-line:max-line-length
  }
  async ngOnInit(): Promise<void> {
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
          label: 'Par semestre azin',
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
}
