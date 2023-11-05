import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectLoadingPosts,
  selectPosts,
} from '@/core/store/posts/posts.selectors';
import { CreatePostComponent } from '@/modules/socials/components/create-post/create-post.component';
import { PostCardComponent } from '@/modules/socials/components/post-card/post-card.component';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { ActivatedRoute } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { UserFriendListComponent } from '../user-friend-list/user-friend-list.component';

@Component({
  selector: 'app-profile-body',
  standalone: true,
  imports: [
    CommonModule,
    CreatePostComponent,
    PostCardComponent,
    SkeletonModule,
    UserFriendListComponent,
  ],
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileBodyComponent implements OnInit {
  posts$ = this.store.select(selectPosts);
  meInfo$ = this.store.select(selectMeInfo);
  loadingPosts$ = this.store.select(selectLoadingPosts);
  userId: string = '';
  loadingPosts: boolean = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.cdr.detectChanges();
    });

    this.loadingPosts$.subscribe((val) => {
      this.loadingPosts = val;
      this.cdr.detectChanges();
    });
  }
}
