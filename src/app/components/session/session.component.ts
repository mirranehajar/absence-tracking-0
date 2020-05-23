import {Component, OnInit, ViewChild} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core/structs/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import {Groupe} from '../../controller/model/groupe';
import {Session} from '../../controller/model/session';
import {TypeSession} from '../../controller/model/type-session';
import {GroupeService} from '../../controller/service/groupe.service';
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
  period: number;
  constructor(private groupeService: GroupeService, private typeSessionService: TypeSessionService,
              private sessionService: SessionService) { }

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];

  ngOnInit(): void {
    this.sessionService.findAll();
    this.groupeService.findAll();
    for (const s of this.sessions) {
    this.calendarEvents = this.calendarEvents.concat({id: s.reference, title: s.libelle, start: s.dateStart, end: s.dateStop});
    }
  }
  showBasicDialog(arg) {
    this.displayBasic = true;
    this.session.dateStart = arg.date;
    this.session.dateStop = arg.date;
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
  public save() {
    this.sessionService.save();
    this.handleDateClick();
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
}
