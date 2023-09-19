import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '@/modules/socials/components/profile-header/profile-header.component';
import { UserService } from '@/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ProfileHeaderComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userId: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe();
      }
    });
  }
}
