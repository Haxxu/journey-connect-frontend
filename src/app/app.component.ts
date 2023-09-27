import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UserService } from '@/services/user.service';
import { PostService } from '@/services/post.service';
import { Store } from '@ngrx/store';
import { setFeedPosts } from './core/store/feed-posts/feed-posts.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'journey-connect-frontend';

  constructor(
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private postService: PostService,
    private store: Store
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.userService.fetchUserInfo();
    this.postService.getFeedPosts(0, 20).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.store.dispatch(setFeedPosts({ posts: res.data.data }));
        }
      },
    });
  }
}
