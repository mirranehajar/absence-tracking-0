// @ts-ignore
import {NgModule} from '@angular/core';
// @ts-ignore
import {CommonModule} from '@angular/common';
import {EnseignantRoutingModule} from './enseignant-routing.module';
// @ts-ignore
import {ButtonModule} from 'primeng/button';
// @ts-ignore
import {TabViewModule} from 'primeng/tabview';
// @ts-ignore
import {CodeHighlighterModule} from 'primeng/codehighlighter';
// @ts-ignore
import {ConfirmDialogModule, MessagesModule} from 'primeng';

// @ts-ignore
@NgModule({
  imports: [
    CommonModule,
    EnseignantRoutingModule,
    ConfirmDialogModule,
    ButtonModule,
    MessagesModule,
    TabViewModule,
    CodeHighlighterModule
  ],
  declarations: [
  ]
})
export class EnseignantModule {}
