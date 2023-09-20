import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '@/services/user.service';
import { Observable, combineLatest, map } from 'rxjs';
import { ImageUploaderComponent } from '@/shared/components/image-uploader/image-uploader.component';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noWhitespaceValidator } from '@/utils/validators';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { formatDateToDDMMYYYY } from '@/utils/format';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Store } from '@ngrx/store';
import { selectMeInfo } from '@/core/store/me/me.selectors';
import { getMediaUrlById } from '@/utils/media';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    ImageUploaderComponent,
    TooltipModule,
    ButtonModule,
    RouterModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [DatePipe],
})
export class EditUserComponent implements OnInit {
  meInfo$ = this.store.select(selectMeInfo);
  updateUserForm: FormGroup;
  maxDate: Date = new Date();
  userId: string = '';
  getMediaUrlById = getMediaUrlById;
  actQueryParam: string | null = 'info';

  sidebarItems: any[] = [
    {
      name: 'Profile',
      act: 'info',
    },
    {
      name: 'Contact info',
      act: 'contacts',
    },
    {
      name: 'Work places',
      act: 'career',
    },
    {
      name: 'Education',
      act: 'education',
    },
    {
      name: 'Living places',
      act: 'living-places',
    },
  ];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateUserForm = this.formBuilder.group({
      first_name: ['', [Validators.required, noWhitespaceValidator]],
      last_name: ['', [Validators.required, noWhitespaceValidator]],
      birth_date: [null, [Validators.required]],
      gender: ['', Validators.required],
      description: [''],
    });
  }

  genders: any = ['Male', 'Female', 'Other'];

  ngOnInit(): void {
    this.meInfo$.subscribe((meInfo) => {
      this.updateUserForm.patchValue(meInfo);
      this.updateUserForm.patchValue({
        birth_date: formatDateToDDMMYYYY(meInfo.birth_date),
      });
      this.userId = meInfo._id;
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      this.actQueryParam = queryParams.get('act');
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

  handleUpateUser() {
    if (this.updateUserForm.valid) {
      const formattedBirthDate = this.datePipe.transform(
        this.updateUserForm.value.birth_date,
        'yyyy-MM-dd'
      );
      this.userService
        .updateUser(this.userId, {
          ...this.updateUserForm.value,
          gender: this.updateUserForm.value.gender.toLowerCase(),
          birth_date: formattedBirthDate,
        })
        .subscribe((res) => {
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
          }
        });
    } else {
      this.updateUserForm.markAllAsTouched();
    }
  }
}
