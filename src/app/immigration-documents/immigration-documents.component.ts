import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-immigration-documents',
  templateUrl: './immigration-documents.component.html',
  styleUrl: './immigration-documents.component.css',
})
export class ImmigrationDocumentsComponent {
  images: any;

  constructor(private http: HttpClient, private form: FormBuilder) {}
  selectImage(event: any) {
    const file = event.target.files[0];
    this.images = file;
    console.log(this.images);
    console.log('Selected file:', file);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.images);

    this.http
      .post<any>('http://localhost:3000/file', formData)
      .subscribe((res) => console.log(res));
  }
}
