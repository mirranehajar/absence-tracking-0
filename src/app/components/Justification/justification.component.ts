import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  private _url = 'http://localhost:8090/absence-tracking/notification/';
  selectedFile: File;
  message: string;
  // tslint:disable-next-line:max-line-length
  constructor(private etudiantService: EtudiantService, private absenceService: AbsenceService,
              private notificationService: NotificationService, private http: HttpClient) {
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
    if (this.notificationFounded.absence == null) {
      this.notificationService.notification.absence = this.absenceFounded;
      this.notificationService.notification.contenu = this.absenceFounded.justification;
      console.log(this.notification);
      await this.notificationService.save();
    } else {
      console.log(this.notificationFounded);
      this.notificationService.notificationFounded.state = null;
      this.notificationService.notificationFounded.absence = this.absenceFounded;
      console.log(this.notificationFounded);
      await this.notificationService.update();
    }
    await this.upload();
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
  public async onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
    console.log(event.target.files[0]);
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
