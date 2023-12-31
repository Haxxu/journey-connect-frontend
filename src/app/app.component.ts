import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UserService } from '@/services/user.service';
import { PostService } from '@/services/post.service';
import { Store } from '@ngrx/store';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'journey-connect-frontend';

  constructor(
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private postService: PostService,
    private store: Store,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = false;
    this.userService.fetchUserInfo();
  }
}
