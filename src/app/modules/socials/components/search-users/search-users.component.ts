import { getMediaUrlById } from '@/utils/media';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { SearchService } from '@/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-users',
  standalone: true,
  imports: [CommonModule, NgIconComponent, InputTextModule, AutoCompleteModule],
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchUsersComponent {
  users: any[] | undefined;
  filteredUsers: any[] = [];
  getMediaUrlById = getMediaUrlById;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  searchUsers(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.searchService.searchUsers(query).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.filteredUsers = res.data.map((item: any) => ({
            ...item,
            full_name: item.first_name + ' ' + item.last_name,
          }));
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onUserSelect(event: any) {
    const selectedUserId = event._id;
    this.router.navigate(['/users', selectedUserId]);
  }
}
