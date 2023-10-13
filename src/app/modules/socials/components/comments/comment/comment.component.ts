import { getMediaUrlById } from '@/utils/media';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  getMediaUrlById = getMediaUrlById;
}
