import { timeAgo } from '@/utils/format';
import { getMediaUrlById } from '@/utils/media';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { EmotionsComponent } from '@/shared/components/emotions/emotions.component';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { NgxPopperjsModule, NgxPopperjsPlacements } from 'ngx-popperjs';
import { Store } from '@ngrx/store';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { CommentService } from '@/services/comment.service';
import { DialogModule } from 'primeng/dialog';
import { CreateReportComponent } from '../../create-report/create-report.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    RouterLink,
    NgIconsModule,
    EmotionsComponent,
    CommentInputComponent,
    NgxPopperjsModule,
    DialogModule,
    CreateReportComponent,
    ConfirmDialogModule,
  ],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class CommentListComponent {
  @Input() comment: any;
  editCommentMode: boolean = false;
  getMediaUrlById = getMediaUrlById;
  timeAgo = timeAgo;
  replyMode: boolean = false;
  NgxPopperjsPlacements = NgxPopperjsPlacements;
  meInfo$ = this.store.select(selectMeInfo);
  reportDialog: boolean = false;

  @ContentChild('moreComments') moreComments: TemplateRef<{}> | undefined;

  constructor(
    private store: Store,
    private commentService: CommentService,
    private confirmationService: ConfirmationService
  ) {}

  toggleReply() {
    this.replyMode = !this.replyMode;
  }

  handleDeleteComment(commentId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this comment?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commentService.deleteCommentById(commentId).subscribe();
      },
    });
  }
}
