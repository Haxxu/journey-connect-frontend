import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '@/layout/default-layout/default-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SocialLayoutComponent } from './layout/social-layout/social-layout.component';
import { FeedComponent } from './pages/feed/feed.component';

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
];
