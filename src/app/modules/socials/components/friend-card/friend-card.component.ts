import { getMediaUrlById } from '@/utils/media';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FriendService } from '@/services/friend.service';
import { RouterModule } from '@angular/router';

export enum FriendCardTypeEnum {
  Received = 'Received',
}

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
})
export class FriendCardComponent {
  @Input() user: any;
  @Input() image: string = '';
  @Input() type: string = '';
  getMediaUrlById = getMediaUrlById;
  FriendCardTypeEnum = FriendCardTypeEnum;
  actionSuccess: boolean = false;
  acctionSuccessText: string = '';

  constructor(private friendService: FriendService) {}

  handleAcctionFriendRequest(type: 'accept' | 'decline' = 'accept') {
    this.friendService
      .acceptFriendRequest(this.user?._id, type)
      .subscribe((res) => {
        if (res.success) {
          this.actionSuccess = true;
          if (type === 'accept') {
            this.acctionSuccessText = 'Accepted';
          } else {
            this.acctionSuccessText = 'Declined';
          }
        }
      });
  }
}
