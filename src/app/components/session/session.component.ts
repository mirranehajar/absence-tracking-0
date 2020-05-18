import {Component, OnInit, ViewChild} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core/structs/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import {Session} from '../../controller/model/session';
import {TypeSession} from '../../controller/model/type-session';
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
  constructor(private typeSessionService: TypeSessionService, private sessionService: SessionService) { }

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: this.session.libelle, start: new Date() },
  ];

  ngOnInit(): void {
    this.sessionService.findAll();
    for (const s of this.sessions) {
      this.calendarEvents.push({ title: s.libelle, start: s.dateStart, end: s.dateStop});
    }
  }
  showBasicDialog(arq) {
    this.displayBasic = true;
    this.handleDateClick(arq);
  }
  showBasicDialog2(arq) {
    this.displayBasic2 = true;
    this.handleDateClick(arq);
  }
  handleDateClick(arg) {
    this.session.dateStart = arg.date;
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: this.session.libelle,
        start: arg.date,
        end: arg.date.getTime() + (1000 * 60 * 60 * 2),
        allDay: arg.allDay,
      });
  }
  public findByLibelle(session: Session) {
    this.sessionService.findByLibelle(session);
  }
  public findByReference(session: Session) {
    this.sessionService.findByReference(session);
  }
  public deleteByReference(session: Session) {
    this.sessionService.deleteByReference(session);
  }
  public update() {
    this.sessionService.update();
  }
  public save() {
    this.sessionService.save();
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
}
