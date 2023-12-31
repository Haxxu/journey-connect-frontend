import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { noWhitespaceValidator } from '@/utils/validators';
import { AuthService } from '@/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AppRoutes } from '@/config/app_routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ToastModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, noWhitespaceValidator],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), noWhitespaceValidator],
      ],
    });
  }

  handleLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            this.router.navigate(['/feed']);
          }
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login failed',
            detail: error.error.message,
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  handleNavigateToSignup(): void {
    this.router.navigate([AppRoutes.SIGNUP]);
  }
}
