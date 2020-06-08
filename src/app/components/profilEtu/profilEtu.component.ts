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

  constructor(private etudiantService: EtudiantService, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    console.log(this.etudiantConnected);
    await this.getImage(this.etudiantConnected.cin);
    this.etudiantConnected.src = this.retrievedImage;
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
  }
  get etudiantConnected(): Etudiant {
    return this.etudiantService.etudiantConnected;
  }
  public upload() {
    console.log(this.selectedFile);
    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.http.post(this._url + 'upload/' + this.etudiantConnected.cne , uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
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
          console.log(this.retrievedImage);
        },
      );
  }
}
