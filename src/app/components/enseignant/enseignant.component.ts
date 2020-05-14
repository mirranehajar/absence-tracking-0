import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {Enseignant} from '../../controller/model/enseignant.model';
import * as XLSX from 'xlsx';
import {MessageService} from 'primeng/api';
import {Sort} from '@angular/material/sort';
import {MdbTableDirective} from 'angular-bootstrap-md';

type AOA = any[][];

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class EnseignantComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective;
  searchText = '';
  previous: string;
  importProfessors: Array<Enseignant> = new Array<Enseignant>();
  msgs: Message[] = [];
  displayBasic: boolean;
  displayBasic2: boolean;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  data: AOA = [['Numéro de SOM', 'Cin', 'Prénom', 'Nom', 'Jour de naissance', 'Numéro de téléphone', 'Departement']];
  fileName = 'Example-professor.xlsx';
  sortedData: Enseignant[];
  constructor(private enseignantService: EnseignantService, private messageService: MessageService) { }
  @HostListener('input') oninput() { this.searchItems(); }

  ngOnInit(): void {this.enseignantService.findAll();
                    this.sortedData = this.enseignants.slice();
                    this.mdbTable.setDataSource(this.sortedData);
                    this.previous = this.mdbTable.getDataSource();
  }
  public deleteByNumeroSOM(enseignant: Enseignant) {
    this.enseignantService.deleteByNumeroSOM(enseignant);
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  showBasicDialog2(enseignantFounded: Enseignant) {
    this.displayBasic2 = true;
    this.findByNumeroSOM(enseignantFounded);
  }
  public findByNumeroSOM(enseignantFounded: Enseignant) {
    this.enseignantService.findByNumeroSOM(enseignantFounded);
  }
  public save() {
    this.enseignantService.save();
    this.displayBasic = false;
  }
  public update() {
    this.enseignantService.update();
    this.displayBasic = false;
    window.location.reload();
  }
  get enseignant(): Enseignant {
    return this.enseignantService.enseignant;
  }
  get enseignants(): Array<Enseignant> {
    return this.enseignantService.enseignants;
  }
  get enseignantFounded(): Enseignant {
    return this.enseignantService.enseignantFounded;
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
      this.importProfessors = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as Array<Enseignant>;
      console.log(this.importProfessors);
      for (const prof of this.importProfessors) {
        this.enseignant.numeroSOM = prof[0];
        this.enseignant.birthDay = prof[4];
        this.enseignant.firstName = prof[2];
        this.enseignant.lastName = prof[3];
        this.enseignant.cin = prof[1];
        this.enseignant.tel = prof[5];
        this.enseignantService.save();
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
  sortData(sort: Sort) {
    const data = this.enseignants.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'numeroSOM': return compare(a.numeroSOM, b.numeroSOM, isAsc);
        case 'cin': return compare(a.cin, b.cin, isAsc);
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'birthday': return compare(a.birthDay, b.birthDay, isAsc);
        case 'tel': return compare(a.tel, b.tel, isAsc);
        case 'mail': return compare(a.mail, b.mail, isAsc);
        default: return 0;
      }
    });
  }
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.sortedData = this.mdbTable.getDataSource(); }
    if (this.searchText) {
      this.sortedData = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev); } }
}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
