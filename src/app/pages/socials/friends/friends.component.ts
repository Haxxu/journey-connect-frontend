import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectReceivedFriendRequests } from '@/core/store/friend/friend.selectors';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  constructor(private store: Store) {}
  receivedFriendRequests$ = this.store.select(selectReceivedFriendRequests);

  ngOnInit(): void {
    this.receivedFriendRequests$.subscribe((val) => console.log(val));
  }
}
