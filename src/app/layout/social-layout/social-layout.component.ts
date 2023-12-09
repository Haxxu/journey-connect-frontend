import { AppRoutes } from '@/config/app_routes';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { ChatBoxComponent } from '@/modules/socials/components/chat-box/chat-box.component';
import { CreatePostComponent } from '@/modules/socials/components/create-post/create-post.component';
import { HeaderComponent } from '@/modules/socials/components/header/header.component';
import { CreatePostModalService } from '@/modules/socials/services/create-post-modal.service';
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
import { DialogModule } from 'primeng/dialog';

@Component({
  standalone: true,
  selector: 'app-social-layout',
  templateUrl: './social-layout.component.html',
  styleUrls: ['./social-layout.component.scss'],
  imports: [
    RouterModule,
    HeaderComponent,
    CommonModule,
    NgIconsModule,
    CreatePostComponent,
    DialogModule,
    ChatBoxComponent,
  ],
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
    // {
    //   name: 'Groups',
    //   path: '/groups',
    //   icon: 'matGroupsRound',
    // },
  ];
  showCreatePostModal: boolean = false;

  constructor(
    private router: Router,
    private store: Store,
    private postService: PostService,
    private cdr: ChangeDetectorRef,
    public createPostModalService: CreatePostModalService
  ) {}

  ngOnInit(): void {
    this.userInfo$.subscribe((val) => {
      let userId = val._id;
      if (userId) {
        this.sidebars[1].path = '/users/' + userId;
        this.cdr.detectChanges();
      }
    });

    this.createPostModalService.showModal$.subscribe((val) => {
      this.showCreatePostModal = val;
    });
  }

  handleClickSidebarItem(sidebar: any) {
    this.router.navigate([sidebar.path]);
  }
}
