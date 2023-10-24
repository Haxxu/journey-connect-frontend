import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { UserService } from '@/services/user.service';
import { Store } from '@ngrx/store';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { NgxPopperjsModule, NgxPopperjsPlacements } from 'ngx-popperjs';
import { getMediaUrlById } from '@/utils/media';
import { RouterLink } from '@angular/router';
import { AuthService } from '@/services/auth.service';
import { SearchUsersComponent } from '../search-users/search-users.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    InputTextModule,
    CommonModule,
    NgIconsModule,
    OverlayPanelModule,
    AutoCompleteModule,
    NgxPopperjsModule,
    RouterLink,
    SearchUsersComponent,
  ],
})
export class HeaderComponent implements OnInit {
  suggestions: any[] = [{}];
  meInfo$ = this.store.select(selectMeInfo);
  NgxPopperjsPlacements = NgxPopperjsPlacements;
  getMediaUrlById = getMediaUrlById;
  popperClass = 'p-0';
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.checkIsAdmin().subscribe({
      next: (res: any) => {
        if (res.success) {
          console.log(res);
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      },
      error: (error: any) => {
        console.log(error);
        this.isAdmin = false;
      },
    });
  }

  search(event: any) {
    console.log(event);
  }

  handleLogout() {
    this.authService.logout();
  }
}
