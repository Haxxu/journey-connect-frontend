import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '@/modules/socials/components/profile-header/profile-header.component';
import { UserService } from '@/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileBodyComponent } from '@/modules/socials/components/profile-body/profile-body.component';
import { PostService } from '@/services/post.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ProfileHeaderComponent, ProfileBodyComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userId: string = '';

  constructor(
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe();
        this.postService.getPostsByUserId(this.userId).subscribe();
      }
    });
  }
}
