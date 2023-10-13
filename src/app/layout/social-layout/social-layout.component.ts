import { AppRoutes } from '@/config/app_routes';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { HeaderComponent } from '@/modules/socials/components/header/header.component';
import { PostService } from '@/services/post.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'app-social-layout',
  templateUrl: './social-layout.component.html',
  styleUrls: ['./social-layout.component.scss'],
  imports: [RouterModule, HeaderComponent, CommonModule, NgIconsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLayoutComponent implements OnInit {
  userInfo$ = this.store.select(selectMeInfo);
  sidebars: any[] = [
    {
      name: 'Feed',
      path: '/feed',
      icon: 'matRssFeedRound',
    },
    {
      name: 'My profile',
      path: `/users/:id`,
      icon: 'matPerson2Round',
    },
    {
      name: 'Friends',
      path: '/friends',
      icon: 'matPeopleAltRound',
    },
    {
      name: 'Saved',
      path: '/saved',
      icon: 'matBookmarkRound',
    },
    {
      name: 'Groups',
      path: '/groups',
      icon: 'matGroupsRound',
    },
  ];

  constructor(
    private router: Router,
    private store: Store,
    private postService: PostService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userInfo$.subscribe((val) => {
      let userId = val._id;
      if (userId) {
        this.sidebars[1].path = '/users/' + userId;
        this.cdr.detectChanges();
      }
    });
  }

  handleClickSidebarItem(sidebar: any) {
    this.router.navigate([sidebar.path]);
  }
}
