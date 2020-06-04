import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FullCalendarModule} from '@fullcalendar/angular';
import {InputsModule, WavesModule} from 'angular-bootstrap-md';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {IconsModule} from 'angular-bootstrap-md';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {
  AccordionModule,
  ConfirmDialogModule,
  DialogModule,
  FileUploadModule,
  MenubarModule,
  MessagesModule, PanelModule, SelectButtonModule,
  SplitButtonModule, TableModule,
  TabViewModule,
  ToastModule,
} from 'primeng';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AbsenceComponent} from './components/absence/absence.component';
import {EnseignantComponent} from './components/enseignant/enseignant.component';
import {EtudiantsComponent} from './components/etudiants/etudiants.component';
import {GroupesComponent} from './components/groupes/groupes.component';
import {LoginComponent} from './components/login/login.component';
import {ModuleComponent} from './components/module/module.component';
import {ProfilComponent} from './components/profil/profil.component';
import {SessionComponent} from './components/session/session.component';
import {TryComponent} from './components/try/try.component';
import {AsideComponent} from './layout/aside/aside.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {MainComponent} from './layout/main/main.component';

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
    TryComponent,
    ModuleComponent,
  ],
  imports: [
    MatIconModule,
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
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    FullCalendarModule,
    AccordionModule,
    DragDropModule,
    SelectButtonModule,
    PanelModule,
    FullCalendarModule,
    TooltipModule.forRoot(),
    IconsModule,
    TableModule,
    MatPaginatorModule,
    WavesModule.forRoot(),
    InputsModule.forRoot(),
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
