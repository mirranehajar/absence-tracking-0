import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnseignantRoutingModule} from './enseignant-routing.module';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule, MessagesModule} from 'primeng';

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
