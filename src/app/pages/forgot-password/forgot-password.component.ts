import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { noWhitespaceValidator } from '@/utils/validators';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
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
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .forgotPassword(this.loginForm.get('email')?.value)
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Please check your email',
              });

              this.loginForm.get('email')?.setValue('');
              this.loginForm.markAsPristine();
              this.loginForm.markAsUntouched();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
            });
          },
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Password is required',
      });
    }
  }
}
