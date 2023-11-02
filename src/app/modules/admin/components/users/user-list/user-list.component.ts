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

@Component({
  selector: 'app-user-list',
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
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  loading: boolean = false;
  first: number = 0;
  rows: number = 0;
  totalUsers: number = 0;
  page: number = 1;
  pageSize: number = 10;
  getMediaUrlById = getMediaUrlById;
  formatDate = formatDate;
  formatDateToDDMMYYYY = formatDateToDDMMYYYY;
  userDialog: boolean = false;
  user: any;
  searchControl = new FormControl<any>('');

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.loadUsers();
      });
  }

  loadUsers() {
    this.userService
      .getUsers(this.page, this.pageSize, this.searchControl?.value)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.users = res.data.docs;
            this.totalUsers = res.data.totalDocs;
            this.cdr.detectChanges();
          }
          this.loading = false;
        },
      });
  }

  handleRowChange(value: number) {
    console.log(value);
    this.pageSize = value;
  }

  handleFirstChange(value: number) {
    // console.log(value);
  }

  handleLoadUsers(event: TableLazyLoadEvent) {
    this.page = Number(event.first) / Number(event.rows) + 1;
    this.pageSize = Number(event.rows);
    this.loadUsers();
  }

  handleShowUser(user: any) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deactiveUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to deactive this user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deactiveUser(userId).subscribe({
          next: (res) => {
            if (res.success) {
              this.users = this.users.map((user) => {
                if (user._id === userId) {
                  return { ...user, status: 'deactive' };
                }
                return user;
              });
              this.cdr.detectChanges();
            }
          },
        });
      },
    });
  }

  activeUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to active this user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.activeUser(userId).subscribe({
          next: (res) => {
            if (res.success) {
              this.users = this.users.map((user) => {
                if (user._id === userId) {
                  return { ...user, status: 'active' };
                }
                return user;
              });
              this.cdr.detectChanges();
            }
          },
        });
      },
    });
  }
}
