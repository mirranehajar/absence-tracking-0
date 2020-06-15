import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../controller/model/etudiant.model';
import {EtudiantService} from '../../controller/service/etudiant.service';

@Component({
  selector: 'app-profil-etu',
  templateUrl: './profilEtu.component.html',
  styleUrls: ['./profilEtu.component.scss'],
})
export class ProfilEtuComponent implements OnInit {
  displayBasic: boolean;
  displayBasic2: boolean;
  private _url = 'http://localhost:8090/absence-tracking/etudiant/';
  selectedFile: File;
  retrievedImage: any;
  message: string;
  password: string;
  passwordConfirm: string;
  currentPassword: string;
  passwordUpdate: string;
  img: any;

  constructor(private etudiantService: EtudiantService, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    await this.getImage(this.etudiantConnected.cin);
  }

  showBasicDialog() {
    this.displayBasic = true;
  }
  updatePassword() {
    if (this.currentPassword === this.etudiantConnected.password && this.password === this.passwordConfirm) {
      this.etudiantService.etudiantFounded = this.etudiantConnected;
      this.etudiantService.etudiantFounded.password = this.password;
      this.etudiantService.update();
      this.displayBasic = false;
    }
  }
  update() {
    if (this.etudiantConnected.password === this.passwordUpdate) {
      this.etudiantService.etudiantFounded = this.etudiantConnected;
      this.etudiantService.update();
      this.displayBasic2 = false;
    }
}
  showBasicDialog2() {
    this.displayBasic2 = true;
  }
  get etudiantConnected(): Etudiant {
    return this.etudiantService.etudiantConnected;
  }
  get etudiantFounded(): Etudiant {
    return this.etudiantService.etudiantFounded;
  }
  public async onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
    await this.upload();
    await this.getImage(this.etudiantConnected.cin);
    this.etudiantConnected.src = this.retrievedImage;
  }
  public async upload() {
    console.log(this.selectedFile);
    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    await this.http.post<number>(this._url + 'upload/' + this.etudiantConnected.cne , uploadImageData)
      .toPromise().then((response) => {
          if (response === 1) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        },
      );
  }
  async getImage(cin: string): Promise<any> {
    // Make a call to Spring Boot to get the Image Bytes.
    await this.http.get<Etudiant>(this._url + 'get/' + cin)
      .toPromise().then(
        (res) => {
          this.retrievedImage = 'data:image/jpeg;base64,' + res.image;
          this.etudiantConnected.src = 'data:image/jpeg;base64,' + res.image;
        },
      );
  }
}
