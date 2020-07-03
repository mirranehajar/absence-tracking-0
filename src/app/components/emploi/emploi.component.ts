import { Component, OnInit } from '@angular/core';
import {EventInput} from '@fullcalendar/core/structs/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import {MessageService} from 'primeng/api';
import {Session} from '../../controller/model/session';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {SessionService} from '../../controller/service/session.service';

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.scss'],
  providers: [MessageService],
})
export class EmploiComponent implements OnInit {

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  hours =  {
    daysOfWeek: [ 1, 2, 3, 4 , 5 , 6],
    startTime: '08:00',
    endTime: '19:00',
  };
  displayBasic: boolean;
  constructor(private sessionService: SessionService, private enseignantService: EnseignantService,
              private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    await this.sessionService.findByEnseignant(this.enseignantService.enseignantConnected);
    for (const s of this.sessionService.sessionsFounded) {
      this.sessionService.sessions.push(s);
      console.log(s);
      this.calendarEvents = this.calendarEvents.concat({id: s.reference, title: s.libelle, start: s.dateStart, end: s.dateStop});
    }
  }
  public async showBasicDialog(event) {
    await this.sessionService.findByReference(event.event.id);
    this.displayBasic = true;
  }
  get sessionFounded(): Session {
    return this.sessionService.sessionFounded;
  }
  public deleteByReference(session: Session) {
    this.sessionService.deleteByReference(session);
    this.displayBasic = false;
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Séance supprimée'});
  }
}
