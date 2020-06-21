import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Etudiant} from '../model/etudiant.model';
import {AuthenticationService} from './authentication.service';
import {EtudiantService} from './etudiant.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEtuService implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService, private etudiantService: EtudiantService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) {
      if (this.etudiantConnected.role != null) {
        return true;
      }
      this.router.navigate(['emploiEtu']);
      return false;
    } else {
    this.router.navigate(['login']);
    return false;
    }
  }
  get etudiantConnected(): Etudiant {
    return this.etudiantService.etudiantConnected;
  }
}
