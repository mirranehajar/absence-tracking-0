import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Enseignant} from '../../controller/model/enseignant.model';
import {EnseignantService} from '../../controller/service/enseignant.service';

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss'],
})

export class TryComponent implements OnInit {
  title = 'ImageUpload';
  constructor(private httpClient: HttpClient, private enseignantService: EnseignantService) { }
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  numeroSOM: number;
  get enseignant(): Enseignant {
    return this.enseignantService.enseignant;
  }
  // Gets called when the user selects an image
  public onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
  }
  // Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    // Make a call to the Spring Boot Application to save the image
    // tslint:disable-next-line:max-line-length
    this.httpClient.post('http://localhost:8090/absence-tracking/enseignant/upload/' + this.numeroSOM , uploadImageData, { observe: 'response' })
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
  getImage() {
    // Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8090/absence-tracking/enseignant/get/' + this.imageName)
      .subscribe(
        (res) => {
          this.retrieveResonse = res;
          console.log(this.retrieveResonse);
          this.base64Data = this.retrieveResonse.image;
          console.log(this.retrieveResonse);
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
      );
  }

  ngOnInit(): void {
  }
}
