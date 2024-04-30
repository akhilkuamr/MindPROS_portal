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
  filesToUpload: File[] = [];
  fileUploaded: boolean = false;
  uploadedFiles: any = [];
  counter: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.counter = localStorage.getItem('user');
    }
    // console.log(this.counter, '27');

    this.getUploadedFiles();
  }

  selectImage(event: any) {
    this.filesToUpload.push(...event.target.files);
    this.fileUploaded = true;
    //console.log(this.filesToUpload, '35');
  }

  getUploadedFiles() {
    this.http.get('http://localhost:3000/files').subscribe((files) => {
      this.uploadedFiles = files;
      //console.log(this.uploadedFiles);
    });
  }

  navigateToNextWindow(filename: string) {
    // Implement navigation logic here
    console.log('Navigate to next window for file:', filename);
  }

  // downloadFile(filename: string[]) {
  //   window.open(`http://localhost:3000/images/${filename}`, '_blank');
  // }

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
  }
}
