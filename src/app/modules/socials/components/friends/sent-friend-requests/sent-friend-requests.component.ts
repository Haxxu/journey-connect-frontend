import { getMediaUrlById } from '@/utils/media';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FriendCardComponent,
  FriendCardTypeEnum,
} from '@/modules/socials/components/friend-card/friend-card.component';
import { Store } from '@ngrx/store';
import { selectSentFriendRequests } from '@/core/store/friend/friend.selectors';
import { PrimeNGConfig } from 'primeng/api';
import { FriendService } from '@/services/friend.service';

@Component({
  selector: 'app-sent-friend-requests',
  standalone: true,
  imports: [CommonModule, FriendCardComponent],
  templateUrl: './sent-friend-requests.component.html',
  styleUrls: ['./sent-friend-requests.component.scss'],
})
export class SentFriendRequestsComponent implements OnInit {
  constructor(
    private store: Store,
    private primengConfig: PrimeNGConfig,
    private friendService: FriendService
  ) {}
  sentFriendRequests$ = this.store.select(selectSentFriendRequests);
  FriendCardTypeEnum = FriendCardTypeEnum;

  getMediaUrlById = getMediaUrlById;

  ngOnInit(): void {
    this.primengConfig.ripple = false;
    this.friendService.getSentFriendRequests().subscribe();
  }
}
