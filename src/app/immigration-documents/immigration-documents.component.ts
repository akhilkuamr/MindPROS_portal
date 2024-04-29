import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-immigration-documents',
  templateUrl: './immigration-documents.component.html',
  styleUrl: './immigration-documents.component.css',
})
export class ImmigrationDocumentsComponent {
  file: any[] = [];

  constructor(private http: HttpClient, private form: FormBuilder) {}

  selectImage(event: any) {
    // console.log('coming from frontend', event);
    // for (let i = 0; i < event.target.files.length; i++) {
    //   console.log(event.target.files.length);
    //   this.file.push(event.target.files[i]);
    //   console.log('After push fil', this.file);
    // }
    // console.log(this.file);
    this.file = event.target.files;
  }

  onSubmit() {
    if (this.file && this.file.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < this.file.length; i++) {
        formData.append(`files`, this.file[i]);
      }
      console.log(formData);

      this.http
        .post<any>('http://localhost:3000/upload', formData)
        .subscribe((res) => console.log(res));
      alert('Files successfully uploaded.');
    }
  }
}
