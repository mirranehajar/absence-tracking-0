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
  templateUrl: './groupesEtu.component.html',
  styleUrls: ['./groupesEtu.component.scss'],
})
export class GroupesEtuComponent implements OnInit {
  index = -1;
  displayBasic: boolean;
  displayBasic2: boolean;
  cols: any[];

  constructor( private etudiantService: EtudiantService, private groupeService: GroupeService) {}

  async ngOnInit(): Promise<void> {
    await this.etudiantService.findAll();
    this.groupeService.findBySemestre(this.etudiantConnected.groupe.semestre);
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
  get groupesFounded(): Groupe[] {
    return this.groupeService.groupesFounded;
  }
  get etudiantConnected(): Etudiant {
    return this.etudiantService.etudiantConnected;
  }

}
