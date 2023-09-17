import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '@/modules/socials/components/profile-header/profile-header.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ProfileHeaderComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {}
