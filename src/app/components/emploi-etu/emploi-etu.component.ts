import { Component, OnInit } from '@angular/core';
import {EventInput} from '@fullcalendar/core/structs/event';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import {Absence} from '../../controller/model/absence';
import {Session} from '../../controller/model/session';
import {AbsenceService} from '../../controller/service/absence.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {NotificationService} from '../../controller/service/notification.service';
import {SessionService} from '../../controller/service/session.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from 'primeng';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-emploi-etu',
  templateUrl: './emploi-etu.component.html',
  styleUrls: ['./emploi-etu.component.scss'],
  providers: [MessageService],
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
  today: Date;
  private _url = 'http://localhost:8090/absence-tracking/notification/';
  selectedFile: File;
  message: string;
  contenu: string;
  displayBasic: boolean;
  displayBasic2: boolean;
  userform: FormGroup;
  constructor(private sessionService: SessionService, private etudiantService: EtudiantService,
              private absenceService: AbsenceService, private notificationService: NotificationService,
              private http: HttpClient, private messageService: MessageService, private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.userform = this.fb.group({
      contenu: new FormControl('', Validators.required),
    });
    this.today = new Date();
    await this.sessionService.findBySemestre(this.etudiantService.etudiantConnected.groupe.semestre);
    for (const s of this.sessionService.sessionsFounded) {
      this.sessionService.sessions.push(s);
      console.log(s);
      this.calendarEvents = this.calendarEvents.concat({id: s.reference, title: s.libelle, start: s.dateStart, end: s.dateStop});
    }
  }
  public async showBasicDialog(event) {
    this.absenceService.boolean = true;
    await this.sessionService.findByReference(event.event.id);
    await this.absenceService.findBySessionAndEtudiant(this.sessionService.sessionFounded, this.etudiantService.etudiantConnected);
    if (event.date >= this.today) {
      this.displayBasic = true;
    }
  }
  get absenceFounded(): Absence {
    return this.absenceService.absenceFounded;
  }
  async update() {
    this.notificationService.notificationFounded = null;
    await this.notificationService.findByAbsence(this.absenceFounded);
    if (this.notificationService.notificationFounded == null) {
      this.notificationService.notification.absence = this.absenceFounded;
      this.notificationService.notification.contenu = this.absenceFounded.justification;
      console.log(this.notificationService.notification);
      await this.notificationService.save();
    } else {
      console.log(this.notificationService.notificationFounded);
      this.notificationService.notificationFounded.state = null;
      this.notificationService.notificationFounded.absence = this.absenceFounded;
      this.notificationService.notificationFounded.contenu = this.absenceFounded.justification;
      console.log(this.notificationService.notificationFounded);
      await this.notificationService.update();
    }
    await this.upload();
    this.displayBasic = false;
    this.messageService.add({severity: 'info', summary: 'Succès', detail: 'Justification envoyée'});
  }
  get boolean(): boolean {
    return this.absenceService.boolean;
  }
  get sessionFounded(): Session {
    return this.sessionService.sessionFounded;
  }
  public async onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
  }
  // Gets called when the user clicks on submit to upload the image
  public async upload() {
    console.log(this.selectedFile);
    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.post<number>(this._url + 'upload/' + this.absenceFounded.ref , uploadImageData, {headers})
      .toPromise().then((response) => {
          if (response === 1) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        },
      );
  }
}
