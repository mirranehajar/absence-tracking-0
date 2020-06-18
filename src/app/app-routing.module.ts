import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AbsenceComponent} from './components/absence/absence.component';
import {EmploiEtuComponent} from './components/emploi-etu/emploi-etu.component';
import {EmploiComponent} from './components/emploi/emploi.component';
import {EnseignantComponent} from './components/enseignant/enseignant.component';
import {EtudiantsComponent} from './components/etudiants/etudiants.component';
import {GroupesComponent} from './components/groupes/groupes.component';
import {GroupesEtuComponent} from './components/groupesEtu/groupesEtu.component';
import {HomeComponent} from './components/home/home.component';
import {JustificationComponent} from './components/Justification/justification.component';
import {LoginComponent} from './components/login/login.component';
import {ModuleComponent} from './components/module/module.component';
import {ModuleEtuComponent} from './components/moduleEtu/moduleEtu.component';
import {ProfilComponent} from './components/profil/profil.component';
import {ProfilEtuComponent} from './components/profilEtu/profilEtu.component';
import {SessionComponent} from './components/session/session.component';
import {StatistiqueComponent} from './components/statistique/statistique.component';
import {AuthGardService} from './controller/service/auth-gard.service';
import {AppEnsComponent} from './layout/appEns/appEns.component';
import {AppEtuComponent} from './layout/appEtu/appEtu.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: AppEtuComponent, canActivate: [AuthGardService] , children: [
      {path: 'profilEtu', component: ProfilEtuComponent, canActivate: [AuthGardService]},
      {path: 'justificatif', component: JustificationComponent, canActivate: [AuthGardService]},
      {path: 'moduleEtu', component: ModuleEtuComponent, canActivate: [AuthGardService]},
      {path: 'groupeEtu', component: GroupesEtuComponent, canActivate: [AuthGardService]},
      {path: 'sessionEtu', component: SessionComponent, canActivate: [AuthGardService]},
      {path: 'emploiEtu', component: EmploiEtuComponent, canActivate: [AuthGardService]},
    ]},
  {path: '', component: AppEnsComponent, children: [
      {path: 'enseignant', component: EnseignantComponent, canActivate: [AuthGardService]},
      {path: 'etudiant', component: EtudiantsComponent, canActivate: [AuthGardService]},
      {path: 'profil', component: ProfilComponent, canActivate: [AuthGardService]},
      {path: 'module', component: ModuleComponent, canActivate: [AuthGardService]},
      {path: 'absence', component: AbsenceComponent, canActivate: [AuthGardService]},
      {path: 'groupe', component: GroupesComponent, canActivate: [AuthGardService]},
      {path: 'session', component: SessionComponent, canActivate: [AuthGardService]},
      {path: 'statistique', component: StatistiqueComponent, canActivate: [AuthGardService]},
      {path: 'emploi', component: EmploiComponent, canActivate: [AuthGardService]},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
