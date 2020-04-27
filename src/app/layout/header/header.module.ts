import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
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
    CodeHighlighterModule
  ]
})
export class HeaderModule { }
