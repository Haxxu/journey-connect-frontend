import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UserService } from '@/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'journey-connect-frontend';

  constructor(
    private primengConfig: PrimeNGConfig,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.userService.fetchUserInfo();
  }
}
