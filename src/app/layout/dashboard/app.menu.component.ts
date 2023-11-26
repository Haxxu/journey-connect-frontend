import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      // {
      //   label: 'Dashboard',
      //   items: [
      //     {
      //       label: 'Charts',
      //       icon: 'matDashboardRound',
      //       routerLink: ['/dashboard/charts'],
      //     },
      //   ],
      // },
      {
        label: 'Users',
        items: [
          {
            label: 'Charts',
            icon: 'matDashboardRound',
            routerLink: ['/dashboard/users'],
          },
          {
            label: 'Users',
            icon: 'matPeopleRound',
            routerLink: ['/dashboard/users/list'],
          },
        ],
      },
      {
        label: 'POSTS',
        items: [
          {
            label: 'Charts',
            icon: 'matDashboardRound',
            routerLink: ['/dashboard/posts'],
          },
          {
            label: 'Posts',
            icon: 'matFeedRound',
            routerLink: ['/dashboard/posts/list'],
          },
          {
            label: 'Top posts',
            icon: 'matBarChartRound',
            routerLink: ['/dashboard/posts/top'],
          },
        ],
      },
      {
        label: 'COMMENTS',
        items: [
          {
            label: 'Charts',
            icon: 'matDashboardRound',
            routerLink: ['/dashboard/comments'],
          },
          {
            label: 'Comments',
            icon: 'matCommentRound',
            routerLink: ['/dashboard/comments/list'],
          },
          // {
          //   label: 'Top comments',
          //   icon: 'matBarChartRound',
          //   routerLink: ['/dashboard/comments/top'],
          // },
        ],
      },
      {
        label: 'REPORTS',
        items: [
          {
            label: 'Posts',
            icon: 'matFeedRound',
            routerLink: ['/dashboard/reports/posts/list'],
          },
          {
            label: 'Comments',
            icon: 'matCommentRound',
            routerLink: ['/dashboard/reports/comments/list'],
          },
        ],
      },
      {
        label: 'RECOMMENDATIONS',
        items: [
          {
            label: 'Posts',
            icon: 'matDashboardRound',
            routerLink: ['/dashboard/recommendations/posts'],
          },
        ],
      },

      // {
      //   label: 'Pages',
      //   icon: 'pi pi-fw pi-briefcase',
      //   items: [
      //     {
      //       label: 'Landing',
      //       icon: 'pi pi-fw pi-globe',
      //       routerLink: ['/landing'],
      //     },
      //     {
      //       label: 'Auth',
      //       icon: 'pi pi-fw pi-user',
      //       items: [
      //         {
      //           label: 'Login',
      //           icon: 'pi pi-fw pi-sign-in',
      //           routerLink: ['/auth/login'],
      //         },
      //         {
      //           label: 'Error',
      //           icon: 'pi pi-fw pi-times-circle',
      //           routerLink: ['/auth/error'],
      //         },
      //         {
      //           label: 'Access Denied',
      //           icon: 'pi pi-fw pi-lock',
      //           routerLink: ['/auth/access'],
      //         },
      //       ],
      //     },
      //     {
      //       label: 'Crud',
      //       icon: 'pi pi-fw pi-pencil',
      //       routerLink: ['/pages/crud'],
      //     },
      //     {
      //       label: 'Timeline',
      //       icon: 'pi pi-fw pi-calendar',
      //       routerLink: ['/pages/timeline'],
      //     },
      //     {
      //       label: 'Not Found',
      //       icon: 'pi pi-fw pi-exclamation-circle',
      //       routerLink: ['/notfound'],
      //     },
      //     {
      //       label: 'Empty',
      //       icon: 'pi pi-fw pi-circle-off',
      //       routerLink: ['/pages/empty'],
      //     },
      //   ],
      // },
      // {
      //   label: 'Hierarchy',
      //   items: [
      //     {
      //       label: 'Submenu 1',
      //       icon: 'pi pi-fw pi-bookmark',
      //       items: [
      //         {
      //           label: 'Submenu 1.1',
      //           icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
      //             { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
      //             { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
      //           ],
      //         },
      //         {
      //           label: 'Submenu 1.2',
      //           icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       label: 'Submenu 2',
      //       icon: 'pi pi-fw pi-bookmark',
      //       items: [
      //         {
      //           label: 'Submenu 2.1',
      //           icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
      //             { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
      //           ],
      //         },
      //         {
      //           label: 'Submenu 2.2',
      //           icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   label: 'Get Started',
      //   items: [
      //     {
      //       label: 'Documentation',
      //       icon: 'pi pi-fw pi-question',
      //       routerLink: ['/documentation'],
      //     },
      //     {
      //       label: 'View Source',
      //       icon: 'pi pi-fw pi-search',
      //       url: ['https://github.com/primefaces/sakai-ng'],
      //       target: '_blank',
      //     },
      //   ],
      // },
    ];
  }
}
