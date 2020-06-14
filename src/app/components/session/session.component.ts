import {Component, OnInit, ViewChild} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core/structs/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import {Absence} from '../../controller/model/absence';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Groupe} from '../../controller/model/groupe';
import {Module} from '../../controller/model/module';
import {Session} from '../../controller/model/session';
import {TypeSession} from '../../controller/model/type-session';
import {AbsenceService} from '../../controller/service/absence.service';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {GroupeService} from '../../controller/service/groupe.service';
import {ModuleService} from '../../controller/service/module.service';
import {SessionService} from '../../controller/service/session.service';
import {TypeSessionService} from '../../controller/service/type-session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  displayBasic: boolean;
  displayBasic2: boolean;
  today: Date;
  constructor(private groupeService: GroupeService, private typeSessionService: TypeSessionService,
              private sessionService: SessionService, private absenceService: AbsenceService,
              private etudiantService: EtudiantService, private enseignantService: EnseignantService,
              private moduleService: ModuleService) { }

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  students:  Etudiant[];
  groups: Groupe[];
  seance: Session;
  hours =  {
  daysOfWeek: [ 1, 2, 3, 4 , 5 , 6],
  startTime: '08:00',
  endTime: '19:00',
};

  async ngOnInit(): Promise<void> {
    this.today = new Date();
    console.log(this.today);
    this.students = new Array<Etudiant>();
    console.log(this.moduleConnected);
    this.typeSessionService.findByModule(this.moduleConnected);
    for (const t of this.typeSessionsFounded) {
      console.log(t);
      await this.sessionService.findByTypeSession(t);
      for (const s of this.sessionService.sessionsFounded) {
        this.sessionService.sessions.push(s);
        console.log(s);
        this.calendarEvents = this.calendarEvents.concat({id: s.reference, title: s.libelle, start: s.dateStart, end: s.dateStop});
      }
    }

    this.typeSessionService.findByEnseignant(this.enseignantConnected);
    console.log(this.sessions);
    this.groupeService.findAll();
  }
  showBasicDialog(arg) {
    console.log(arg.dateStr);
    if (arg.date >= this.today) {
      this.displayBasic = true;
      this.session.dateStart = arg.dateStr;
    }
  }
    public async showBasicDialog2(event) {
    this.displayBasic2 = true;
    await this.findByReference(event.event.id);
    console.log(this.findByReference(event.event.id));
    console.log(this.sessionFounded);
    console.log(this.sessionFounded.reference);
    console.log(this.sessionFounded.dateStart);
  }
  handleDateClick() {
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        id: this.seance.reference,
        title: this.seance.libelle,
        start: this.seance.dateStart,
        end: this.seance.dateStop ,
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
  }
  async onDrag(arg) {
    console.log(arg.event.id);
    await this.findByReference(arg.event.id);
    console.log(this.sessionFounded);
  }
  async onDrop(arg) {
    this.sessionService.sessionFounded.dateStart = arg.event.start;
    console.log(arg.event.start);
    if (this.enseignantConnected === this.sessionFounded.typeSession.enseignant) {
    await this.sessionService.update();
    }
    this.calendarEvents = [];
    for (const s of this.sessions) {
      this.calendarEvents = this.calendarEvents.concat({id: s.reference, title: s.libelle, start: s.dateStart, end: s.dateStop});
    }
  }
  async onResize(arg) {
    await this.sessionService.findByReference(arg.event.id);
    if (this.enseignantConnected === this.sessionFounded.typeSession.enseignant) {
      this.sessionService.sessionFounded.dateStop = arg.event.end;
      this.sessionService.update();
    }
    this.calendarEvents = [];
    for (const s of this.sessions) {
      this.calendarEvents = this.calendarEvents.concat({id: s.reference, title: s.libelle, start: s.dateStart, end: s.dateStop});
    }
  }
  public async save() {
    for ( const g of this.session.typeSession.groupes) {
      await this.findByGroupe(g);
      g.etudiants = this.etudiantsFounded;
      console.log(g);
    }
    for ( const g of this.session.typeSession.groupes) {
      console.log(this.session.typeSession.groupes);
      for ( const e of g.etudiants) {
        this.students.push(e);
      }
    }
    console.log(this.session.dateStop);
    await this.sessionService.save();
    this.seance = this.sessionFounded;
    this.handleDateClick();
    console.log('haha');
    for ( const e of this.students) {
      this.absenceService.absence.etudiant = e;
      this.absenceService.absence.session = this.sessionFounded;
      console.log(this.absence);
      this.absenceService.save();
    }
    this.displayBasic = false;
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
}
