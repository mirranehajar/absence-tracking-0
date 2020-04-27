import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {Enseignant} from '../../controller/model/enseignant.model';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss'],
  providers: [ConfirmationService]
})
export class EnseignantComponent implements OnInit {
  msgs: Message[] = [];
  displayBasic: boolean;
  position: string;

  constructor(private enseignantService: EnseignantService) { }

  ngOnInit(): void {this.enseignantService.findAll();
  }
  public deleteByMatricule(enseignant: Enseignant) {
    this.enseignantService.deleteByMatricule(enseignant);
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  public save() {
    this.enseignantService.save();
    this.displayBasic = false;
  }
  get enseignant(): Enseignant {
    return this.enseignantService.enseignant;
  }
  get enseignants(): Array<Enseignant> {
    return this.enseignantService.enseignants;
  }
}
