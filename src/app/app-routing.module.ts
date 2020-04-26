import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EnseignantComponent} from './components/enseignant/enseignant.component';
import {NotFoundComponent} from './components/not-found/not-found.component';


const routes: Routes = [
  {path: 'enseignant', component: EnseignantComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
