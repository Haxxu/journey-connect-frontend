import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { getMediaUrlById } from '@/utils/media';
import { formatDate, formatDateToDDMMYYYY } from '@/utils/format';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@/services/user.service';
import { ConfirmationService } from 'primeng/api';
import { PostService } from '@/services/post.service';
import { Store } from '@ngrx/store';
import { ReportService } from '@/services/report.service';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterLink } from '@angular/router';
import { PostCardComponent } from '@/modules/socials/components/post-card/post-card.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CommentService } from '@/services/comment.service';

@Component({
  selector: 'app-report-comment-list',
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
  templateUrl: './report-comment-list.component.html',
  styleUrls: ['./report-comment-list.component.scss'],
  providers: [ConfirmationService],
})
export class ReportCommentListComponent implements OnInit {
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
  // posts$ = this.store.select(selectPosts);
  postType = {
    individual_post: 'Individual post',
    share_post: 'Share post',
  };
  visibility = {
    private: 'Private',
    public: 'Public',
  };

  reportComments: any;
  totalReportComments: number = 0;
  comment: any;
  commentDialog: boolean = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private postService: PostService,
    private store: Store,
    private reportService: ReportService,
    private commentService: CommentService
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
      .getReports(
        'comment',
        this.page,
        this.pageSize,
        this.searchControl?.value
      )
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.reportComments = res.data.docs;
            this.totalReportComments = res.data.totalDocs;
          }
          this.loading = false;
          this.cdr.detectChanges();
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

  handleShowComment(comment: any) {
    this.comment = { ...comment };
    // this.postService.getPostById(postId).subscribe({
    //   next: (res: any) => {
    //     this.post = res.data;
    //   },
    // });
    this.commentDialog = true;
  }

  deleteComment(commentId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this comment?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commentService.deleteCommentById(commentId).subscribe({
          next: () => {
            this.reportComments = this.reportComments.filter((report: any) => {
              return report.comment._id !== commentId;
            });
            this.cdr.detectChanges();
          },
        });
      },
    });
  }

  deleteReport(reportId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this report?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.reportService.deleteReport(reportId).subscribe({
          next: () => {
            this.reportComments = this.reportComments.filter((report: any) => {
              return report._id !== reportId;
            });
            this.cdr.detectChanges();
          },
        });
      },
    });
  }
}
