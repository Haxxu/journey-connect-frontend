import { getMediaUrlById } from '@/utils/media';
import { formatDateToDDMMYYYY } from '@/utils/format';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@/services/user.service';
import { ChartModule } from 'primeng/chart';
import { NgIconsModule } from '@ng-icons/core';
import { PostService } from '@/services/post.service';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';
import { PostCardComponent } from '@/modules/socials/components/post-card/post-card.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-post-chart',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    NgIconsModule,
    TableModule,
    TooltipModule,
    RouterLink,
    PostCardComponent,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  templateUrl: './post-chart.component.html',
  styleUrls: ['./post-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class PostChartComponent implements OnInit {
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
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.loadPosts();

    this.postService.getPostsInfo().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.posts = {
            total: res.data.posts.total,
            sinceLastWeek: res.data.posts.sinceLastWeek,
          };
          this.individualPosts = {
            total: res.data.individualPosts.total,
            sinceLastWeek: res.data.individualPosts.sinceLastWeek,
          };
          this.sharePosts = {
            total: res.data.sharePosts.total,
            sinceLastWeek: res.data.sharePosts.sinceLastWeek,
          };

          this.postsData = {
            labels: res.data.postsCreatedEachMonth.map(
              (item: any) => item.month
            ),
            datasets: [
              {
                label: 'Total posts',
                data: res.data.postsCreatedEachMonth.map(
                  (item: any) => item.total
                ),
                fill: false,
                borderColor: documentStyle.getPropertyValue('--teal-500'),
                tension: 0.4,
              },
              {
                label: 'Share posts',
                data: res.data.postsCreatedEachMonth.map(
                  (item: any) => item.share_post
                ),
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4,
              },
              {
                label: 'Individual posts',
                data: res.data.postsCreatedEachMonth.map(
                  (item: any) => item.individual_post
                ),
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.4,
              },
            ],
          };
        }

        this.cdr.detectChanges();
      },
    });

    this.postsOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        title: {
          display: true,
          text: 'Created Posts',
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
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
}
