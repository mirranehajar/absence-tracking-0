import { Component, OnInit } from '@angular/core';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Etudiant} from '../../controller/model/etudiant.model';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {EtudiantService} from '../../controller/service/etudiant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private etudiantService: EtudiantService, private enseignantService: EnseignantService) { }

  ngOnInit(): void {
    this.etudiantService.etudiantFounded = null;
    this.etudiantService.etudiantConnected = null;
    this.enseignantService.enseignantFounded = null;
    this.enseignantService.enseignantConnected = null;
  }
  get etudiantConnected(): Etudiant {
    return this.etudiantService.etudiantConnected;
  }
  get enseignantConnected(): Enseignant {
    return this.enseignantService.enseignantConnected;
  }
  get etudiantFounded(): Etudiant {
    return this.etudiantService.etudiantFounded;
  }
  get enseignantFounded(): Enseignant {
    return this.enseignantService.enseignantFounded;
  }
    async loginEtu() {
      if (this.etudiantConnected.cne != null) {
        if (this.etudiantFounded != null) {
          await this.etudiantService.findByCne(this.etudiantConnected);
          // tslint:disable-next-line:max-line-length
          if (this.etudiantFounded.mail === this.etudiantConnected.mail && this.etudiantFounded.password === this.etudiantConnected.password) {
            console.log('mail and password correct');
            this.etudiantService.etudiantConnected = this.etudiantFounded;
            console.log(this.etudiantConnected);
            console.log(this.etudiantConnected);
          } else {
            console.log('mail ou mdp not correct');
          }
        } else {
          console.log('student not founded');
        }
        console.log(this.etudiantConnected);
      }
    }
  async loginEns() {
    if (this.enseignantConnected.numeroSOM != null) {
      if (this.enseignantFounded != null) {
        await this.enseignantService.findByNumeroSOM(this.enseignantConnected);
        // tslint:disable-next-line:max-line-length
        if (this.enseignantFounded.mail === this.enseignantConnected.mail && this.enseignantFounded.password === this.enseignantConnected.password) {
          console.log('mail and password correct');
          this.enseignantService.enseignantConnected = this.enseignantFounded;
          window.location.href = '/appEns';
        } else {
          console.log('mail ou mdp not correct');
        }
      } else {
        console.log('student not founded');
      }
      console.log(this.enseignantConnected);
    }
  }
}
