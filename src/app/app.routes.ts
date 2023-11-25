import { Routes } from '@angular/router';

import { DefaultLayoutComponent } from '@/layout/default-layout/default-layout.component';

import { MyCounterComponent } from '@/components/test/my-counter/my-counter.component';
import { AppRoutes } from '@/config/app_routes';
import { AuthGuard } from '@/core/guards/auth.guard';
import { LoginComponent } from '@/pages/login/login.component';
import { SignupComponent } from '@/pages/signup/signup.component';
import { SocialLayoutComponent } from '@/layout/social-layout/social-layout.component';
import { FeedComponent } from '@/pages/socials/feed/feed.component';
import { UserComponent } from '@/pages/socials/user/user.component';
import { EditUserComponent } from '@/pages/socials/edit-user/edit-user.component';
import { FriendsComponent } from '@/pages/socials/friends/friends.component';
import { ReceivedFriendRequestsComponent } from '@/modules/socials/components/friends/received-friend-requests/received-friend-requests.component';
import { FriendListComponent } from '@/modules/socials/components/friends/friend-list/friend-list.component';
import { SentFriendRequestsComponent } from '@/modules/socials/components/friends/sent-friend-requests/sent-friend-requests.component';
import { AppLayoutComponent } from './layout/dashboard/app.layout.component';
import { TestPageComponent } from './modules/admin/test-page/test-page.component';
import { AdminGuard } from './core/guards/admin.guard';
import { UserListComponent } from './modules/admin/components/users/user-list/user-list.component';
import { SavedComponent } from './pages/socials/saved/saved.component';
import { UserChartComponent } from './modules/admin/components/users/user-chart/user-chart.component';
import { PostListComponent } from './modules/admin/components/posts/post-list/post-list.component';
import { PostChartComponent } from './modules/admin/components/posts/post-chart/post-chart.component';
import { ReportPostListComponent } from './modules/admin/components/reports/post-list/report-post-list.component';
import { RecommendPostsComponent } from './modules/admin/components/recommend/recommend-posts/recommend-posts.component';
import { ActiveComponent } from './pages/active/active.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/socials/change-password/change-password.component';

export const APP_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: AppLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: '',
        component: TestPageComponent,
      },
      {
        path: 'users',
        component: UserChartComponent,
      },
      {
        path: 'users/list',
        component: UserListComponent,
      },
      {
        path: 'posts',
        component: PostChartComponent,
      },
      {
        path: 'posts/list',
        component: PostListComponent,
      },
      {
        path: 'reports/posts/list',
        component: ReportPostListComponent,
      },
      {
        path: 'recommendations/posts',
        component: RecommendPostsComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'feed',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'active',
        component: ActiveComponent,
      },
    ],
  },
  {
    path: 'feed',
    component: SocialLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: FeedComponent,
      },
    ],
  },
  {
    path: 'saved',
    component: SocialLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SavedComponent,
      },
    ],
  },
  {
    path: 'edit',
    component: SocialLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: EditUserComponent,
      },
    ],
  },
  {
    path: 'friends',
    component: SocialLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: FriendsComponent,
        children: [
          {
            path: '',
            component: FriendListComponent,
          },
          {
            path: 'received-friend-requests',
            component: ReceivedFriendRequestsComponent,
          },
          {
            path: 'sent-friend-requests',
            component: SentFriendRequestsComponent,
          },
        ],
      },
    ],
  },
  {
    path: `${AppRoutes.USERS}`,
    component: SocialLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: UserComponent,
      },
    ],
  },
  {
    path: 'change-password',
    component: SocialLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ChangePasswordComponent,
      },
    ],
  },
];
