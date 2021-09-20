import { ComponentHelper } from './../../component-helper';
import { ToastrService } from 'ngx-toastr';
import { FireStoreFile } from './../../models/file';
import { FilesHelper } from 'src/app/shared/data/files';
import { FileUploadService } from './../../services/file-upload/file-upload.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

///This component is a generic file uploader to Firebase storage
///It will upload to the storage based on your path and will verify if the
///File can be uploaded based on file size, file type, and if file name is
///unique to its directory. After file upload, it will emit back a FireStoreFile object
///to the parent component. This will let you save the downloadableUrl and other meta data to firestore.
@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {
  @Input() path: string;
  @Input() existingFilesInDirectory: FireStoreFile[];

  @Output() emitResult = new EventEmitter<FireStoreFile | null>();

  task: AngularFireUploadTask;
  percentage: Observable<number | undefined>;
  snapshot: Observable<any>;
  downloadUrl: string;
  currentFile: File;
  isActive: boolean = false;

  constructor(
    private fileUpload: FileUploadService,
    private toastr: ToastrService,
    private componentHelper: ComponentHelper) { }

  ngOnInit(): void {
    //this.startUpload();
  }

  isFileValid(file: File) {
    let isValid = true;
    let errorMessage = ``;

    if (file.size > FilesHelper.maximumFileSize) {
      errorMessage += `- file exceeds the maximum size of ${this.componentHelper.formatBytes(FilesHelper.maximumFileSize)} <br />`;

      isValid = false;
    }

    if (FilesHelper.blockedFileTypesRegex.test(file.name)) {
      errorMessage += `- file type is not supported, please upload a different file. <br />`

      isValid = false;
    }

    if (this.existingFilesInDirectory && this.existingFilesInDirectory.find(f => f.name === file.name)) {
      errorMessage += `- file with the same name already exists in the directory, please rename the file. <br />`;

      isValid = false;
    }

    if (isValid === false) {
      this.toastr.error(errorMessage, `File Upload Error for ${file.name}`, {
        tapToDismiss: true,
        easing: 'ease-in',
        enableHtml: true
      });
    }

    return isValid;
  }

  onFileSelected($event: any) {
    console.log($event);
    this.isActive = true;
    this.currentFile = $event.target.files[0];

    if (this.isFileValid(this.currentFile)) {
      this.uploadFile();
    } else {
      this.emitResult.emit(null);

      this.isActive = false;
      this.percentage = new Observable<undefined>();
    }
  }

  uploadFile() {
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
