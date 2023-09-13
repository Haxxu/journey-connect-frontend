import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { noWhitespaceValidator } from '@/utils/validators';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AuthService } from '@/services/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from '@/config/app_routes';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    CalendarModule,
    DropdownModule,
    ToastModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [DatePipe],
})
export class SignupComponent {
  signupForm: FormGroup;
  maxDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      first_name: ['', [Validators.required, noWhitespaceValidator]],
      last_name: ['', [Validators.required, noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birth_date: [null, [Validators.required]],
      gender: ['', Validators.required],
    });
  }

  genders: any = ['Male', 'Female', 'Other'];

  handleSignup(): void {
    if (this.signupForm.valid) {
      const formattedBirthDate = this.datePipe.transform(
        this.signupForm.value.birth_date,
        'yyyy-MM-dd'
      );
      this.authService
        .signup({
          ...this.signupForm.value,
          gender: this.signupForm.value.gender.toLowerCase(),
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
      this.signupForm.markAllAsTouched();
    }
  }

  handleNavigateToLogin(): void {
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
