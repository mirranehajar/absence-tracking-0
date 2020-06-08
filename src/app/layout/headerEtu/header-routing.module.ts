import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderEtuComponent} from './headerEtu.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: HeaderEtuComponent},
    ]),
  ],
  exports: [
    RouterModule,
  ],
})
export class HeaderRoutingModule {}
