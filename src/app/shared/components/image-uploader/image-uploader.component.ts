import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { FileService } from '@/services/file.service';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule, DialogModule, FileUploadModule],
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent {
  @Output() onUploadSuccess = new EventEmitter();
  visible: boolean = false;
  uploadedFiles: any[] = [];
  @Input() multiple: boolean = true;
  @Input() showLoadingProgress: boolean = true;
  @Input() previewWidth: number = 50;

  constructor(private fileService: FileService) {}

  showDialog() {
    this.visible = true;
  }

  onUpload(event: FileUploadHandlerEvent) {
    this.visible = false;

    event.files.forEach((file, index) => {
      this.uploadedFiles.push({
        name: file.name,
        id: index,
      });
      this.fileService.uploadFile(file).subscribe((res) => {
        if (res.success) {
          this.uploadedFiles = this.uploadedFiles.filter(
            (item) => item.id !== index
          );
          this.onUploadSuccess.emit(res.data.media);
        }
      });
    });
  }
}
