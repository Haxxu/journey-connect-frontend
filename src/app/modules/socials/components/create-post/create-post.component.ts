import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { allowedValuesAsyncValidator } from '@/shared/validators/allowedValues.validator';
import { DropdownModule } from 'primeng/dropdown';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { NgxGridModule } from '@egjs/ngx-grid';
import { ImageUploaderComponent } from '@/shared/components/image-uploader/image-uploader.component';
import { FileService } from '@/services/file.service';
import { PostService } from '@/services/post.service';
import { MessageService } from 'primeng/api';
import { UserService } from '@/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PickerModule,
    AvatarModule,
    OverlayPanelModule,
    InputTextareaModule,
    DropdownModule,
    NgIconsModule,
    ButtonModule,
    TooltipModule,
    NgxGridModule,
    ImageUploaderComponent,
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  userInfo$: Observable<any>;
  createPostForm: any;
  showEmojiPicker: boolean = false;
  visibilityOptions: any[] = [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
    { label: 'Friend only', value: 'friend_only' },
  ];
  visibility: string = 'Public';

  gap = 2;
  defaultDirection: 'start' | 'end' = 'end';
  columnRange = [1, 3];
  rowRange = [1, 3];
  sizeRange = [0, 5000];
  isCroppedSize = false;
  displayedRow = -1;

  medias: any[] = [];
  submitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private fileService: FileService,
    private postService: PostService,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      post_type: [
        'individual_post',
        Validators.required,
        allowedValuesAsyncValidator([
          'group_post',
          'individual_post',
          'share_post',
        ]),
      ],
      medias: [[]],
      places: [[]],
      friend_tags: [[]],
      visibility: [
        'public',
        Validators.required,
        allowedValuesAsyncValidator([
          'private_group',
          'public_group',
          'friend_only',
          'public',
          'private',
        ]),
      ],
    });

    this.calculateGridDimensions();
    this.userInfo$ = this.userService.getUserInfo();
  }

  ngOnInit(): void {}

  handleEmojiClick(event: any) {
    const emoji = event.emoji.native;
    const currentTitle = this.createPostForm.value.title;
    const updatedTitle = currentTitle + emoji;
    this.createPostForm.get('emoji')?.setValue(emoji);
    this.createPostForm.get('title')?.setValue(updatedTitle);
  }

  handleCreatePost() {
    if (this.createPostForm.valid) {
      this.submitting = true;
      this.postService
        .createPost(this.createPostForm.value)
        .subscribe((res) => {
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });

            // Reset form
            this.createPostForm.reset({
              title: '',
              post_type: 'individual_post',
              medias: [],
              places: [],
              friend_tags: [],
              visibility: 'public',
            });
            this.medias = [];
            this.visibility = 'Public';
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }

          this.submitting = false;
        });
    }
  }

  handleClickVisibility(option: any, visibilityOp: any) {
    this.createPostForm.get('visibility')?.setValue(option.value);
    this.visibility = option.label;
    visibilityOp.hide();
  }

  handleRemoveMedia(id: string) {
    this.medias = this.medias.filter((media) => media.id !== id);
    this.calculateGridDimensions();
    this.fileService.deleteFile(id).subscribe();
    this.cdr.detectChanges();
  }

  handleUploadFile(event: any) {
    this.medias.push(event);
    this.createPostForm.get('medias')?.setValue(this.medias);
  }

  calculateGridDimensions() {
    const numMedias = this.medias.length;
    if (numMedias <= 3) {
      this.rowRange = [1, 1];
      this.columnRange = [1, 3];
    } else if (numMedias <= 4) {
      this.rowRange = [1, 2];
      this.columnRange = [1, 2];
    } else if (numMedias <= 8) {
      this.rowRange = [1, 2];
      this.columnRange = [1, 4];
    } else {
      this.rowRange = [1, 3];
      this.columnRange = [1, 4];
    }
  }
}
