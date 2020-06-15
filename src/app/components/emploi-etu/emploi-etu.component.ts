import { Component, OnInit } from '@angular/core';
import {EventInput} from '@fullcalendar/core/structs/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {SessionService} from '../../controller/service/session.service';
import {Absence} from '../../controller/model/absence';
import {AbsenceService} from '../../controller/service/absence.service';
import {NotificationService} from '../../controller/service/notification.service';

@Component({
  selector: 'app-emploi-etu',
  templateUrl: './emploi-etu.component.html',
  styleUrls: ['./emploi-etu.component.scss'],
})
export class EmploiEtuComponent implements OnInit {

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
  constructor(private sessionService: SessionService, private etudiantService: EtudiantService,
              private absenceService: AbsenceService, private notificationService: NotificationService) { }

  async ngOnInit(): Promise<void> {
    await this.sessionService.findBySemestre(this.etudiantService.etudiantConnected.groupe.semestre);
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
  get absenceFounded(): Absence {
    return this.absenceService.absenceFounded;
  }
  async update() {
    await this.absenceService.findBySessionAndEtudiant(this.sessionService.sessionFounded, this.etudiantService.etudiantConnected);
    this.notificationService.notificationFounded = null;
    await this.notificationService.findByAbsence(this.absenceFounded);
    if (this.notificationService.notificationFounded == null) {
      this.notificationService.notification.absence = this.absenceFounded;
      this.notificationService.notification.contenu = this.absenceFounded.justification;
      console.log(this.notificationService.notification);
      this.notificationService.save();
    } else {
      console.log(this.notificationService.notificationFounded);
      this.notificationService.notificationFounded.state = null;
      this.notificationService.notificationFounded.absence = this.absenceFounded;
      console.log(this.notificationService.notificationFounded);
      this.notificationService.update();
    }
    this.displayBasic = false;
  }
}
