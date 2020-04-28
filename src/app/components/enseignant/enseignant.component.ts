import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {Enseignant} from '../../controller/model/enseignant.model';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss'],
  providers: [ConfirmationService]
})
export class EnseignantComponent implements OnInit {
  importProfessors: Array<Enseignant> = new Array<Enseignant>();
  msgs: Message[] = [];
  displayBasic: boolean;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

  constructor(private enseignantService: EnseignantService) { }

  ngOnInit(): void {this.enseignantService.findAll();
  }
  public deleteByMatricule(enseignant: Enseignant) {
    this.enseignantService.deleteByMatricule(enseignant);
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  public save() {
    this.enseignantService.save();
    this.displayBasic = false;
  }
  get enseignant(): Enseignant {
    return this.enseignantService.enseignant;
  }
  get enseignants(): Array<Enseignant> {
    return this.enseignantService.enseignants;
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
        this.enseignant.matricule = prof[0];
        this.enseignant.birthDay = prof[4];
        this.enseignant.firstName = prof[2];
        this.enseignant.lastName = prof[3];
        this.enseignant.cin = prof[1];
        this.enseignant.tel = prof[5];
        this.enseignantService.save();

      }
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
