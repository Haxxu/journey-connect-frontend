import { getMediaUrlById } from '@/utils/media';
import { Component, Input } from '@angular/core';
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
})
export class CommentInputComponent {
  constructor(private store: Store, private commentService: CommentService) {}
  content = new FormControl('');
  edit: boolean = false;
  meInfo$ = this.store.select(selectMeInfo);
  getMediaUrlById = getMediaUrlById;
  @Input() contextId: string = '';
  @Input() contextType: string = 'post';

  handleEmojiClick(event: any) {
    const emoji = event.emoji.native;
    const currentContent = this.content.value;
    const updatedContent = currentContent + emoji;
    this.content?.setValue(updatedContent);
  }

  handleSubmit() {
    this.commentService
      .createComment(
        this.content.value?.trim() || '',
        this.contextId,
        this.contextType
      )
      .subscribe((res: any) => {
        if (res.success) {
          this.content.setValue('');
        }
      });
  }
}
