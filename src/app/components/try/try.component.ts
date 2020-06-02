import {Component, OnInit} from '@angular/core';
import {Enseignant} from '../../controller/model/enseignant.model';
import {EnseignantService} from '../../controller/service/enseignant.service';

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss'],
})

export class TryComponent implements OnInit {

  selectedCities2: Enseignant[];

  constructor(private enseignantService: EnseignantService) {
  }
  get enseignants(): Enseignant[] {
    return this.enseignantService.enseignants;
  }
  ngOnInit(): void {
    this.enseignantService.findAll();
  }

}
