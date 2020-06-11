import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {TabViewModule} from 'primeng/tabview';
import {HeaderRoutingModule} from './header-routing.module';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    CodeHighlighterModule,
  ],
})
export class HeaderModule { }
