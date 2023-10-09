import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FriendCardComponent,
  FriendCardTypeEnum,
} from '@/modules/socials/components/friend-card/friend-card.component';
import { Store } from '@ngrx/store';
import { selectMyFriends } from '@/core/store/friend/friend.selectors';
import { FriendService } from '@/services/friend.service';
import { AddFriendButtonComponent } from '@/modules/socials/components/add-friend-button/add-friend-button.component';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [CommonModule, FriendCardComponent, AddFriendButtonComponent],
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
  constructor(private store: Store, private friendService: FriendService) {}
  FriendCardTypeEnum = FriendCardTypeEnum;
  friends$ = this.store.select(selectMyFriends);

  ngOnInit(): void {
    this.friendService.getMyFriends().subscribe();
  }
}
