import { HeaderComponent } from '@/modules/socials/components/header/header.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-social-layout',
  templateUrl: './social-layout.component.html',
  styleUrls: ['./social-layout.component.scss'],
  imports: [RouterModule, HeaderComponent, CommonModule],
})
export class SocialLayoutComponent {
  sidebars = [
    {
      name: 'My profile',
    },
    {
      name: 'News',
    },
    {
      name: 'Friends',
    },
    {
      name: 'Saved',
    },
    {
      name: 'Groups',
    },
  ];
}
