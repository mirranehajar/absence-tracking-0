import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { AsideComponent } from './layout/aside/aside.component';
import { MainComponent } from './layout/main/main.component';
import { FooterComponent } from './layout/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { EnseignantComponent } from './components/enseignant/enseignant.component';
import {ConfirmDialogModule, DialogModule, MenubarModule, MessagesModule, SplitButtonModule, TabViewModule, ToastModule} from 'primeng';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    MainComponent,
    FooterComponent,
    EnseignantComponent,
    EtudiantsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    TabViewModule,
    SplitButtonModule,
    DialogModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
