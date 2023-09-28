import { Component, OnInit } from '@angular/core';
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
import { selectUserProfileData } from '@/core/store/user/user.selectors';

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
  ],
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  getMediaUrlById = getMediaUrlById;
  meInfo$ = this.store.select(selectMeInfo);
  userProfileData$ = this.store.select(selectUserProfileData);
  userId: string = '';
  isMyself: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    // this.meInfo$ = this.userService.getUserInfo();
  }

  ngOnInit(): void {
    combineLatest([this.meInfo$, this.userProfileData$])
      .pipe(
        map(([meInfo, userProfileData]) => {
          return meInfo?._id === userProfileData?._id;
        })
      )
      .subscribe((isMyself) => {
        this.isMyself = isMyself;
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
}
