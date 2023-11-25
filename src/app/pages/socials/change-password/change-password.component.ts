import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noWhitespaceValidator } from '@/utils/validators';
import { AuthService } from '@/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  loginForm: FormGroup;
  token: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      old_password: [
        '',
        [Validators.required, Validators.minLength(8), noWhitespaceValidator],
      ],
      new_password: [
        '',
        [Validators.required, Validators.minLength(8), noWhitespaceValidator],
      ],
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .changePassword(
          this.loginForm.get('old_password')?.value,
          this.loginForm.get('new_password')?.value
        )
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Change password successully',
              });

              this.loginForm.get('old_password')?.setValue('');
              this.loginForm.get('new_password')?.setValue('');
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
