import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { FileService } from '@/services/file.service';
import { MessageService } from 'primeng/api';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule, DialogModule, FileUploadModule, NgIconsModule],
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent {
  @Output() onUploadSuccess = new EventEmitter();
  visible: boolean = false;
  uploadedFiles: any[] = [];
  failedFiles: any[] = [];
  @Input() multiple: boolean = true;
  @Input() showLoadingProgress: boolean = true;
  @Input() showLoadingProgressInModal: boolean = false;
  @Input() previewWidth: number = 50;

  constructor(
    private fileService: FileService,
    private messageService: MessageService
  ) {}

  showDialog() {
    this.visible = true;
  }

  onUpload(event: FileUploadHandlerEvent, uploadRef: any) {
    if (!this.showLoadingProgressInModal) {
      this.visible = false;
    }

    event.files.forEach((file, index) => {
      this.uploadedFiles.push({
        name: file.name,
        id: index,
      });
      this.fileService.uploadFile(file).subscribe({
        next: (res) => {
          if (res.success) {
            this.uploadedFiles = this.uploadedFiles.filter(
              (item) => item.id !== index
            );
            this.onUploadSuccess.emit(res.data.media);
          }
        },
        error: (error) => {
          this.failedFiles.push({ name: file.name, id: index });
          this.uploadedFiles = this.uploadedFiles.filter(
            (item) => item.id !== index
          );
          if (this.showLoadingProgressInModal) {
            this.messageService.add({
              severity: 'error',
              summary: 'Upload Failed',
              detail: 'The image is not uploaded',
            });
            this.visible = false;
            uploadRef.clear();
          }
        },
      });
    });
  }

  removeFile(index: any) {
    this.failedFiles = this.failedFiles.filter((item) => item.id !== index);
  }
}
