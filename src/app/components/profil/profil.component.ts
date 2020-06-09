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
  private _url = 'http://localhost:8090/absence-tracking/enseignant/';
  selectedFile: File;
  retrievedImage: any;
  message: string;
  password: string;
  passwordConfirm: string;
  currentPassword: string;
  passwordUpdate: string;

  constructor(private http: HttpClient, private enseignantService: EnseignantService) { }

  ngOnInit(): void {
    this.getImage(this.enseignantConnected.cin);

  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
  }

  // Gets called when the user selects an image
  public onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
    this.upload();
  }
  // Gets called when the user clicks on submit to upload the image
  public upload() {
    console.log(this.selectedFile);
    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.http.post(this._url + 'upload/' + this.enseignantConnected.numeroSOM , uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        },
      );
    this.getImage(this.enseignantConnected.cin);
  }
  // Gets called when the user clicks on retrieved image button to get the image from back end
  async getImage(cin: string): Promise<any> {
    // Make a call to Spring Boot to get the Image Bytes.
    await this.http.get<Enseignant>(this._url + 'get/' + cin)
      .toPromise().then(
        (res) => {
          this.enseignantConnected.src = 'data:image/jpeg;base64,' + res.image;
        },
      );
  }
  get enseignantConnected(): Enseignant {
    return this.enseignantService.enseignantConnected;
  }
  updatePassword() {
    if (this.currentPassword === this.enseignantConnected.password && this.password === this.passwordConfirm) {
      this.enseignantService.enseignantFounded = this.enseignantConnected;
      this.enseignantService.enseignantFounded.password = this.password;
      this.enseignantService.update();
      this.displayBasic = false;
    }
  }
  update() {
    if (this.enseignantConnected.password === this.passwordUpdate) {
      this.enseignantService.enseignantFounded = this.enseignantConnected;
      this.enseignantService.update();
      this.displayBasic2 = false;
    }
  }
}
