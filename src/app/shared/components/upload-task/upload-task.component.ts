import { FileUploadService } from './../../services/file-upload/file-upload.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FireStoreFile } from '../../models/file';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {
  @Input() path: string;
  @Output() emitResult = new EventEmitter<FireStoreFile>();

  task: AngularFireUploadTask;
  percentage: Observable<number | undefined>;
  snapshot: Observable<any>;
  downloadUrl: string;
  currentFile: File;
  isActive: boolean = false;

  constructor(private fileUpload: FileUploadService) { }

  ngOnInit(): void {
    //this.startUpload();
  }

  onFileSelected($event: any) {
    console.log($event);
    this.isActive = true;
    this.currentFile = $event.target.files[0];

    const fullPath = this.path + this.currentFile.name;

    const ref = this.fileUpload.getStorageReference(fullPath);

    this.task = this.fileUpload.uploadFile(fullPath, this.currentFile);

    this.percentage = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL()
        .subscribe(url => {
          this.downloadUrl = url;
          let fireStoreFile: FireStoreFile = {
            name: this.currentFile.name,
            downloadableUrl: this.downloadUrl,
            filePath: fullPath,
            size: this.currentFile.size,
            type: this.currentFile.type
          };

          this.emitResult.emit(fireStoreFile);
          this.isActive = false;
          this.percentage = new Observable<undefined>();
        });
      })
    ).subscribe();
  }
}
