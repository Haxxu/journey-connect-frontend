import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { EmotionService } from '@/services/emotion.service';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '@/config/app_routes';
import { timeAgo } from '@/utils/format';
import { CommentsComponent } from '@/modules/socials/components/comments/comments/comments.component';
import { SocketService } from '@/services/socket.service';
import { CommentService } from '@/services/comment.service';
import { selectComments } from '@/core/store/comments/comments.selector';
import { CreateSharePostComponent } from '../create-share-post/create-share-post.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { CreatePostModalService } from '@/modules/socials/services/create-post-modal.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    CommonModule,
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
    EmotionsComponent,
    RouterModule,
    CommentsComponent,
    CreateSharePostComponent,
    CreatePostComponent,
  ],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent implements OnInit {
  @Input() post: any;
  meInfo$ = this.store.select(selectMeInfo);
  getMediaUrlById = getMediaUrlById;
  formatDate = formatDate;
  timeAgo = timeAgo;
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
  AppRoutes = AppRoutes;
  popperClass = 'p-0';
  sharePostVisible: boolean = false;

  visibilityOptions: any[] = [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
    { label: 'Friend only', value: 'friend_only' },
  ];
  visibility: string = 'Public';
  galleryItems: GalleryItem[] = [];
  innerPostGalleryItems: GalleryItem[] = [];
  emotionData: any;
  showEmotions: any[] = [];
  showComments: boolean = false;
  comments$ = this.store.select(selectComments);

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private cdr: ChangeDetectorRef,
    private postService: PostService,
    private messageService: MessageService,
    public gallery: Gallery,
    private emotionService: EmotionService,
    private socketService: SocketService,
    private commentService: CommentService,
    private createPostModalService: CreatePostModalService
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

    if (this.post?.inner_post && this.post?.inner_post?.medias) {
      this.innerPostGalleryItems = this.post.inner_post.medias.map(
        (media: any, index: number) => {
          return new ImageItem({
            src: media.url,
            thumb: media.url,
          });
        }
      );
      const galleryRef = this.gallery.ref(this.post.inner_post._id);
      galleryRef.load(this.innerPostGalleryItems);
    }

    this.getEmotions();

    this.commentService.getCommentsByContextId(this.post?._id).subscribe();
  }

  openCreatePostModal(sharePostData: any) {
    this.createPostModalService.openModal(sharePostData);
    this.cdr.markForCheck();
  }

  getTop3Emotions(count: { [key: string]: number }): {
    [key: string]: number;
  } {
    const sortedKeys = Object.keys(count).sort((a, b) => count[b] - count[a]);
    const top3Keys = sortedKeys.slice(1, 4);
    const top3Emotions: { [key: string]: number } = {};
    for (const key of top3Keys) {
      top3Emotions[key] = count[key];
    }
    return top3Emotions;
  }

  getEmotions() {
    this.emotionService
      .getEmotions('post', this.post?._id)
      .subscribe((res: any) => {
        this.emotionData = res.data;
        this.showEmotions = this.convertObjectToArray(
          this.getTop3Emotions(res.data.count)
        );
        this.cdr.detectChanges();
      });
  }

  convertObjectToArray(obj: {
    [key: string]: number;
  }): { src: string; value: number }[] {
    return Object.keys(obj).map((key) => ({
      src: key,
      value: obj[key],
    }));
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
    this.cdr.detectChanges();
  }

  closeEditMode() {
    this.mode = 'view';
    this.calculateGridDimensions('postMedias');
    this.cdr.detectChanges();
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
    this.cdr.detectChanges();
  }

  handleEditPost() {
    // console.log(this.editPostForm);
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
      this.cdr.detectChanges();
    }
  }

  handleDeletePost(postId: string): void {
    this.postService.deletePostById(postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Delete post error',
          detail: error.error.message,
        });
      },
    });
  }

  handleClickVisibility(option: any, visibilityOp: any) {
    this.editPostForm.get('visibility')?.setValue(option.value);
    this.visibility = option.label;
    visibilityOp.hide();
    this.cdr.detectChanges();
  }

  toggleComments() {
    this.showComments = !this.showComments;
    this.cdr.detectChanges();
  }

  toggleSharePost() {
    this.sharePostVisible = !this.sharePostVisible;
  }

  isSavedPost(postId: string, posts: any[]) {
    let ps = posts.map((item) => item.post);
    return ps.indexOf(postId) !== -1;
  }

  handleSavePost(postId: string) {
    this.postService.savePost(postId).subscribe({
      next: () => {},
      error: (err) => console.log(err),
    });
  }

  handleUnsavePost(postId: string) {
    this.postService.unsavePost(postId).subscribe({
      next: () => {},
      error: (err) => console.log(err),
    });
  }
}
