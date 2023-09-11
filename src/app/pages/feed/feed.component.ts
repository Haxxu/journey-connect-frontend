import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from '@/modules/socials/components/create-post/create-post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CreatePostComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {}
