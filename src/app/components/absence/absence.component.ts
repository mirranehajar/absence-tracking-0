import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng';
import {Absence} from '../../controller/model/absence';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Session} from '../../controller/model/session';
import {AbsenceService} from '../../controller/service/absence.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {SessionService} from '../../controller/service/session.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],
})
export class AbsenceComponent implements OnInit {
  types: SelectItem[];
  cols: any[];
  private _url = 'http://localhost:8090/absence-tracking/etudiant/';
  retrievedImage: any;
  constructor(private etudiantService: EtudiantService, private absenceService: AbsenceService,
              private sessionService: SessionService, private http: HttpClient) {
    this.types = [
      {label: 'Prs', value: false},
      {label: 'Abs', value: true},
    ];
  }

  async ngOnInit(): Promise<void> {
    this.etudiantService.findAll();
    await this.absenceService.findBySession(this.sessionFounded);
    for ( const a of this.absencesFounded) {
      await this.getImage(a.etudiant.cin);
      a.etudiant.src = this.retrievedImage;
      console.log(a.etudiant);
    }
    this.cols = [
      { field: 'cne', header: 'Cne' },
      { field: 'codeApogee', header: 'C.Apogée' },
      { field: 'cin', header: 'Cin' },
      { field: 'lastName', header: 'Nom' },
      { field: 'firstName', header: 'Prénom' },
      { field: 'nbrAbsence', header: 'N.Absence' },
    ];
  }
  get etudiants(): Etudiant[] {
    return this.etudiantService.etudiants;
  }
  get absences(): Absence[] {
    return this.absenceService.absences;
  }
  get absence(): Absence {
    return this.absenceService.absence;
  }
  get absenceFounded(): Absence {
    return this.absenceService.absenceFounded;
  }
  public save() {
    return this.absenceService.save();
  }
  public update(absence: Absence) {
    this.absenceService.absenceFounded = absence;
    this.absenceService.update();
  }
  get absencesFounded(): Absence[] {
    return this.absenceService.absencesFounded;
  }
  get sessionFounded(): Session {
    return this.sessionService.sessionFounded;
  }
  async getImage(cin: string): Promise<any> {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    // Make a call to Spring Boot to get the Image Bytes.
    await this.http.get<Etudiant>(this._url + 'get/' + cin, {headers})
      .toPromise().then(
        (res) => {
          this.retrievedImage = 'data:image/jpeg;base64,' + res.image;
          console.log(this.retrievedImage);
        },
      );
  }
}
