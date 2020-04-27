import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EnseignantComponent} from './components/enseignant/enseignant.component';


const routes: Routes = [
  {path: 'enseignant', component: EnseignantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
