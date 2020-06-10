import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FullCalendarModule} from '@fullcalendar/angular';
import { InputsModule, WavesModule } from 'angular-bootstrap-md';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { IconsModule } from 'angular-bootstrap-md';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {
  AccordionModule, CardModule,
  ConfirmDialogModule, DataViewModule, DialogModule,
  DropdownModule, FieldsetModule,
  FileUploadModule, KeyFilterModule, MegaMenuModule,
  MenubarModule, MessageModule,
  MessagesModule, MultiSelectModule, PanelModule, RadioButtonModule, SelectButtonModule, SidebarModule,
  SplitButtonModule, TableModule,
  TabViewModule,
  ToastModule,
} from 'primeng';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbsenceComponent } from './components/absence/absence.component';
import { EnseignantComponent } from './components/enseignant/enseignant.component';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { GroupesComponent } from './components/groupes/groupes.component';
import {JustificationComponent} from './components/Justification/justification.component';
import { LoginComponent } from './components/login/login.component';
import {ModuleComponent} from './components/module/module.component';
import { ProfilComponent } from './components/profil/profil.component';
import {ProfilEtuComponent} from './components/profilEtu/profilEtu.component';
import { SessionComponent } from './components/session/session.component';
import {AppEnsComponent} from './layout/appEns/appEns.component';
import {AppEtuComponent} from './layout/appEtu/appEtu.component';
import { AsideComponent } from './layout/aside/aside.component';
import {AsideEtuComponent} from './layout/asideEtu/asideEtu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import {HeaderEtuComponent} from './layout/headerEtu/headerEtu.component';
import { MainComponent } from './layout/main/main.component';
import {MainEtuComponent} from './layout/mainEtu/mainEtu.component';

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
    JustificationComponent,
    ModuleComponent,
    HeaderEtuComponent,
    AsideEtuComponent,
    MainEtuComponent,
    AppEnsComponent,
    AppEtuComponent,
    ProfilEtuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
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
    TableModule,
    MultiSelectModule,
    DropdownModule,
    MegaMenuModule,
    MatGridListModule,
    DataViewModule,
    KeyFilterModule,
    MessageModule,
    MatCardModule,
    CardModule,
    SidebarModule,
    RadioButtonModule,
    FieldsetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
