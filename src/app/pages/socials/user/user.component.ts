import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '@/modules/socials/components/profile-header/profile-header.component';
import { UserService } from '@/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileBodyComponent } from '@/modules/socials/components/profile-body/profile-body.component';
import { PostService } from '@/services/post.service';
import { FriendService } from '@/services/friend.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ProfileHeaderComponent, ProfileBodyComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  userId: string = '';
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private postService: PostService,
    private friendService: FriendService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      this.userId = params['id'];
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe();
        this.postService.getPostsByUserId(this.userId).subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
