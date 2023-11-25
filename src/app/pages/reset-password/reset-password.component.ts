import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@/services/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { noWhitespaceValidator } from '@/utils/validators';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  loginForm: FormGroup;
  token: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      password: [
        '',
        [Validators.required, Validators.minLength(8), noWhitespaceValidator],
      ],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.token = params['token'];
      },
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .resetPassword(this.loginForm.get('password')?.value, this.token)
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Reset password successully',
              });

              this.loginForm.get('password')?.setValue('');
              this.loginForm.markAsPristine();
              this.loginForm.markAsUntouched();
              this.router.navigate(['/login']);
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
