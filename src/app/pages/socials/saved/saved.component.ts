import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostCardComponent } from '@/modules/socials/components/post-card/post-card.component';
import { selectFeedPosts } from '@/core/store/posts/posts.selectors';
import { PostService } from '@/services/post.service';
import {
  addMoreFeedPosts,
  setFeedPosts,
} from '@/core/store/posts/posts.actions';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserFriendListComponent } from '@/modules/socials/components/user-friend-list/user-friend-list.component';
import { selectMeInfo } from '@/core/store/me/me.selectors';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    PostCardComponent,
    ButtonModule,
    ProgressSpinnerModule,
    UserFriendListComponent,
  ],
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedComponent implements OnInit {
  constructor(private store: Store, private postService: PostService) {}
  posts$ = this.store.select(selectFeedPosts);
  throttle = 0;
  distance = 2;
  page: number = 0;
  pageSize: number = 10;
  loading: boolean = false;
  meInfo$ = this.store.select(selectMeInfo);

  ngOnInit(): void {
    this.store.dispatch(setFeedPosts({ posts: [] }));
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.postService.getSavedPosts(this.page, this.pageSize).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.store.dispatch(addMoreFeedPosts({ posts: res.data.data }));
          this.page++;
          this.loading = false;
        }
      },
    });
  }
}
