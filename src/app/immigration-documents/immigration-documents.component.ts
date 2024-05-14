import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-immigration-documents',
  templateUrl: './immigration-documents.component.html',
  styleUrl: './immigration-documents.component.css',
})
export class ImmigrationDocumentsComponent implements OnInit {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial'; // Variable to store file status
  filesToUpload: File[] = [];
  fileUploaded: boolean = false;
  uploadedFiles: any = [];
  counter: any;
  fileName: any = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.counter = localStorage.getItem('user');
    }
    this.getUploadedFiles();
  }

  selectImage(event: any) {
    this.status = 'uploading';
    this.filesToUpload.push(...event.target.files);

    this.fileUploaded = true;
  }

  getUploadedFiles() {
    this.http.get('http://localhost:3000/files').subscribe((files) => {
      this.uploadedFiles = files;
    });
  }

  onSubmit() {
    const formData = new FormData();
    this.filesToUpload.forEach((file) => {
      formData.append('files', file, file.name);
    });
    this.http
      .post<any>(
        `http://localhost:3000/upload?param1=${this.counter}`,
        formData
      )
      .subscribe((res) => {
        console.log(res.filename);
      });

    alert('Files successfully uploaded.');
    this.status = 'success';
  }
}
