import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Enseignant} from '../../controller/model/enseignant.model';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Module} from '../../controller/model/module';
import {Semestre} from '../../controller/model/semestre';
import {AuthenticationService} from '../../controller/service/authentication.service';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {ModuleService} from '../../controller/service/module.service';
import {NotificationService} from '../../controller/service/notification.service';
import {Message} from 'primeng';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  invalidLogin = false;
  msgs: Message[] = [];
  constructor(private etudiantService: EtudiantService, private enseignantService: EnseignantService,
              private router: Router, private moduleService: ModuleService,
              private notificationService: NotificationService, private loginservice: AuthenticationService) { }
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
  get modulesFounded(): Module[] {
    return this.moduleService.modulesFounded;
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit(): void {
    this.etudiantService.etudiantFounded = null;
    this.etudiantService.etudiantConnected = null;
    this.enseignantService.enseignantFounded = null;
    this.enseignantService.enseignantConnected = null;
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
            await this.findBySemestre(this.etudiantConnected.groupe.semestre);
            this.router.navigate(['/emploiEtu']);
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
          this.router.navigate(['/emploi']);
        } else {
          console.log('mail ou mdp not correct');
        }
      } else {
        console.log('student not founded');
      }
      console.log(this.enseignantConnected);
    }
  }
  public async findBySemestre(semestre: Semestre) {
    await this.moduleService.findBySemestre(semestre);
  }
  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
        async (data) => {
          this.enseignantService.enseignantConnected = null;
          this.etudiantService.etudiantConnected = null;
          console.log('haha');
          await this.etudiantService.findByMail(this.username);
          await this.enseignantService.findByMail(this.username);
          console.log(this.enseignantConnected);
          console.log(this.etudiantConnected);
          if ( this.enseignantConnected.role != null) {
          this.router.navigate(['/emploi']);
          } else if (this.etudiantConnected.role != null) {
            this.router.navigate(['/emploiEtu']);
          }
          this.invalidLogin = false;
        },
        (error) => {
          this.invalidLogin = true;
          this.msgs = [];
          this.msgs.push({severity: 'error', summary: 'Erreur', detail: 'Email ou mot de passe incorrect'});
        },
      )
    );
    this.password = null;
  }
}
