import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EnseignantComponent} from './components/enseignant/enseignant.component';
import {EtudiantsComponent} from './components/etudiants/etudiants.component';


const routes: Routes = [
  {path: 'enseignant', component: EnseignantComponent},
  {path: 'etudiant', component: EtudiantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
