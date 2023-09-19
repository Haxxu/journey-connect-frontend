import { Routes } from '@angular/router';

import { DefaultLayoutComponent } from '@/layout/default-layout/default-layout.component';

import { LoginComponent } from '@/pages/login/login.component';
import { SignupComponent } from '@/pages/signup/signup.component';
import { SocialLayoutComponent } from '@/layout/social-layout/social-layout.component';
import { FeedComponent } from '@/pages/socials/feed/feed.component';
import { UserComponent } from '@/pages/socials/user/user.component';
import { AppRoutes } from './config/app_routes';
import { AuthGuard } from '@/core/guards/auth.guard';
import { EditUserComponent } from '@/pages/socials/edit-user/edit-user.component';

export const APP_ROUTES: Routes = [
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
    path: `${AppRoutes.USERS}`,
    component: SocialLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id/edit',
        component: EditUserComponent,
      },
      {
        path: ':id',
        component: UserComponent,
      },
    ],
  },
];
