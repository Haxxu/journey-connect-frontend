import { getMediaUrlById } from '@/utils/media';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPopperjsModule, NgxPopperjsPlacements } from 'ngx-popperjs';
import { AddFriendButtonComponent } from '../add-friend-button/add-friend-button.component';
import { RouterLink } from '@angular/router';
import { FriendService } from '@/services/friend.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-mutual-friends',
  standalone: true,
  imports: [
    CommonModule,
    NgxPopperjsModule,
    AddFriendButtonComponent,
    RouterLink,
    AvatarModule,
    AvatarGroupModule,
  ],
  templateUrl: './mutual-friends.component.html',
  styleUrls: ['./mutual-friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MutualFriendsComponent implements OnChanges {
  @Input() users: any[] = [];
  @Input() userId: string = '';
  NgxPopperjsPlacements = NgxPopperjsPlacements;
  getMediaUrlById = getMediaUrlById;
  @Input() showAvatar: boolean = false;

  constructor(
    private friendService: FriendService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userId'].currentValue) {
      this.friendService.getMutualFriends(this.userId).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.users = res.data.mutual_friends;
            this.cdr.detectChanges();
          }
        },
      });
    }
  }
}
