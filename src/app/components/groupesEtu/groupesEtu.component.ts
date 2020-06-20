import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Groupe} from '../../controller/model/groupe';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {GroupeService} from '../../controller/service/groupe.service';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupesEtu.component.html',
  styleUrls: ['./groupesEtu.component.scss'],
})
export class GroupesEtuComponent implements OnInit {
  index = -1;
  displayBasic: boolean;
  displayBasic2: boolean;
  cols: any[];
  private _url = 'http://localhost:8090/absence-tracking/etudiant/';
  retrievedImage: any;
  constructor( private etudiantService: EtudiantService, private groupeService: GroupeService, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    await this.etudiantService.findAll();
    await this.groupeService.findBySemestre(this.etudiantConnected.groupe.semestre);
    for (const g of this.groupesFounded) {
      for (const e of g.etudiants) {
        await this.getImage(e.cin);
        e.src = this.retrievedImage;
      }
    }
    this.cols = [
      { field: 'cne', header: 'Cne' },
      { field: 'codeApogee', header: 'C.Apogée' },
      { field: 'cin', header: 'Cin' },
      { field: 'lastName', header: 'Nom' },
      { field: 'firstName', header: 'Prénom' },
      { field: 'mail', header: 'Email' },
      { field: 'tel', header: 'Tel' },
      { field: 'birthDay', header: 'J.Naissance' },
      { field: 'nbrAbsence', header: 'N.Absence' },
    ];
  }
  get groupesFounded(): Groupe[] {
    return this.groupeService.groupesFounded;
  }
  get etudiantConnected(): Etudiant {
    return this.etudiantService.etudiantConnected;
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
