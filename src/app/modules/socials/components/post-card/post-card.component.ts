import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { getMediaUrlById } from '@/utils/media';
import { formatDate } from '@/utils/format';
import { NgxGridModule } from '@egjs/ngx-grid';
import { NgIconsModule } from '@ng-icons/core';
import { NgxPopperjsModule, NgxPopperjsPlacements } from 'ngx-popperjs';
import { DialogModule } from 'primeng/dialog';
import { Store } from '@ngrx/store';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { ChipModule } from 'primeng/chip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { allowedValuesAsyncValidator } from '@/shared/validators/allowedValues.validator';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ImageUploaderComponent } from '@/shared/components/image-uploader/image-uploader.component';
import { FileService } from '@/services/file.service';
import { PostService } from '@/services/post.service';
import { MessageService } from 'primeng/api';
import { GalleryModule, Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { EmotionsComponent } from '@/shared/components/emotions/emotions.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    NgxGridModule,
    NgIconsModule,
    NgxPopperjsModule,
    DialogModule,
    ChipModule,
    InputTextareaModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    PickerModule,
    ButtonModule,
    TooltipModule,
    ImageUploaderComponent,
    GalleryModule,
    LightboxModule,
    EmotionsComponent
  ],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: any;
  meInfo$ = this.store.select(selectMeInfo);
  getMediaUrlById = getMediaUrlById;
  formatDate = formatDate;
  NgxPopperjsPlacements = NgxPopperjsPlacements;
  visibleEditModal: boolean = false;
  mode: string = 'view';
  gap = 2;
  defaultDirection: 'start' | 'end' = 'end';
  columnRange = [1, 3];
  rowRange = [1, 3];
  sizeRange = [0, 5000];
  isCroppedSize = false;
  displayedRow = -1;
  editPostForm: FormGroup;
  editMedias: any[] = [];
  submitting: boolean = false;

  visibilityOptions: any[] = [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
    { label: 'Friend only', value: 'friend_only' },
  ];
  visibility: string = 'Public';
  galleryItems: GalleryItem[] = [];

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private cdr: ChangeDetectorRef,
    private postService: PostService,
    private messageService: MessageService,
    public gallery: Gallery
  ) {
    this.editPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      medias: [[]],
      places: [[]],
      friend_tags: [[]],
      visibility: [
        this.post?.visibility || 'public',
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
      post_type: 'individual_post',
    });
  }

  ngOnInit(): void {
    if (this.post?.medias) {
      this.galleryItems = this.post.medias.map((media: any, index: number) => {
        return new ImageItem({
          src: media.url,
          thumb: media.url,
        });
      });
      const galleryRef = this.gallery.ref(this.post._id);
      galleryRef.load(this.galleryItems);
    }
  }

  openEditMode() {
    this.editPostForm.patchValue({
      title: this.post?.title || '',
      medias: this.post?.medias || [],
      places: this.post?.places || [],
      friend_tags: this.post?.friend_tags || [],
      visibility: this.post?.visibility || 'public',
      post_type: 'individual_post',
    });
    this.editMedias = this.post?.medias || [];
    this.visibility = this.visibilityOptions.find(
      (item) => item.value === this.post?.visibility
    ).label;
    this.mode = 'edit';
  }

  closeEditMode() {
    this.mode = 'view';
    this.calculateGridDimensions('postMedias');
  }

  handleEmojiClick(event: any) {
    const emoji = event.emoji.native;
    const currentTitle = this.editPostForm.value.title;
    const updatedTitle = currentTitle + emoji;
    this.editPostForm.get('emoji')?.setValue(emoji);
    this.editPostForm.get('title')?.setValue(updatedTitle);
  }

  handleUploadFile(event: any) {
    this.editMedias = [...this.editMedias, event];
    this.editPostForm.get('medias')?.setValue(this.editMedias);
    this.calculateGridDimensions();
  }

  handleRemoveEditMedia(id: string) {
    this.editMedias = this.editMedias.filter((media: any) => media.id !== id);
    this.calculateGridDimensions();
    if (!this.post?.medias?.find((media: any) => media.id === id)) {
      this.fileService.deleteFile(id).subscribe();
    }
    this.editPostForm.get('medias')?.setValue(this.editMedias);
    this.cdr.detectChanges();
  }

  calculateGridDimensions(baseOn = 'editMedias') {
    let numMedias = 0;
    if (baseOn === 'editMedias') {
      numMedias = this.editMedias.length;
    } else {
      numMedias = this.post?.medias?.length;
    }
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

  handleEditPost() {
    console.log(this.editPostForm);
    if (this.editPostForm.valid) {
      this.submitting = true;
      this.postService
        .updatePostById(this.post?._id, this.editPostForm.value)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res.message,
              });
              // this.editPostForm.reset({
              //   title: '',
              //   post_type: 'individual_post',
              //   medias: [],
              //   places: [],
              //   friend_tags: [],
              //   visibility: 'public',
              // });
              // this.editMedias = [];
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
    this.editPostForm.get('visibility')?.setValue(option.value);
    this.visibility = option.label;
    visibilityOp.hide();
  }
}
