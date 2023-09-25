import { AppRoutes } from '@/config/app_routes';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { HeaderComponent } from '@/modules/socials/components/header/header.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'app-social-layout',
  templateUrl: './social-layout.component.html',
  styleUrls: ['./social-layout.component.scss'],
  imports: [RouterModule, HeaderComponent, CommonModule],
})
export class SocialLayoutComponent implements OnInit {
  userInfo$ = this.store.select(selectMeInfo);
  sidebars: any[] = [
    {
      name: 'Feed',
      path: '/feed',
    },
    {
      name: 'My profile',
      path: `/users/:id`,
    },
    {
      name: 'Friends',
      path: '/friends',
    },
    {
      name: 'Saved',
      path: '/saved',
    },
    {
      name: 'Groups',
      path: '/groups',
    },
  ];

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.userInfo$.subscribe((val) => {
      let userId = val._id;
      if (userId) {
        this.sidebars[1].path = '/users/' + userId;
      }
    });
  }

  handleClickSidebarItem(sidebar: any) {
    this.router.navigate([sidebar.path]);
  }
}
