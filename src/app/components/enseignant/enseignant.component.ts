import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import {Enseignant} from '../../controller/model/enseignant.model';
import {EnseignantService} from '../../controller/service/enseignant.service';

type AOA = any[][];

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss'],
  providers: [ConfirmationService, MessageService],
})

export class EnseignantComponent implements OnInit {
  importProfessors: Enseignant[] = new Array<Enseignant>();
  msgs: Message[] = [];
  displayBasic: boolean;
  displayBasic2: boolean;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  data: AOA = [['N°SOM', 'Cin', 'Prénom', 'Nom', 'J.Naissance', 'N°tél']];
  fileName = 'Example-professor.xlsx';
  private _url = 'http://localhost:8090/absence-tracking/enseignant/';
  selectedFile: File;
  retrievedImage: any;
  message: string;
  numeroSOM: number;
  cols: any[];
  constructor(private http: HttpClient, private enseignantService: EnseignantService, private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    await this.enseignantService.findAll();
    for ( const e of this.enseignants) {
      await this.getImage(e.cin);
      e.src = this.retrievedImage;
    }
    this.cols = [
      { field: 'numeroSOM', header: 'N°SOM' },
      { field: 'cin', header: 'Cin' },
      { field: 'lastName', header: 'Nom' },
      { field: 'firstName', header: 'Prénom' },
      { field: 'mail', header: 'Email' },
      { field: 'tel', header: 'Tel' },
      { field: 'birthDay', header: 'J.Naissance' },
    ];
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
    window.location.reload();
  }
  public update() {
    this.enseignantService.update();
    this.displayBasic2 = false;
    window.location.reload();
  }
  get enseignant(): Enseignant {
    return this.enseignantService.enseignant;
  }
  get enseignants(): Enseignant[] {
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
      this.importProfessors = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as Enseignant[];
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

  // Gets called when the user selects an image
  public onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
  }
  // Gets called when the user clicks on submit to upload the image
  public upload() {
    console.log(this.selectedFile);
    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.http.post(this._url + 'upload/' + this.numeroSOM , uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        },
      );
  }
  // Gets called when the user clicks on retrieved image button to get the image from back end
  async getImage(cin: string): Promise<any> {
    // Make a call to Spring Boot to get the Image Bytes.
    await this.http.get<Enseignant>(this._url + 'get/' + cin)
      .toPromise().then(
        (res) => {
          this.retrievedImage = 'data:image/jpeg;base64,' + res.image;
          console.log(this.retrievedImage);
        },
      );
  }
}
