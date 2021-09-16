import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) { }

  removeFile(downloadUrl: string) {
    return this.storage.refFromURL(downloadUrl).delete();
  }

  uploadFile(fullPath: string, file: File) {
    return this.storage.upload(fullPath, file);
  }

  getStorageReference(fullPath: string) {
    return this.storage.ref(fullPath);
  }
}
