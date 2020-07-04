import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService, SelectItem} from 'primeng';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Groupe} from '../../controller/model/groupe';
import {Module} from '../../controller/model/module';
import {SectorManager} from '../../controller/model/sector-manager';
import {Semestre} from '../../controller/model/semestre';
import {Subject} from '../../controller/model/subject';
import {TypeSession} from '../../controller/model/type-session';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {GroupeService} from '../../controller/service/groupe.service';
import {ModuleService} from '../../controller/service/module.service';
import {SectorManagerService} from '../../controller/service/sector-manager.service';
import {SemestreService} from '../../controller/service/semestre.service';
import {SessionService} from '../../controller/service/session.service';
import {SubjectService} from '../../controller/service/subject.service';
import {TypeSessionService} from '../../controller/service/type-session.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
  providers: [MessageService],
})
export class ModuleComponent implements OnInit {
  displayBasic: boolean;
  displayBasic2: boolean;
  displayBasic3: boolean;
  displayBasic4: boolean;
  libelles: SelectItem[];
  cols: any[];
  show = false;
  userform: FormGroup;
  userform2: FormGroup;
  constructor(private moduleService: ModuleService, private subjectService: SubjectService,
              private enseignantService: EnseignantService, private typeSessionService: TypeSessionService,
              private semestreService: SemestreService, private sectorManagerService: SectorManagerService,
              private groupeService: GroupeService, private sessionService: SessionService, private router: Router,
              private messageService: MessageService, private fb: FormBuilder) {
    this.libelles = [
      {label: 'Cours', value: 'Cours'},
      {label: 'TD', value: 'TD'},
      {label: 'TP', value: 'TP'},
    ];
  }

   async ngOnInit(): Promise<void> {
    this.userform = this.fb.group({
       libelle: new FormControl('', Validators.required),
       abreviation: new FormControl('', Validators.required),
       subject: new FormControl('', Validators.required),
     });
    this.userform2 = this.fb.group({
       libelle: new FormControl('', Validators.required),
       subject: new FormControl('', Validators.required),
       enseignant: new FormControl('', Validators.required),
       groupe: new FormControl('', Validators.required),
     });
    await this.groupeService.findBySemestre(this.semestreConnected);
    console.log(this.semestreConnected);
    console.log(this.modules);
    console.log(this.sectorManagerConnected);
    await this.subjectService.findAll();
    this.enseignantService.findAll();
    this.typeSessionService.findAll();
    await this.semestreService.findAll();
    for (const m of this.modules) {
      await this.findByModule(m);
      m.typeSessions = this.typeSessionsFounded;
      console.log(m);
    }
    for (const m of this.modulesConnected) {
      await this.findByModule(m);
      m.typeSessions = this.typeSessionsFounded;
      console.log(m);
    }
    this.cols = [
      {field: 'libelle', header: 'Libelle'},
    ];
  }

  get modulesConnected(): Module[] {
    return this.moduleService.modulesConnected;
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
  get modulesFounded(): Module[] {
    return this.moduleService.modulesFounded;
  }
  public deleteByLibelle(module: Module) {
    this.moduleService.deleteByLibelle(module);
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Module supprimé'});
  }
  async addTypeSession() {
    this.typeSessionService.typeSession.module = this.moduleFounded;
    console.log(this.moduleConnected);
    console.log(this.moduleFounded);
    await this.typeSessionService.save();
    for (const m of this.modules) {
      await this.findByModule(m);
      console.log(m);
      m.typeSessions = this.typeSessionsFounded;
    }
    this.displayBasic3 = false;
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Type séance enregistrée'});
  }
  async save() {
    this.moduleService.module.semestre = this.semestreConnected;
    await this.moduleService.save();
    this.displayBasic = false;
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Module enregistré'});
    console.log(this.modules);
    for (const m of this.modules) {
      console.log(m);
      await this.findByModule(m);
      m.typeSessions = this.typeSessionsFounded;
      console.log(m);
    }
  }
  async update(typeSession: TypeSession) {
    this.typeSessionService.typeSessionFounded = typeSession;
    this.typeSessionService.typeSessionFounded.enseignant = this.typeSession.enseignant;
    console.log('hihi');
    await this.typeSessionService.update();
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Type séance enregistrée'});
    for (const m of this.modules) {
      await this.findByModule(m);
      m.typeSessions = this.typeSessionsFounded;
      console.log(m);
    }
  }
  async addSubject() {
    await this.subjectService.save();
    await this.subjectService.findAll();
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  async showBasicDialog2(module: Module) {
    console.log(module);
    this.moduleService.moduleConnected = module;
  }
  async miniUpdate(module: Module) {
    await this.moduleService.update(module);
  }
  async showBasicDialog3(module: Module) {
    await this.moduleService.findByLibelle(module);
    this.moduleService.moduleConnected = this.moduleFounded;
    this.subjectService.subjectsFounded = null;
    console.log(this.subjectsFounded);
    console.log(this.moduleFounded);
    this.subjectService.subjectsFounded = this.moduleFounded.subjects;
    console.log(this.subjectsFounded);
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
  public async deleteByReference(typeSession: TypeSession) {
    await this.typeSessionService.deleteByReference(typeSession);
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Type séance supprimée'});
    for (const m of this.modules) {
      await this.findByModule(m);
      m.typeSessions = this.typeSessionsFounded;
      console.log(m);
    }
  }
  get semestre(): Semestre {
    return this.semestreService.semestre;
  }
  get semestreConnected(): Semestre {
    return this.semestreService.semestreConnected;
  }
    public async findByModule(module: Module) {
    await this.typeSessionService.findByModule(module);
  }
    public async findBySemestre(semestre: Semestre) {
    await this.moduleService.findBySemestre(semestre);
  }

  get moduleConnected(): Module {
    return this.moduleService.moduleConnected;
  }
  get sectorManagerConnected(): SectorManager {
    return this.sectorManagerService.sectorManagerConnected;
  }
  get enseignantConnected(): Enseignant {
    return this.enseignantService.enseignantConnected;
  }
  get subjectsFounded(): Subject[] {
    return this.subjectService.subjectsFounded;
  }
  get groupesFounded(): Groupe[] {
    return this.groupeService.groupesFounded;
  }
  goToSession(module: Module) {
    this.moduleService.moduleConnected = module;
    console.log(module);
    console.log(this.modulesConnected);
    this.router.navigate(['/session']);
  }
  onClose() {
    this.typeSessionService.typeSession = null;
  }
}
