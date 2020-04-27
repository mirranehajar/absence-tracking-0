import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EnseignantComponent} from './enseignant.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: EnseignantComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class EnseignantRoutingModule {}
