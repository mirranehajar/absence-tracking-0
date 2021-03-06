import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng';
import {Module} from '../../controller/model/module';
import {TypeSession} from '../../controller/model/type-session';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {ModuleService} from '../../controller/service/module.service';
import {TypeSessionService} from '../../controller/service/type-session.service';
import {EtudiantService} from '../../controller/service/etudiant.service';

@Component({
  selector: 'app-module',
  templateUrl: './moduleEtu.component.html',
  styleUrls: ['./moduleEtu.component.scss'],
})
export class ModuleEtuComponent implements OnInit {
  displayBasic: boolean;
  displayBasic2: boolean;
  cols: any[];

  constructor(private moduleService: ModuleService, private etudiantService: EtudiantService,
              private enseignantService: EnseignantService, private typeSessionService: TypeSessionService) {
  }

   async ngOnInit(): Promise<void> {
    await this.moduleService.findBySemestre(this.etudiantService.etudiantConnected.groupe.semestre);
    for (const m of this.modulesFounded) {
      await this.findByModule(m);
      for ( const t of this.typeSessionsFounded) {
        t.enseignant.label = t.enseignant.lastName + ' ' + t.enseignant.firstName;
      }
      m.typeSessions = this.typeSessionsFounded;
      console.log(m);
    }
    this.cols = [
      {field: 'libelle', header: 'Libelle'},
    ];
  }

  get modulesFounded(): Module[] {
    return this.moduleService.modulesFounded;
  }
  async showBasicDialog2(module: Module) {
    console.log(module);
    this.moduleService.moduleConnected = module;
  }
  get typeSessionsFounded(): TypeSession[] {
    return this.typeSessionService.typeSessionsFounded;
  }
    public async findByModule(module: Module) {
    await this.typeSessionService.findByModule(module);
  }
}
