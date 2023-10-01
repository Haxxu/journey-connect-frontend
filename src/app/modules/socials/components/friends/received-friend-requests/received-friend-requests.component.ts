import { getMediaUrlById } from '@/utils/media';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FriendCardComponent,
  FriendCardTypeEnum,
} from '@/modules/socials/components/friend-card/friend-card.component';
import { Store } from '@ngrx/store';
import { selectReceivedFriendRequests } from '@/core/store/friend/friend.selectors';
import { PrimeNGConfig } from 'primeng/api';
import { FriendService } from '@/services/friend.service';

@Component({
  selector: 'app-received-friend-requests',
  standalone: true,
  imports: [CommonModule, FriendCardComponent],
  templateUrl: './received-friend-requests.component.html',
  styleUrls: ['./received-friend-requests.component.scss'],
})
export class ReceivedFriendRequestsComponent implements OnInit {
  constructor(
    private store: Store,
    private primengConfig: PrimeNGConfig,
    private friendService: FriendService
  ) {}
  receivedFriendRequests$ = this.store.select(selectReceivedFriendRequests);
  FriendCardTypeEnum = FriendCardTypeEnum;

  getMediaUrlById = getMediaUrlById;

  ngOnInit(): void {
    this.primengConfig.ripple = false;
    this.friendService.getReceivedFriendRequests().subscribe();
  }
}
