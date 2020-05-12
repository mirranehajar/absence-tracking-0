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
import {
    AccordionModule,
    ConfirmDialogModule,
    DialogModule, DropdownModule,
    FileUploadModule,
    MenubarModule,
    MessagesModule, PanelModule, SelectButtonModule,
    SplitButtonModule,
    TabViewModule,
    ToastModule
} from 'primeng';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { GroupesComponent } from './components/groupes/groupes.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AbsenceComponent } from './components/absence/absence.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SessionComponent } from './components/session/session.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { TryComponent } from './components/try/try.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    MainComponent,
    FooterComponent,
    EnseignantComponent,
    EtudiantsComponent,
    GroupesComponent,
    AbsenceComponent,
    LoginComponent,
    ProfilComponent,
    SessionComponent,
    TryComponent
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
    ToastModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    FontAwesomeModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    FullCalendarModule,
    AccordionModule,
    DropdownModule,
    DragDropModule,
    SelectButtonModule,
    PanelModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
