import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng';
import {Module} from '../../controller/model/module';
import {TypeSession} from '../../controller/model/type-session';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {ModuleService} from '../../controller/service/module.service';
import {TypeSessionService} from '../../controller/service/type-session.service';

@Component({
  selector: 'app-module',
  templateUrl: './moduleEtu.component.html',
  styleUrls: ['./moduleEtu.component.scss'],
})
export class ModuleEtuComponent implements OnInit {
  displayBasic: boolean;
  displayBasic2: boolean;
  cols: any[];

  constructor(private moduleService: ModuleService,
              private enseignantService: EnseignantService, private typeSessionService: TypeSessionService) {
  }

   async ngOnInit(): Promise<void> {
    for (const m of this.modulesFounded) {
      await this.findByModule(m);
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
