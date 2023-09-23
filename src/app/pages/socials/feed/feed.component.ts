import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { selectMyPosts } from '@/core/store/me/me.selectors';
import { CreatePostComponent } from '@/modules/socials/components/create-post/create-post.component';
import { PostCardComponent } from '@/modules/socials/components/post-card/post-card.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CreatePostComponent, PostCardComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  constructor(private store: Store) {}
  posts$ = this.store.select(selectMyPosts);
}
