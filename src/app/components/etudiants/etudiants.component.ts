import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {ConfirmationService, Message} from 'primeng/api';
import {MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import {Etudiant} from '../../controller/model/etudiant.model';
import {Groupe} from '../../controller/model/groupe';
import {Sector} from '../../controller/model/sector';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {GroupeService} from '../../controller/service/groupe.service';
import {SectorService} from '../../controller/service/sector.service';

type AOA = any[][];

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class EtudiantsComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective;
  previous: string;
  importStudents: Etudiant[] = new Array<Etudiant>();
  msgs: Message[] = [];
  displayBasic: boolean;
  displayBasic2: boolean;
  sortedData: Etudiant[];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  data: AOA = [['Cne', 'Cin', 'Code Apogee', 'First Name', 'Last Name', 'Birthday', 'Phone Number', 'Sector', 'Group']];
  fileName = 'Example-student.xlsx';

  constructor(private etudiantService: EtudiantService, private messageService: MessageService,
              private sectorService: SectorService, private groupeService: GroupeService) { }
  ngOnInit(): void {
    this.etudiantService.findAll();
    this.groupeService.findAll();
    this.sectorService.findAll();
    this.sortedData = this.etudiants.slice();
    this.mdbTable.setDataSource(this.sortedData);
    this.previous = this.mdbTable.getDataSource();
  }

  public deleteByCne(etudiant: Etudiant) {
    this.etudiantService.deleteByCne(etudiant);
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  showBasicDialog2(etudiant: Etudiant) {
    this.displayBasic2 = true;
    this.findByCne(etudiant);
  }
  public findByCne(etudiantFounded: Etudiant) {
    this.etudiantService.findByCne(etudiantFounded);
  }
  public save() {
    this.etudiantService.save();
    this.displayBasic = false;
  }
  public update() {
    this.etudiantService.update();
    this.displayBasic2 = false;
    window.location.reload();
  }
  get etudiantFounded(): Etudiant {
    return this.etudiantService.etudiantFounded;
  }
  get etudiant(): Etudiant {
    return this.etudiantService.etudiant;
  }
  get etudiants(): Etudiant[] {
    return this.etudiantService.etudiants;
  }
  get sectors(): Sector[] {
    return this.sectorService.sectors;
  }
  get sector(): Sector {
    return this.sectorService.sector;
  }
  get groupe(): Groupe {
    return this.groupeService.groupe;
  }
  get groupes(): Groupe[] {
    return this.groupeService.groupes;
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.importStudents = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as Etudiant[];
      for (const stud of this.importStudents) {
        this.etudiant.cin = stud[0];
        this.etudiant.codeApogee = stud[2];
        this.etudiant.birthDay = stud[5];
        this.etudiant.firstName = stud[3];
        this.etudiant.lastName = stud[4];
        this.etudiant.cne = stud[1];
        this.etudiant.tel = stud[6];
        this.etudiantService.save();
        window.location.reload();
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }
  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  onBasicUpload(event) {
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
  }
  sortData(sort: Sort) {
    const data = this.etudiants.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Cne': return compare(a.cne, b.cne, isAsc);
        case 'Code apogée': return compare(a.codeApogee, b.codeApogee, isAsc);
        case 'Cin': return compare(a.cin, b.cin, isAsc);
        case 'Prénom': return compare(a.firstName, b.firstName, isAsc);
        case 'Nom': return compare(a.lastName, b.lastName, isAsc);
        case 'Jour de naissance': return compare(a.birthDay, b.birthDay, isAsc);
        case 'Téléphone': return compare(a.tel, b.tel, isAsc);
        case 'Email': return compare(a.mail, b.mail, isAsc);
        case 'Filière': return compare(a.filiere, b.filiere, isAsc);
        case 'Groupe': return compare(a.groupe, b.groupe, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: number | string | Date | Sector | Groupe, b: number | string | Date | Sector | Groupe, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
