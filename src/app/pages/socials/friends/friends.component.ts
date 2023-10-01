import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectReceivedFriendRequests } from '@/core/store/friend/friend.selectors';
import { RouterModule } from '@angular/router';
import { FriendService } from '@/services/friend.service';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  constructor(private store: Store, private friendService: FriendService) {}
  receivedFriendRequests$ = this.store.select(selectReceivedFriendRequests);
  friendsLink = [
    {
      label: 'All friends',
      src: '/friends',
    },
    {
      label: 'Friend requests',
      src: '/friends/received-friend-requests',
    },
  ];

  ngOnInit(): void {}
}
