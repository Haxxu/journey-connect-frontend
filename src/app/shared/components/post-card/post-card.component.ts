import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { getMediaUrlById } from '@/utils/media';
import { formatDate } from '@/utils/format';
import { NgxGridModule } from '@egjs/ngx-grid';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, AvatarModule, NgxGridModule, NgIconsModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() post: any;
  getMediaUrlById = getMediaUrlById;
  formatDate = formatDate;

  gap = 2;
  defaultDirection: 'start' | 'end' = 'end';
  columnRange = [1, 3];
  rowRange = [1, 3];
  sizeRange = [0, 5000];
  isCroppedSize = false;
  displayedRow = -1;
}
