import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ConfirmDialogModule, MessagesModule} from 'primeng';
import {ButtonModule} from 'primeng/button';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {TabViewModule} from 'primeng/tabview';
import {EnseignantRoutingModule} from './enseignant-routing.module';

// @ts-ignore
@NgModule({
  imports: [
    CommonModule,
    EnseignantRoutingModule,
    ConfirmDialogModule,
    ButtonModule,
    MessagesModule,
    TabViewModule,
    CodeHighlighterModule,
  ],
  declarations: [
  ],
})
export class EnseignantModule {}
