import {Component, OnInit} from '@angular/core';
import {Absence} from '../../controller/model/absence';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Notification} from '../../controller/model/notification';
import {AbsenceService} from '../../controller/service/absence.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {NotificationService} from '../../controller/service/notification.service';

@Component({
  selector: 'app-justification',
  templateUrl: './justification.component.html',
  styleUrls: ['./justification.component.scss'],
})

export class JustificationComponent implements OnInit {
  basicDialog: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private etudiantService: EtudiantService, private absenceService: AbsenceService, private notificationService: NotificationService) {
  }

  async ngOnInit() {
    this.absenceService.absencesEtudiant = null;
    await this.absenceService.findByEtudiant(this.etudiantService.etudiantConnected);
    for (const a of this.absencesFounded) {
      if (a.absent === true && a.justification === null) {
        this.absencesEtudiant.push(a);
      }
    }
  }
  get absencesFounded(): Absence[] {
    return this.absenceService.absencesFounded;
  }
  get absencesEtudiant(): Absence[] {
    return this.absenceService.absencesEtudiant;
  }
  get absences(): Absence[] {
    return this.absenceService.absences;
  }
  get absenceFounded(): Absence {
    return this.absenceService.absenceFounded;
  }
  ShowBasicDialog(absence: Absence) {
    this.absenceService.absenceFounded = absence;
    console.log(this.absenceFounded);
    this.basicDialog = true;
  }
  async update() {
    this.notificationService.notificationFounded = null;
    await this.notificationService.findByAbsence(this.absenceFounded);
    if (this.notificationFounded == null) {
      this.notificationService.notification.absence = this.absenceFounded;
      this.notificationService.notification.contenu = this.absenceFounded.justification;
      console.log(this.notification);
      this.notificationService.save();
    } else {
      console.log(this.notificationFounded);
      this.notificationService.notificationFounded.state = null;
      this.notificationService.notificationFounded.absence = this.absenceFounded;
      console.log(this.notificationFounded);
      this.notificationService.update();
    }
    this.basicDialog = false;
  }
  get etudiantConnected(): Etudiant {
    return this.etudiantService.etudiantConnected;
  }
  get notification(): Notification {
    return this.notificationService.notification;
  }
  get notificationFounded(): Notification {
    return this.notificationService.notificationFounded;
  }
}
