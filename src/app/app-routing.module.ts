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
import {AppEnsComponent} from './layout/appEns/appEns.component';
import {AppEtuComponent} from './layout/appEtu/appEtu.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: AppEtuComponent, children: [
      {path: 'profilEtu', component: ProfilEtuComponent},
      {path: 'justificatif', component: JustificationComponent},
      {path: 'moduleEtu', component: ModuleEtuComponent},
      {path: 'groupeEtu', component: GroupesEtuComponent},
      {path: 'sessionEtu', component: SessionComponent},
      {path: 'emploiEtu', component: EmploiEtuComponent},
    ]},
  {path: '', component: AppEnsComponent, children: [
      {path: 'enseignant', component: EnseignantComponent},
      {path: 'etudiant', component: EtudiantsComponent},
      {path: 'profil', component: ProfilComponent},
      {path: 'module', component: ModuleComponent},
      {path: 'absence', component: AbsenceComponent},
      {path: 'groupe', component: GroupesComponent},
      {path: 'session', component: SessionComponent},
      {path: 'statistique', component: StatistiqueComponent},
      {path: 'emploi', component: EmploiComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
