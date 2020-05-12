import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../controller/model/etudiant.model';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {Groupe} from '../../controller/model/groupe';
import {GroupeService} from '../../controller/service/groupe.service';
import {Sector} from '../../controller/model/sector';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SectorService} from '../../controller/service/sector.service';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.scss']
})
export class GroupesComponent implements OnInit {
  students = new FormControl();
  index = -1;
  displayBasic: boolean;
  cities: Sector[];
  selectedCity: Sector;
  constructor(private etudiantService: EtudiantService, private groupeService: GroupeService, private sectorService: SectorService) {
   }

  ngOnInit(): void {
    this.etudiantService.findAll();
  }
  openNext() {
    this.index = (this.index === 3) ? 0 : this.index + 1;
  }

  openPrev() {
    this.index = (this.index <= 0) ? 3 : this.index - 1;
  }
  get etudiants(): Array<Etudiant> {
    return this.etudiantService.etudiants;
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  get groupe(): Groupe {
    return this.groupeService.groupe;
  }
  get groupes(): Array<Groupe> {
    return this.groupeService.groupes;
  }
  get groupeFounded(): Groupe {
    return this.groupeService.groupeFounded;
  }
  drop(event: CdkDragDrop<Array<Etudiant>>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  get sectors(): Array<Sector> {
    return this.sectorService.sectors;
  }
  get sector(): Sector {
    return this.sectorService.sector;
  }
}
