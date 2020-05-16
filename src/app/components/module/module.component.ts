import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Module, TypeSeance} from '../../controller/model/module';
import {ModuleService} from '../../controller/service/module.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
   displayBasic: boolean;

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleService.findAll();
    this.moduleService.findAllT();
  }

  get modules(): Array<Module> {
    return this.moduleService.modules;
  }
  get module(): Module {
    return this.moduleService.module;
  }
  get moduleFounded(): Module {
    return this.moduleService.moduleFounded;
  }
  get typeSeance(): TypeSeance {
    return this.moduleService.typeSeance;
  }
  get typeSeances(): Array<TypeSeance> {
    return this.moduleService.typeSeances;
  }

  public deleteByLibelle(m: Module) {
    this.moduleService.deleteByLibelle(m);
  }

  showBasicDialog() {
    this.displayBasic = true;
  }
}
