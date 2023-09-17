import { AppRoutes } from '@/config/app_routes';
import { HeaderComponent } from '@/modules/socials/components/header/header.component';
import { UserService } from '@/services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-social-layout',
  templateUrl: './social-layout.component.html',
  styleUrls: ['./social-layout.component.scss'],
  imports: [RouterModule, HeaderComponent, CommonModule],
})
export class SocialLayoutComponent {
  userInfo: any;
  sidebars: any[] = [
    {
      name: 'My profile',
      path: `/users/:id`,
    },
    {
      name: 'Feed',
      path: '/feed',
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

  constructor(private userService: UserService, private router: Router) {
    this.userService.getUserInfo().subscribe((val) => {
      this.userInfo = val;
      let userId = this.userInfo._id;
      if (userId) {
        this.sidebars[0].path = '/users/' + userId;
      }
    });
  }

  handleClickSidebarItem(sidebar: any) {
    this.router.navigate([sidebar.path]);
  }
}
