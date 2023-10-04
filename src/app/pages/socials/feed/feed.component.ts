import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePostComponent } from '@/modules/socials/components/create-post/create-post.component';
import { PostCardComponent } from '@/modules/socials/components/post-card/post-card.component';
import { selectPosts } from '@/core/store/posts/posts.selectors';
import { PostService } from '@/services/post.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CreatePostComponent, PostCardComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(private store: Store, private postService: PostService) {}
  posts$ = this.store.select(selectPosts);

  ngOnInit(): void {
    this.postService.getFeedPosts(0, 10).subscribe({
      next: (res: any) => {
        if (res.success) {
          // console.log(res.data);
        }
      },
    });
  }
}
