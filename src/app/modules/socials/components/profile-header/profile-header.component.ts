import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '@/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent {
  meInfo$: Observable<any>;

  constructor(private userService: UserService) {
    this.meInfo$ = this.userService.getUserInfo();
  }
}
