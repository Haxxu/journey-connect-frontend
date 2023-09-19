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
  meInfo$: Observable<any>;
  userData$: Observable<any>;
  userId: string = '';
  isMyself: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.meInfo$ = this.userService.getUserInfo();
    this.userData$ = this.userService.getUserData();
  }

  ngOnInit(): void {
    combineLatest([this.meInfo$, this.userData$])
      .pipe(
        map(([meInfo, userData]) => {
          return meInfo?._id === userData?._id;
        })
      )
      .subscribe((isMyself) => {
        this.isMyself = isMyself;
      });
  }

  getMediaUrlById(id: string, medias: any): string | undefined {
    const media = medias.find((m: any) => m.id === id);
    return media ? media.url : undefined;
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
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
