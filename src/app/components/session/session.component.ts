import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core/structs/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import {MessageService} from 'primeng';
import {Absence} from '../../controller/model/absence';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Groupe} from '../../controller/model/groupe';
import {Module} from '../../controller/model/module';
import {SectorManager} from '../../controller/model/sector-manager';
import {Session} from '../../controller/model/session';
import {TypeSession} from '../../controller/model/type-session';
import {AbsenceService} from '../../controller/service/absence.service';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {GroupeService} from '../../controller/service/groupe.service';
import {ModuleService} from '../../controller/service/module.service';
import {SectorManagerService} from '../../controller/service/sector-manager.service';
import {SessionService} from '../../controller/service/session.service';
import {TypeSessionService} from '../../controller/service/type-session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  providers: [MessageService],
})
export class SessionComponent implements OnInit {
  displayBasic: boolean;
  displayBasic2: boolean;
  today: Date;
  userform: FormGroup;
  constructor(private groupeService: GroupeService, private typeSessionService: TypeSessionService,
              private sessionService: SessionService, private absenceService: AbsenceService,
              private etudiantService: EtudiantService, private enseignantService: EnseignantService,
              private moduleService: ModuleService, private sectorManagerService: SectorManagerService,
              private fb: FormBuilder, private messageService: MessageService) {
  }

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  students: Etudiant[];
  groups: Groupe[];
  seance: Session;
  typeSeance = new Array<TypeSession>();
  push = new Array<TypeSession>();
  hours = {
    daysOfWeek: [1, 2, 3, 4, 5, 6],
    startTime: '08:00',
    endTime: '19:00',
  };
  max: number;

