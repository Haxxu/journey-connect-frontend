import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePostComponent } from '@/modules/socials/components/create-post/create-post.component';
import { PostCardComponent } from '@/modules/socials/components/post-card/post-card.component';
import { selectFeedPosts } from '@/core/store/feed-posts/feed-posts.selectors';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CreatePostComponent, PostCardComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  constructor(private store: Store) {}
  posts$ = this.store.select(selectFeedPosts);
}
