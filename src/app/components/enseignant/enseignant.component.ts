import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {Enseignant} from '../../controller/model/enseignant.model';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss'],
  providers: [ConfirmationService]
})
export class EnseignantComponent implements OnInit {
  importContacts: Array<Enseignant> = new Array<Enseignant>();
  msgs: Message[] = [];
  displayBasic: boolean;
  position: string;

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
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = this.enseignantService.importFromFile(bstr) as any[];

      const header: string[] = Object.getOwnPropertyNames(new Enseignant());
      const importedData = data.slice(1, -1);

      this.importContacts = importedData.map(arr => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return obj as Enseignant;
      });
      for (const imported of this.importContacts) {
        console.log(imported.matricule);
        console.log(imported.cin);
        console.log(imported.lastName);
        console.log(imported.firstName);
        console.log(imported.tel);
        console.log(imported.birthDay);
      }
    };
    reader.readAsBinaryString(target.files[0]);
    for (const imported of this.importContacts) {
      this.enseignants.push(imported);
    }
  }
}
