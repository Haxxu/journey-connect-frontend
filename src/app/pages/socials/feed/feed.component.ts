import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePostComponent } from '@/modules/socials/components/create-post/create-post.component';
import { PostCardComponent } from '@/modules/socials/components/post-card/post-card.component';
import { selectFeedPosts } from '@/core/store/posts/posts.selectors';
import { PostService } from '@/services/post.service';
import {
  addMoreFeedPosts,
  setFeedPosts,
} from '@/core/store/posts/posts.actions';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    CreatePostComponent,
    PostCardComponent,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
  constructor(private store: Store, private postService: PostService) {}
  posts$ = this.store.select(selectFeedPosts);
  throttle = 0;
  distance = 2;
  page: number = 0;
  pageSize: number = 10;
  loading: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(setFeedPosts({ posts: [] }));
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.postService.getFeedPosts(this.page, this.pageSize).subscribe({
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
