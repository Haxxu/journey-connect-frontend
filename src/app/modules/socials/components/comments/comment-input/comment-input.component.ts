import { getMediaUrlById } from '@/utils/media';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { TooltipModule } from 'primeng/tooltip';
import { Store } from '@ngrx/store';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { AvatarModule } from 'primeng/avatar';
import { NgIconsModule } from '@ng-icons/core';
import { CommentService } from '@/services/comment.service';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ButtonModule,
    OverlayPanelModule,
    PickerModule,
    TooltipModule,
    AvatarModule,
    NgIconsModule,
  ],
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentInputComponent implements OnInit {
  constructor(private store: Store, private commentService: CommentService) {}
  contentForm = new FormControl('');
  edit: boolean = false;
  meInfo$ = this.store.select(selectMeInfo);
  getMediaUrlById = getMediaUrlById;
  @Input() contextId: string = '';
  @Input() contextType: string = 'post';
  @Input() type: 'create' | 'reply' | 'edit' = 'create';
  @Input() rootComment?: string;
  @Input() replyUser?: string;
  @Input() content?: string;
  @Input() commentId?: string;
  @Input() showAvatar: boolean = false;
  @Output() onSuccess = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  handleEmojiClick(event: any) {
    const emoji = event.emoji.native;
    const currentContent = this.contentForm.value;
    const updatedContent = currentContent + emoji;
    this.contentForm?.setValue(updatedContent);
  }

  ngOnInit(): void {
    if (this.type === 'edit') {
      this.contentForm.setValue(this.content || '');
    }
  }

  handleSubmit() {
    if (this.type === 'create') {
      this.commentService
        .createComment(
          this.contentForm.value?.trim() || '',
          this.contextId,
          this.contextType
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.contentForm.setValue('');
            this.onSuccess.emit();
          }
        });
    } else if (this.type === 'reply') {
      this.commentService
        .replyComment(
          this.contentForm.value?.trim() || '',
          this.contextId,
          this.contextType,
          this.rootComment || '',
          this.replyUser || ''
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.contentForm.setValue('');
            this.onSuccess.emit();
          }
        });
    } else if (this.type === 'edit') {
      this.commentService
        .updateCommentById(
          this.commentId || '',
          this.contentForm.value?.trim() || ''
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.contentForm.setValue('');
            this.onCancel.emit();
          }
        });
    }
  }
}
