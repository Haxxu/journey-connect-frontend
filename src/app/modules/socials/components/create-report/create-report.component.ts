import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ReportService } from '@/services/report.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReportComponent {
  @Input() context_id: string = '';
  @Input() context_type: 'post' | 'comment' = 'post';
  selectedReportTypes: string[] = [];
  content: string = '';
  submitting: boolean = false;
  @Output() onSuccess = new EventEmitter();

  constructor(
    private reportService: ReportService,
    private messageService: MessageService
  ) {}

  handleReport() {
    this.submitting = true;
    this.reportService
      .report(
        this.context_type,
        this.context_id,
        this.content,
        this.selectedReportTypes
      )
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Report successfully',
            });
            this.onSuccess.emit();
          }
          this.submitting = false;
        },
        error: (err: any) => {
          console.log(err);
          this.submitting = false;
        },
      });
  }
}
