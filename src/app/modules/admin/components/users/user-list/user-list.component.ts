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
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.page, this.pageSize).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.users = res.data.docs;
          this.totalUsers = res.data.totalDocs;
          console.log(this.users);

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
}
