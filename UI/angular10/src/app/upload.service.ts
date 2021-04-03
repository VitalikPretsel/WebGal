import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private service: SharedService) { }

  formData: any;
  fileToUpload: any;
  public picturePath: any;

  public uploadFile = (files) => {
    if (files.length === 0) { return; }
    this.fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.service.uploadFile(this.formData).subscribe(() => {
      this.picturePath = "resources/images/" + this.fileToUpload.name;
    });
  }

  public deleteFile() {
    this.service.deleteFile(this.fileToUpload?.name).subscribe(() =>
      this.formData?.delete("file")
    );
    this.picturePath = '';
  }
}
