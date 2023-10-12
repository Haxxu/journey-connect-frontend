import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommentComponent } from '@/modules/socials/components/comments/comment/comment.component';
import { Store } from '@ngrx/store';
import { CommentsSelector } from '@/core/store/comments/comments.selector';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { SocketService } from '@/services/socket.service';
import { socket_constants } from '@/config/socket_constant';
import { addCommentByContextId } from '@/core/store/comments/comments.actions';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    CommentComponent,
    CommentInputComponent,
  ],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private socketService: SocketService) {}
  loading: boolean = false;
  @Input() contextId: string = '';
  comments$ = this.store.select(CommentsSelector.selectComments);
  unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.socketService.joinRoom(this.contextId);

    this.socketService
      .listen(socket_constants.CREATE_COMMENT)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((comment: any) => {
        this.store.dispatch(
          addCommentByContextId({ contextId: this.contextId, comment })
        );
      });
  }

  ngOnDestroy(): void {
    this.socketService.outRoom(this.contextId);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
