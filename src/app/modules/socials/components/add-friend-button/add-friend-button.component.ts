import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgIconComponent } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import {
  selectReceivedFriendRequests,
  selectSentFriendRequests,
} from '@/core/store/friend/friend.selectors';
import { FriendService } from '@/services/friend.service';
import { NgxPopperjsModule, NgxPopperjsPlacements } from 'ngx-popperjs';

@Component({
  selector: 'app-add-friend-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, NgIconComponent, NgxPopperjsModule],
  templateUrl: './add-friend-button.component.html',
  styleUrls: ['./add-friend-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFriendButtonComponent implements OnInit {
  @Input() userId: string = '';
  receivedFriendRequests$ = this.store.select(selectReceivedFriendRequests);
  sentFriendRequests$ = this.store.select(selectSentFriendRequests);
  isFriend: boolean = false;
  loading: boolean = false;
  NgxPopperjsPlacements = NgxPopperjsPlacements;
  @Input() type:
    | 'addFriend'
    | 'friend'
    | 'pendingRequest'
    | 'cancelFriendRequest' = 'addFriend';

  constructor(
    private store: Store,
    private friendService: FriendService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateType();
  }

  handleAddFriend(): void {
    this.loading = true;
    this.friendService.addFriend(this.userId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.updateType();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
    this.cdr.detectChanges();
  }

  handlePendingRequest(type: 'accept' | 'decline' = 'accept'): void {
    this.loading = true;
    this.friendService.responsePendingRequest(this.userId, type).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.updateType();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
    this.cdr.detectChanges();
  }

  handleUnfriend(): void {
    this.loading = true;
    this.friendService.unfriend(this.userId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.updateType();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
    this.cdr.detectChanges();
  }

  handleCancelFriendRequest(): void {
    this.loading = true;
    this.friendService.cancelFriendRequest(this.userId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.updateType();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
    this.cdr.detectChanges();
  }

  updateType(): void {
    this.friendService.checkFriendStatus(this.userId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.isFriend = res.data === 'friend';
          if (res.data === 'none') {
            this.type = 'addFriend';
          } else if (res.data === 'friend') {
            this.type = 'friend';
          } else if (res.data === 'sentFriend') {
            this.type = 'cancelFriendRequest';
          } else if (res.data === 'receivedFriend') {
            this.type = 'pendingRequest';
          }
          this.cdr.detectChanges();
        }
      },
      error: (err: any) => {},
    });
  }
}
