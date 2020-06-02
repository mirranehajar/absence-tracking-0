import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
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
  importStudents: Etudiant[] = new Array<Etudiant>();
  msgs: Message[] = [];
  displayBasic: boolean;
  displayBasic2: boolean;
  wopts: XLSX.WritingOptions = {bookType: 'xlsx', type: 'array'};
  data: AOA = [['Cne', 'Cin', 'Code Apogee', 'First Name', 'Last Name', 'Birthday', 'Phone Number', 'Sector', 'Group']];
  fileName = 'Example-student.xlsx';
  private _url = 'http://localhost:8090/absence-tracking/etudiant/';
  selectedFile: File;
  retrievedImage: any;
  message: string;
  imageName: any;
  cne: string;
  cols: any[];

  constructor(private etudiantService: EtudiantService, private messageService: MessageService,
              private sectorService: SectorService, private groupeService: GroupeService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.etudiantService.findAll();
    this.groupeService.findAll();
    this.sectorService.findAll();
    this.cols = [
      { field: 'cne', header: 'Cne' },
      { field: 'cin', header: 'Cin' },
      { field: 'codeApogee', header: 'C.apogée' },
      { field: 'lastName', header: 'Nom' },
      { field: 'firstName', header: 'Prénom' },
      { field: 'mail', header: 'Email' },
      { field: 'tel', header: 'Tel' },
      { field: 'birthDay', header: 'J.Naissance' },
      { field: 'filiere', header: 'Filière' },
      { field: 'groupe', header: 'Groupe' },
    ];
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
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.importStudents = (XLSX.utils.sheet_to_json(ws, {header: 1})) as Etudiant[];
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
    this.http.post(this._url + 'upload/' + this.cne , uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        },
      );
  }
  // Gets called when the user clicks on retieve image button to get the image from back end
  getImage(cin: string): any {
    // Make a call to Spring Boot to get the Image Bytes.
    this.http.get<Etudiant>(this._url + 'get/' + cin)
      .subscribe(
        (res) => {
          this.retrievedImage = 'data:image/jpeg;base64,' + res.image;
          console.log(this.retrievedImage);
          return this.retrievedImage;
        },
      );
  }
}
