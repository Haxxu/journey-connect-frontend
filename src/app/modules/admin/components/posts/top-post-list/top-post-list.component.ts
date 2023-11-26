import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatDateToDDMMYYYY } from '@/utils/format';
import { getMediaUrlById } from '@/utils/media';
import { UserService } from '@/services/user.service';
import { PostService } from '@/services/post.service';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PostCardComponent } from '@/modules/socials/components/post-card/post-card.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgIconsModule } from '@ng-icons/core';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-post-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    PostCardComponent,
    ConfirmDialogModule,
    NgIconsModule,
    TooltipModule,
    RouterLink,
  ],
  templateUrl: './top-post-list.component.html',
  styleUrls: ['./top-post-list.component.scss'],
  providers: [ConfirmationService],
})
export class TopPostListComponent implements OnInit {
  posts = {
    total: 0,
    sinceLastWeek: 0,
  };
  sharePosts = {
    total: 0,
    sinceLastWeek: 0,
  };
  individualPosts = {
    total: 0,
    sinceLastWeek: 0,
  };
  postsOptions: any;
  postsData: any;
  formatDateToDDMMYYYY = formatDateToDDMMYYYY;
  getMediaUrlById = getMediaUrlById;
  topPosts: any[] = [];
  post: any;
  postDialog: boolean = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private postService: PostService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  handleShowPost(post: any) {
    this.post = { ...post };
    this.postDialog = true;
  }

  deletePost(postId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this post?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.postService.deletePostById(postId).subscribe({
          next: () => {
            this.topPosts = this.topPosts.filter((post) => {
              return post._id !== postId;
            });
            this.cdr.detectChanges();
          },
        });
      },
    });
  }

  deactivePost(postId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to deactive this post?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.postService.updatePostStatus(postId, 'deactive').subscribe({
          next: (res) => {
            if (res.success) {
              this.topPosts = this.topPosts.map((post) => {
                if (post._id === postId) {
                  return { ...post, status: 'deactive' };
                }
                return post;
              });
              this.cdr.detectChanges();
            }
          },
        });
      },
    });
  }

  activePost(postId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to active this post?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.postService.updatePostStatus(postId, 'active').subscribe({
          next: (res) => {
            if (res.success) {
              this.topPosts = this.topPosts.map((post) => {
                if (post._id === postId) {
                  return { ...post, status: 'active' };
                }
                return post;
              });
              this.cdr.detectChanges();
            }
          },
        });
      },
    });
  }

  loadPosts() {
    this.postService.getTopPostsByEmotion(100).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.topPosts = res.data;
        }
        this.cdr.detectChanges();
      },
    });
  }
}
