import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnseignantComponent} from './components/enseignant/enseignant.component';
import {EtudiantsComponent} from './components/etudiants/etudiants.component';
import {ProfilComponent} from './components/profil/profil.component';

const routes: Routes = [
  {path: 'enseignant', component: EnseignantComponent},
  {path: 'etudiant', component: EtudiantsComponent},
  {path: 'profil', component: ProfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
