import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Enseignant} from '../../controller/model/enseignant.model';
import {EnseignantService} from '../../controller/service/enseignant.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  displayBasic: boolean;
  displayBasic2: boolean;
  private _url = 'http://localhost:8090/absence-tracking/etudiant/';
  selectedFile: File;
  retrievedImage: any;
  message: string;
  cne: string;

  constructor(private http: HttpClient, private enseignantService: EnseignantService) { }

  ngOnInit(): void {

  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
  }
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
  get enseignantConnected(): Enseignant {
    return this.enseignantService.enseignantConnected;
  }
}
