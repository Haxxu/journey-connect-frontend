import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@/services/auth.service';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconsModule, RouterLink],
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  isSuccess: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];

      if (token) {
        this.authService.activeAccount(token).subscribe({
          next: (res) => {
            if (res.success) {
              this.isSuccess = true;
            }
          },
          error: (err: any) => {},
        });
      }
    });
  }
}
