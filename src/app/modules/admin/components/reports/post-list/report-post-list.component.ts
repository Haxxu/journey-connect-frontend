import { formatDate, formatDateToDDMMYYYY } from '@/utils/format';
import { getMediaUrlById } from '@/utils/media';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { UserService } from '@/services/user.service';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterLink } from '@angular/router';
import { PostService } from '@/services/post.service';
import { Store } from '@ngrx/store';
import { selectPosts } from '@/core/store/posts/posts.selectors';
import { PostCardComponent } from '@/modules/socials/components/post-card/post-card.component';
import { setPosts } from '@/core/store/posts/posts.actions';
import { ReportService } from '@/services/report.service';

@Component({
  selector: 'app-report-post-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    TagModule,
    NgIconsModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    RouterLink,
    PostCardComponent,
  ],
  templateUrl: './report-post-list.component.html',
  styleUrls: ['./report-post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class ReportPostListComponent implements OnInit {
  posts: any[] = [];
  loading: boolean = false;
  first: number = 0;
  rows: number = 0;
  totalPosts: number = 0;
  page: number = 1;
  pageSize: number = 10;
  getMediaUrlById = getMediaUrlById;
  formatDate = formatDate;
  formatDateToDDMMYYYY = formatDateToDDMMYYYY;
  userDialog: boolean = false;
  postsDialog: boolean = false;
  post: any;
  searchControl = new FormControl<any>('');
  posts$ = this.store.select(selectPosts);
  postType = {
    individual_post: 'Individual post',
    share_post: 'Share post',
  };
  visibility = {
    private: 'Private',
    public: 'Public',
  };

  reportPosts: any;
  totalReportPosts: number = 0;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private postService: PostService,
    private store: Store,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.loadReportPosts();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.loadReportPosts();
      });
  }

  loadReportPosts() {
    this.reportService
      .getReports('post', this.page, this.pageSize, this.searchControl?.value)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.success) {
            this.reportPosts = res.data.docs;
            this.totalReportPosts = res.data.totalDocs;
            this.cdr.detectChanges();
          }
          this.loading = false;
        },
      });
  }

  handleRowChange(value: number) {
    // console.log(value);
    this.pageSize = value;
  }

  handleFirstChange(value: number) {
    // console.log(value);
  }

  handleLoadReportPosts(event: TableLazyLoadEvent) {
    this.page = Number(event.first) / Number(event.rows) + 1;
    this.pageSize = Number(event.rows);
    this.loadReportPosts();
  }

  handleShowPost(post: any) {
    this.post = { ...post };
    this.userDialog = true;
  }

  handleShowUserPosts(user: any) {
    this.store.dispatch(setPosts({ posts: [] }));
    this.postService.getPostsByUserId(user._id).subscribe({
      next: (res: any) => {
        if (res.success) {
          // this.postsDialog = true;
        }
      },
      error: (res: any) => {
        // this.postsDialog = true;
      },
    });
    this.postsDialog = true;
  }

  deletePost(postId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this post?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.postService.deletePostById(postId).subscribe({
          next: () => {
            this.posts = this.posts.filter((post) => {
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
              this.posts = this.posts.map((post) => {
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
              this.posts = this.posts.map((post) => {
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
