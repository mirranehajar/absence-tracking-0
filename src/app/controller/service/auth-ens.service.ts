import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Enseignant} from '../model/enseignant.model';
import {Etudiant} from '../model/etudiant.model';
import {AuthenticationService} from './authentication.service';
import {EnseignantService} from './enseignant.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEnsService implements  CanActivate {

  constructor(private router: Router, private authService: AuthenticationService, private enseignantService: EnseignantService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) {
      console.log('hana');
      if (this.enseignantConnected.role != null) {
        console.log(this.enseignantConnected);
        return true;
      }
      this.router.navigate(['emploi']);
      return false;
    } else {
    this.router.navigate(['login']);
    return false;
    }
  }
  get enseignantConnected(): Enseignant {
    return this.enseignantService.enseignantConnected;
  }
}
