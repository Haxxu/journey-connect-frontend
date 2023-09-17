import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '@/layout/default-layout/default-layout.component';
import { LoginComponent } from '@/pages/login/login.component';
import { SignupComponent } from '@/pages/signup/signup.component';
import { SocialLayoutComponent } from '@/layout/social-layout/social-layout.component';
import { FeedComponent } from '@/pages/feed/feed.component';
import { UserComponent } from '@/pages/user/user.component';
import { AppRoutes } from './config/app_routes';

export const APP_ROUTES: Routes = [
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
    children: [
      {
        path: ':id',
        component: UserComponent,
      },
    ],
  },
];
