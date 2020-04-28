import { Component, OnInit } from '@angular/core';
import {ConfirmationService, Message} from 'primeng/api';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {Etudiant} from '../../controller/model/etudiant.model';
import * as XLSX from 'xlsx';
import {MessageService} from 'primeng/api';

type AOA = any[][];

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class EtudiantsComponent implements OnInit {
  importStudents: Array<Etudiant> = new Array<Etudiant>();
  msgs: Message[] = [];
  displayBasic: boolean;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  data: AOA = [['Cne', 'Cin', 'Code Apogee', 'First Name', 'Last Name', 'Birthday', 'Phone Number', 'Sector', 'Group']];
  fileName = 'Example-student.xlsx';

  constructor(private etudiantService: EtudiantService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.etudiantService.findAll();
  }

  public deleteByCne(etudiant: Etudiant) {
    this.etudiantService.deleteByCne(etudiant);
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  public save() {
    this.etudiantService.save();
    this.displayBasic = false;
  }
  get etudiant(): Etudiant {
    return this.etudiantService.etudiant;
  }
  get etudiants(): Array<Etudiant> {
    return this.etudiantService.etudiants;
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
      this.importStudents = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as Array<Etudiant>;
      console.log(this.importStudents);
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

}
