import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '@/services/user.service';
import { Observable, combineLatest, map } from 'rxjs';
import { ImageUploaderComponent } from '@/shared/components/image-uploader/image-uploader.component';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { getMediaUrlById } from '@/utils/media';
import {
  selectUserInfo,
  selectUsersState,
} from '@/core/store/users/users.selectors';
import { SkeletonModule } from 'primeng/skeleton';
import { setUserInfo } from '@/core/store/users/users.actions';
import { AddFriendButtonComponent } from '@/modules/socials/components/add-friend-button/add-friend-button.component';
import { NgIconsModule } from '@ng-icons/core';
import ChatActions from '@/core/store/chat/chat.action';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    ImageUploaderComponent,
    TooltipModule,
    ButtonModule,
    RouterModule,
    SkeletonModule,
    AddFriendButtonComponent,
    NgIconsModule,
  ],
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent implements OnInit {
  getMediaUrlById = getMediaUrlById;
  meInfo$ = this.store.select(selectMeInfo);
  userInfo$ = this.store.select(selectUserInfo);
  usersStore$ = this.store.select(selectUsersState);
  userId: string = '';
  isMyself: boolean = false;
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    // this.meInfo$ = this.userService.getUserInfo();
  }

  ngOnInit(): void {
    combineLatest([this.meInfo$, this.usersStore$])
      .pipe(
        map(([meInfo, usersStore]) => {
          return meInfo?._id === usersStore.userInfo?._id;
        })
      )
      .subscribe((isMyself) => {
        this.isMyself = isMyself;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  handleUpdateBackground(event: any) {
    this.userService.updateMyImage('background', event).subscribe((res) => {
      if (res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
      }
    });
  }

  handleUpdateAvatar(event: any) {
    this.userService.updateMyImage('avatar', event).subscribe((res) => {
      if (res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
      }
    });
  }

  handleEditUser() {
    this.router.navigate(['edit'], { queryParams: { act: 'info' } });
  }

  handleShowBoxChat(userId: string) {
    this.store.dispatch(ChatActions.setTargetUserId({ userId: userId }));
    this.store.dispatch(ChatActions.setChatBoxVisibility({ isVisible: true }));
  }
}
