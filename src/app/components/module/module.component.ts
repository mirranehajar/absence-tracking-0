import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Module} from '../../controller/model/module';
import {Subject} from '../../controller/model/subject';
import {TypeSession} from '../../controller/model/type-session';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {ModuleService} from '../../controller/service/module.service';
import {SubjectService} from '../../controller/service/subject.service';
import {TypeSessionService} from '../../controller/service/type-session.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent implements OnInit {
  displayBasic: boolean;
  displayBasic2: boolean;
  displayBasic3: boolean;
  displayBasic4: boolean;
  libelles: SelectItem[];
  cols: any[];

  constructor(private moduleService: ModuleService, private subjectService: SubjectService,
              private enseignantService: EnseignantService, private typeSessionService: TypeSessionService) {
    this.libelles = [
      {label: 'Cours', value: 'Cours'},
      {label: 'TD', value: 'TD'},
      {label: 'TP', value: 'TP'},
    ];
  }

  ngOnInit(): void {
    this.moduleService.findAll();
    this.subjectService.findAll();
    this.enseignantService.findAll();
    this.typeSessionService.findAll();
    this.cols = [
      { field: 'libelle', header: 'Libelle' },
    ];
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
  public deleteByLibelle(module: Module) {
    this.moduleService.deleteByLibelle(module);
  }
  addTypeSession() {
    this.typeSessionService.typeSession.module = this.module;
    this.typeSessionService.save();
    this.displayBasic3 = false;
  }
  save() {
    this.moduleService.save();
    this.displayBasic = false;
  }
  update(typeSession: TypeSession) {
    this.typeSessionService.typeSessionFounded = typeSession;
    this.typeSessionService.typeSessionFounded.enseignant = this.typeSession.enseignant;
    console.log('hihi');
    this.typeSessionService.update();
  }
  async addSubject() {
    await this.subjectService.save();
    this.subjectService.findAll();
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  showBasicDialog2(module: Module) {
    this.moduleService.module = module;
    console.log(this.module);
    this.displayBasic2 = true;
  }
  showBasicDialog3() {
    this.displayBasic3 = true;
  }
  showBasicDialog4(typeSession: TypeSession) {
    this.findByReference(typeSession);
    this.displayBasic4 = true;
  }
  get subjects(): Subject[] {
    return this.subjectService.subjects;
  }
  get subject(): Subject {
    return this.subjectService.subject;
  }
  get enseignants(): Enseignant[] {
    return this.enseignantService.enseignants;
  }
  get typeSession(): TypeSession {
    return this.typeSessionService.typeSession;
  }
  get typeSessions(): TypeSession[] {
    return this.typeSessionService.typeSessions;
  }
  get typeSessionFounded(): TypeSession {
    return this.typeSessionService.typeSessionFounded;
  }
  get typeSessionsFounded(): TypeSession[] {
    return this.typeSessionService.typeSessionsFounded;
  }
  public findByReference(typeSession: TypeSession) {
    return this.typeSessionService.findByReference(typeSession);
  }

  public deleteByReference(typeSession: TypeSession) {
    return this.typeSessionService.deleteByReference(typeSession);
  }
}
