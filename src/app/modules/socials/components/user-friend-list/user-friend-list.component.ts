import { RouterLink } from '@angular/router';
import { getMediaUrlById } from '@/utils/media';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendService } from '@/services/friend.service';
import { MutualFriendsComponent } from '../mutual-friends/mutual-friends.component';
import { Store } from '@ngrx/store';
import ChatActions from '@/core/store/chat/chat.action';

@Component({
  selector: 'app-user-friend-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MutualFriendsComponent],
  templateUrl: './user-friend-list.component.html',
  styleUrls: ['./user-friend-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFriendListComponent implements OnInit, OnChanges {
  @Input() userId: string = '';
  friends: any[] = [];
  getMediaUrlById = getMediaUrlById;

  constructor(
    private friendService: FriendService,
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    if (this.userId) {
      this.friendService.getUserFriendsById(this.userId).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.friends = res.data;
            this.cdr.detectChanges();
          }
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userId'].currentValue) {
      this.friendService.getUserFriendsById(this.userId).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.friends = res.data;
            this.cdr.detectChanges();
          }
        },
      });
    }
  }

  handleShowChatBox(userId: string) {
    this.store.dispatch(ChatActions.setTargetUserId({ userId: userId }));
    this.store.dispatch(ChatActions.setChatBoxVisibility({ isVisible: true }));
  }
}
