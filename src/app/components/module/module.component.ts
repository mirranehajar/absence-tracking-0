import {Component, OnInit} from '@angular/core';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Module, TypeSeance} from '../../controller/model/module';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {ModuleService} from '../../controller/service/module.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent implements OnInit {
  displayBasic: boolean;
  displayBasicM: boolean;
  displayBasicT: boolean;
  moduleTypes: TypeSeance[];

  constructor(private moduleService: ModuleService) {
  }

  ngOnInit(): void {
    this.moduleService.findAll();
    this.moduleService.findAllT();
    this.moduleService.findAll();
  }

  get modules(): Module[] {
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

  get typeSeances(): TypeSeance[] {
    return this.moduleService.typeSeances;
  }
  get enseignant(): Enseignant {
    return this.moduleService.enseignant;
  }
  get enseignants(): Enseignant[] {
    return this.moduleService.enseignants;
  }

  public deleteByLibelle(m: Module) {
    this.moduleService.deleteByLibelle(m);
  }

  showBasicDialog(m: Module) {
    this.moduleTypes = this.typeSeances.filter((type) => type.module.libelle === m.libelle);
    this.displayBasic = true;
  }

  showSaveModule() {
    this.displayBasicM = true;
  }

  saveModule() {
    this.moduleService.saveModule();
    this.displayBasicM = false;
  }

  saveTypeSeance() {
    this.moduleService.saveTypeSeance();
    this.displayBasicT = false;
  }

  showTypeSeance() {
    this.displayBasicT = true;
  }
}
