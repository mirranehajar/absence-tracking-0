import {Component, OnInit, ViewChild} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core/structs/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Groupe} from '../../controller/model/groupe';
import {Session} from '../../controller/model/session';
import {TypeSession} from '../../controller/model/type-session';
import {AbsenceService} from '../../controller/service/absence.service';
import {GroupeService} from '../../controller/service/groupe.service';
import {SessionService} from '../../controller/service/session.service';
import {TypeSessionService} from '../../controller/service/type-session.service';
import {Absence} from '../../controller/model/absence';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  displayBasic: boolean;
  displayBasic2: boolean;
  period: number;
  constructor(private groupeService: GroupeService, private typeSessionService: TypeSessionService,
              private sessionService: SessionService, private absenceService: AbsenceService) { }

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  students:  Etudiant[];
  seance: Session;

  async ngOnInit(): Promise<void> {
    this.students = new Array<Etudiant>();
    await this.sessionService.findAll();
    console.log(this.sessions);
    this.groupeService.findAll();
    this.typeSessionService.findAll();
    for (const s of this.sessions) {
    this.calendarEvents = this.calendarEvents.concat({id: s.reference, title: s.libelle, start: s.dateStart, end: s.dateStop});
    }
  }
  showBasicDialog(arg) {
    this.displayBasic = true;
    this.session.dateStart = arg.date;
    this.session.dateStop = arg.date;
    // this.session.dateStop.setHours(arg.date.getHours() + this.period);
    // this.session.dateStop.setTime(arg.date.getTime + )
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
        id: this.session.reference,
        title: this.session.libelle,
        start: this.session.dateStart,
        end: this.session.dateStop ,
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
  }
  public update() {
    this.sessionService.update();
  }
  public async save() {
    this.handleDateClick();
    for ( const g of this.session.groupes) {
      for ( const e of g.etudiants) {
        this.students.push(e);
      }
    }
    this.seance = this.session;
    await this.sessionService.save();
    console.log('haha');
    for ( const e of this.students) {
      this.absenceService.absence.etudiant = e;
      this.absenceService.absence.session = this.seance;
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
}
