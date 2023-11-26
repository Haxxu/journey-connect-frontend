import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { ChartModule } from 'primeng/chart';
import { formatDateToDDMMYYYY } from '@/utils/format';
import { getMediaUrlById } from '@/utils/media';
import { UserService } from '@/services/user.service';
import { PostService } from '@/services/post.service';
import { ConfirmationService } from 'primeng/api';
import { CommentService } from '@/services/comment.service';

@Component({
  selector: 'app-comment-chart',
  standalone: true,
  imports: [CommonModule, NgIconsModule, ChartModule],
  templateUrl: './comment-chart.component.html',
  styleUrls: ['./comment-chart.component.scss'],

  providers: [ConfirmationService],
})
export class CommentChartComponent implements OnInit {
  comments = {
    total: 0,
    sinceLastWeek: 0,
  };
  normalComments = {
    total: 0,
    sinceLastWeek: 0,
  };
  replyComments = {
    total: 0,
    sinceLastWeek: 0,
  };
  commentsOptions: any;
  commentsData: any;
  formatDateToDDMMYYYY = formatDateToDDMMYYYY;
  getMediaUrlById = getMediaUrlById;
  topPosts: any[] = [];
  post: any;
  postDialog: boolean = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private postService: PostService,
    private confirmationService: ConfirmationService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.commentService.getCommentsInfo().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.comments = {
            total: res.data.comments.total,
            sinceLastWeek: res.data.comments.sinceLastWeek,
          };
          this.replyComments = {
            total: res.data.replyComments.total,
            sinceLastWeek: res.data.replyComments.sinceLastWeek,
          };
          this.normalComments = {
            total: res.data.normalComments.total,
            sinceLastWeek: res.data.normalComments.sinceLastWeek,
          };

          this.commentsData = {
            labels: res.data.commentsCreatedEachMonth.map(
              (item: any) => item.month
            ),
            datasets: [
              {
                label: 'Total comments',
                data: res.data.commentsCreatedEachMonth.map(
                  (item: any) => item.total
                ),
                fill: false,
                borderColor: documentStyle.getPropertyValue('--teal-500'),
                tension: 0.4,
              },
              {
                label: 'Normal comments',
                data: res.data.commentsCreatedEachMonth.map(
                  (item: any) => item.normal_comments
                ),
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4,
              },
              {
                label: 'Reply comments',
                data: res.data.commentsCreatedEachMonth.map(
                  (item: any) => item.reply_comments
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

    this.commentsOptions = {
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
          text: 'Created Comment',
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
}
