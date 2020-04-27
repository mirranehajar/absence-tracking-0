// @ts-ignore
import {NgModule} from '@angular/core';
// @ts-ignore
import {RouterModule} from '@angular/router';
import {EnseignantComponent} from './enseignant.component';

// @ts-ignore
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
