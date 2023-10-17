import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { Store } from '@ngrx/store';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { getMediaUrlById } from '@/utils/media';
import { RouterModule } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { formatDate, timeAgo } from '@/utils/format';
import { AppRoutes } from '@/config/app_routes';
import { LightboxModule } from 'ng-gallery/lightbox';

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
    RouterModule,
    LightboxModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostComponent implements OnInit {
  @Input() sharePost: boolean = false;
  @Input() innerPost: any;
  @Output() onSuccess = new EventEmitter();
  getMediaUrlById = getMediaUrlById;
  userInfo$ = this.store.select(selectMeInfo);
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

  innerPostGalleryItems: GalleryItem[] = [];
  formatDate = formatDate;
  timeAgo = timeAgo;
  AppRoutes = AppRoutes;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private fileService: FileService,
    private postService: PostService,
    private messageService: MessageService,
    private store: Store,
    public gallery: Gallery
  ) {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      post_type: [
        'individual_post',
        [Validators.required],
        [
          allowedValuesAsyncValidator([
            'group_post',
            'individual_post',
            'share_post',
          ]),
        ],
      ],
      medias: [[]],
      places: [[]],
      friend_tags: [[]],
      visibility: [
        'public',
        [Validators.required],
        [
          allowedValuesAsyncValidator([
            'private_group',
            'public_group',
            'friend_only',
            'public',
            'private',
          ]),
        ],
      ],
    });

    this.calculateGridDimensions();
  }

  ngOnInit(): void {
    // if (this.innerPost && this.sharePost) {
    //   this.innerPostGalleryItems = this.innerPost.medias.map(
    //     (media: any, index: number) => {
    //       return new ImageItem({
    //         src: media.url,
    //         thumb: media.url,
    //       });
    //     }
    //   );
    //   const galleryRef = this.gallery.ref(this.innerPost._id);
    //   galleryRef.load(this.innerPostGalleryItems);
    // }
  }

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
      let body = { ...this.createPostForm.value };
      if (this.sharePost && this.innerPost) {
        body = {
          ...body,
          post_type: 'share_post',
          inner_post: this.innerPost._id,
        };
      }

      this.postService.createPost(body).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
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
            this.onSuccess.emit();
          }

          this.submitting = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Create post error',
            detail: error.error.message,
          });
          this.submitting = false;
        },
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
