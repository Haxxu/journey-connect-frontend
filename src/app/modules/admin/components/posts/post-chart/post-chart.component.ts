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

@Component({
  selector: 'app-post-chart',
  standalone: true,
  imports: [CommonModule, ChartModule, NgIconsModule],
  templateUrl: './post-chart.component.html',
  styleUrls: ['./post-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostChartComponent implements OnInit {
  users = {
    totalUsers: 0,
    lastWeek: 0,
    deactiveUsers: 0,
  };
  gendersOptions: any;
  gendersData: any;

  userCreatedData: any;
  userCreatedOptions: any;

  ageGroupData: any;
  ageGroupOptions: any;

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

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private postSerivice: PostService
  ) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.userService.getUsersInfo().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.users.totalUsers = res.data.userCreated.total;
          this.users.lastWeek = res.data.userCreated.week[0].count;
          this.users.deactiveUsers = res.data.userStatus.deactive;

          this.gendersData = {
            labels: res.data.userGender.map((item: any) => item._id),
            datasets: [
              {
                data: res.data.userGender.map((item: any) => item.count),
                backgroundColor: [
                  documentStyle.getPropertyValue('--blue-500'),
                  documentStyle.getPropertyValue('--yellow-500'),
                  documentStyle.getPropertyValue('--green-500'),
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--blue-400'),
                  documentStyle.getPropertyValue('--yellow-400'),
                  documentStyle.getPropertyValue('--green-400'),
                ],
              },
            ],
          };

          this.userCreatedData = {
            labels: res.data.userCreated.month.map((item: any) => item.month),
            datasets: [
              {
                label: 'User created',
                data: res.data.userCreated.month.map((item: any) => item.count),
                backgroundColor: [
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                  'rgb(255, 159, 64)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                ],
                borderWidth: 1,
              },
            ],
          };

          this.ageGroupData = {
            labels: Object.keys(res.data.ageGroupPercentages),
            datasets: [
              {
                label: 'Age percentage',
                data: Object.values(res.data.ageGroupPercentages).map(
                  (item: any) => parseFloat(item.percentage.replace('%', ''))
                ),
                // data: Object.values(res.data.ageGroupPercentages).map(
                //   (item: any) => parseFloat(item.count)
                // ),
                backgroundColor: [
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                  'rgb(255, 159, 64)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                ],
                borderWidth: 1,
              },
            ],
          };

          this.cdr.detectChanges();
        }
      },
      error: () => {},
    });

    this.gendersOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
        title: {
          display: true,
          text: 'Gender Chart',
        },
      },
    };

    this.userCreatedOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        title: {
          display: true,
          text: 'Created User Chart',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
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

    this.ageGroupOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        title: {
          display: true,
          text: 'Age Group Chart',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem: any, data: any) => {
            const dataIndex = tooltipItem.index;
            console.log(data);

            return;
            // return `${data.labels[dataIndex]}: ${percentageData[dataIndex]}% (${countData[dataIndex]})`;
          },
        },
      },
    };

    this.postSerivice.getPostsInfo().subscribe({
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
}
