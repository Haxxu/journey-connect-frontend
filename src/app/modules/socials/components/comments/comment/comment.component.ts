import { getMediaUrlById } from '@/utils/media';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { CommentListComponent } from '../comment-list/comment-list.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, AvatarModule, CommentListComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() comment: any;
  next: number = 2;
  getMediaUrlById = getMediaUrlById;

  constructor(private cdr: ChangeDetectorRef) {}

  handleSeeMoreComments() {
    this.next = this.next + 5;
    // this.cdr.detectChanges();
  }

  resetReplyComments() {
    this.next = 2;
    // this.cdr.detectChanges();
  }
}