  async ngOnInit(): Promise<void> {
    this.userform = this.fb.group({
      libelle: new FormControl('', Validators.required),
      periode: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(this.max)])),
      typeSession: new FormControl('', Validators.required),
    });
    this.today = new Date();
    console.log(this.today);
    this.students = new Array<Etudiant>();
    console.log(this.moduleConnected);
    await this.typeSessionService.findByModule(this.moduleConnected);
    for (const t of this.typeSessionsFounded) {
      console.log(t);
      await this.sessionService.findByTypeSession(t);
      for (const s of this.sessionService.sessionsFounded) {
        this.sessionService.sessions.push(s);
        console.log(s);
        this.calendarEvents = this.calendarEvents.concat({
          id: s.reference,
          title: s.libelle,
          start: s.dateStart,
          end: s.dateStop,
          constraint: this.hours,
        });
      }
    }
    await this.sectorManagerService.findBySector(this.moduleConnected.semestre.sector);
    if (this.enseignantConnected.numeroSOM !== this.sectorManagerFounded.enseignant.numeroSOM) {
      await this.typeSessionService.findByEnseignant(this.enseignantConnected);
    }
    console.log(this.sessions);
    this.groupeService.findAll();
  }

  async showBasicDialog(arg) {
    this.max = 19 * 60 - arg.date.getMinutes();
    if (arg.date.getDay() !== 0 && arg.date.getHours() >= 8 && arg.date.getHours() < 19) {
      await this.sessionService.findByDateAndEnseignant(arg.date, this.enseignantConnected);
      console.log(this.sessionService.sessionTrouve);
      if (this.sessionService.sessionTrouve == null) {
        await this.sectorManagerService.findBySector(this.moduleConnected.semestre.sector);
        if (this.enseignantConnected.numeroSOM !== this.sectorManagerFounded.enseignant.numeroSOM) {
          await this.typeSessionService.findByEnseignant(this.enseignantConnected);
          console.log('wlh ta  hna ' + this.typeSessionsFounded);
          for (const r of this.typeSessionsFounded) {
            if (r.module.libelle === this.moduleConnected.libelle) {
              console.log(r);
              await this.push.push(r);
              console.log(this.push);
            }
            console.log('hani khrjt');
            console.log(this.push);
          }
          this.typeSeance = this.push;
          console.log(this.typeSeance);
        } else {
          await this.typeSessionService.findByModule(this.moduleConnected);
          console.log('wlh ta jit hna ' + this.typeSessionsFounded);
          this.typeSeance = this.typeSessionsFounded;
          for (const t of this.typeSessionsFounded) {
            console.log(t);
            await this.sessionService.findByTypeSession(t);
          }
        }
        console.log(arg.dateStr);
        if (arg.date >= this.today) {
          this.userform = this.fb.group({
            libelle: new FormControl('', Validators.required),
            periode: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(this.max)])),
            typeSession: new FormControl('', Validators.required),
          });
          this.displayBasic = true;
          this.session.dateStart = arg.dateStr;
        }
      }
    }
  }

  public async showBasicDialog2(event) {
    await this.findByReference(event.event.id);
    await this.sectorManagerService.findBySector(this.sessionFounded.typeSession.module.semestre.sector);
    console.log(this.findByReference(event.event.id));
    console.log(this.sessionFounded);
    console.log(this.sessionFounded.reference);
    console.log(this.sessionFounded.dateStart);
    this.displayBasic2 = true;
  }

  handleDateClick() {
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      id: this.seance.reference,
      title: this.seance.libelle,
      start: this.seance.dateStart,
      end: this.seance.dateStop,
      editable: true,
    });
  }

  public findByLibelle(session: Session) {
    this.sessionService.findByLibelle(session);
  }

  public async findByReference(reference: string) {
    await this.sessionService.findByReference(reference);
  }

  public deleteByReference(session: Session) {
    this.sessionService.deleteByReference(session);
    this.displayBasic2 = false;
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Séance supprimée'});
  }

  async onDrag(arg) {
    console.log(arg.event.id);
    await this.findByReference(arg.event.id);
    console.log(this.sessionFounded);
  }

  async onDrop(arg) {
    this.sessionService.sessionFounded.dateStart = arg.event.start;
    this.sessionService.sessionFounded.dateStop = null;
    console.log(arg.event);
    console.log(this.enseignantConnected);
    console.log(this.sessionFounded.typeSession.enseignant);
    this.sectorManagerService.findBySector(this.sessionFounded.typeSession.module.semestre.sector);
    if (this.enseignantConnected.numeroSOM === this.sessionFounded.typeSession.enseignant.numeroSOM ||
      this.sectorManagerService.sectorManagerFounded.enseignant.numeroSOM === this.enseignantConnected.numeroSOM) {
      console.log('haha hana jit lhna');
      await this.sessionService.update();
    }
    this.calendarEvents = [];
    for (const s of this.sessions) {
      // tslint:disable-next-line:max-line-length
      this.calendarEvents = this.calendarEvents.concat({
        id: s.reference,
        title: s.libelle,
        start: s.dateStart,
        end: s.dateStop,
        constraint: this.hours,
      });
    }
  }

  async onResize(arg) {
    console.log(arg.event.id);
    console.log(arg.event);
    console.log((arg.event.end.getHours() - arg.event.start.getHours()) * 60 + arg.event.end.getMinutes() - arg.event.start.getMinutes());
    await this.sessionService.findByReference(arg.event.id);
    this.sectorManagerService.findBySector(this.sessionFounded.typeSession.module.semestre.sector);
    if (this.enseignantConnected.numeroSOM === this.sessionFounded.typeSession.enseignant.numeroSOM ||
      this.sectorManagerService.sectorManagerFounded.enseignant.numeroSOM === this.enseignantConnected.numeroSOM) {
      // tslint:disable-next-line:max-line-length
      this.sessionService.sessionFounded.periode = (arg.event.end.getHours() - arg.event.start.getHours()) * 60 + arg.event.end.getMinutes() - arg.event.start.getMinutes();
      await this.sessionService.update();
    }
    this.calendarEvents = [];
    for (const s of this.sessions) {
      this.calendarEvents = this.calendarEvents.concat({
        id: s.reference,
        title: s.libelle,
        start: s.dateStart,
        end: s.dateStop,
        constraint: this.hours,
      });
    }
  }

  public async save() {
    for (const g of this.session.typeSession.groupes) {
      await this.findByGroupe(g);
      g.etudiants = this.etudiantsFounded;
      console.log(g);
    }
    for (const g of this.session.typeSession.groupes) {
      console.log(this.session.typeSession.groupes);
      for (const e of g.etudiants) {
        this.students.push(e);
      }
    }
    console.log(this.session.dateStop);
    await this.sessionService.save();
    this.seance = this.sessionFounded;
    this.handleDateClick();
    console.log('haha');
    for (const e of this.students) {
      this.absenceService.absence.etudiant = e;
      this.absenceService.absence.session = this.sessionFounded;
      console.log(this.absence);
      await this.absenceService.save();
    }
    this.displayBasic = false;
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Séance enregistrée'});
  }

  get groupes(): Groupe[] {
    return this.groupeService.groupes;
  }

  get groupe(): Groupe {
    return this.groupeService.groupe;
  }

  get typeSessions(): TypeSession[] {
    return this.typeSessionService.typeSessions;
  }

  get typeSessionsFounded(): TypeSession[] {
    return this.typeSessionService.typeSessionsFounded;
  }

  get typeSession(): TypeSession {
    return this.typeSessionService.typeSession;
  }

  get sessions(): Session[] {
    return this.sessionService.sessions;
  }

  get session(): Session {
    return this.sessionService.session;
  }

  get sessionFounded(): Session {
    return this.sessionService.sessionFounded;
  }

  get absence(): Absence {
    return this.absenceService.absence;
  }

  public async findByGroupe(groupe: Groupe) {
    await this.etudiantService.findByGroupe(groupe);
  }

  get etudiantsFounded(): Etudiant[] {
    return this.etudiantService.etudiantsFounded;
  }

  get enseignantConnected(): Enseignant {
    return this.enseignantService.enseignantConnected;
  }

  get moduleConnected(): Module {
    return this.moduleService.moduleConnected;
  }

  get sectorManagerFounded(): SectorManager {
    return this.sectorManagerService.sectorManagerFounded;
  }
}
